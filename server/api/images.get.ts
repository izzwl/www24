import fs from 'node:fs';
import path from 'node:path';

function getFilesRecursively(dir: string, baseDir: string): Array<{ url: string; name: string; folder: string }> {
  let results: Array<{ url: string; name: string; folder: string }> = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, baseDir));
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(ext)) {
        const relativeToStatic = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        const folder = path.dirname(relativeToStatic);
        results.push({
          url: `/static/img/${relativeToStatic}`,
          name: item.name,
          folder: folder === '.' ? 'root' : folder
        });
      }
    }
  }
  return results;
}

export default defineEventHandler(() => {
  const imgDir = path.resolve(process.cwd(), 'public/static/img');
  const allImages = getFilesRecursively(imgDir, imgDir);

  // Sort uploads first, then alphabetically
  allImages.sort((a, b) => {
    if (a.folder === 'uploads' && b.folder !== 'uploads') return -1;
    if (b.folder === 'uploads' && a.folder !== 'uploads') return 1;
    return a.name.localeCompare(b.name);
  });

  return {
    success: true,
    count: allImages.length,
    images: allImages
  };
});
