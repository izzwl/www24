import fs from 'node:fs';
import path from 'node:path';
import { getAuthUser } from '../utils/auth';
import { recordActivity } from '../utils/logger';

export default defineEventHandler(async (event) => {
  const user = getAuthUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Sesi login tidak valid. Silakan login kembali.' });
  }

  const body = await readBody(event);
  const dataFilePath = path.resolve(process.cwd(), 'server/data/siteContent.json');

  if (!body || !body.section || body.data === undefined) {
    throw createError({ statusCode: 400, statusMessage: 'Payload requires section and data' });
  }

  let data: Record<string, any> = {};
  if (fs.existsSync(dataFilePath)) {
    const raw = fs.readFileSync(dataFilePath, 'utf-8');
    data = JSON.parse(raw);
  }

  data[body.section] = body.data;

  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

  // Catat riwayat perubahan ke log bulanan
  try {
    recordActivity({
      event,
      user,
      action: 'UPDATE_CONTENT',
      section: body.section,
      summary: `Memperbarui konfigurasi konten pada section "${body.section}".`
    });
  } catch (err) {
    console.error('Failed to write activity log:', err);
  }

  return { success: true, section: body.section, updated: data[body.section] };
});
