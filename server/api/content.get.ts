import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const dataFilePath = path.resolve(process.cwd(), 'server/data/siteContent.json');
  
  if (!fs.existsSync(dataFilePath)) {
    throw createError({ statusCode: 404, statusMessage: 'Content data not found' });
  }

  const raw = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(raw);

  if (query.section && typeof query.section === 'string') {
    if (data[query.section]) {
      return data[query.section];
    }
    throw createError({ statusCode: 404, statusMessage: `Section ${query.section} not found` });
  }

  return data;
});
