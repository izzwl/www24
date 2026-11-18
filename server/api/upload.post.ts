import fs from 'node:fs';
import path from 'node:path';
import { getAuthUser } from '../utils/auth';
import { recordActivity } from '../utils/logger';

export default defineEventHandler(async (event) => {
  const user = getAuthUser(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Sesi login tidak valid. Silakan login kembali.' });
  }

  const parts = await readMultipartFormData(event);
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file provided in form data' });
  }

  const uploadDir = path.resolve(process.cwd(), 'public/static/img/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uploadedFiles: Array<{ url: string; filename: string }> = [];

  for (const part of parts) {
    if (part.filename && part.data) {
      const ext = path.extname(part.filename).toLowerCase();
      const base = path.basename(part.filename, ext).replace(/[^a-zA-Z0-9-_]/g, '-');
      const uniqueName = `${Date.now()}-${base}${ext}`;
      const destPath = path.join(uploadDir, uniqueName);

      fs.writeFileSync(destPath, part.data);
      uploadedFiles.push({
        url: `/static/img/uploads/${uniqueName}`,
        filename: uniqueName
      });
    }
  }

  if (uploadedFiles.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No valid file found' });
  }

  // Catat riwayat upload file ke log bulanan
  try {
    const filenames = uploadedFiles.map(f => f.filename).join(', ');
    recordActivity({
      event,
      user,
      action: 'UPLOAD_MEDIA',
      section: 'media',
      summary: `Mengunggah ${uploadedFiles.length} file media baru (${filenames}).`
    });
  } catch (err) {
    console.error('Failed to write activity log for upload:', err);
  }

  return {
    success: true,
    file: uploadedFiles[0],
    files: uploadedFiles
  };
});
