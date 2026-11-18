import fs from 'node:fs';
import path from 'node:path';
import { defineEventHandler, getQuery } from 'h3';

const DEFAULT_API_URL = 'http://127.0.0.1:8003/recruitment-api/list_jobvacan';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  
  // Baca apiUrl dari query.testUrl (untuk fitur testing di CMS) atau dari file data CMS
  let targetUrl = (query.testUrl as string) || '';

  if (!targetUrl) {
    try {
      const dataFilePath = path.resolve(process.cwd(), 'server/data/siteContent.json');
      if (fs.existsSync(dataFilePath)) {
        const raw = fs.readFileSync(dataFilePath, 'utf-8');
        const content = JSON.parse(raw);
        targetUrl = content?.career?.apiUrl || DEFAULT_API_URL;
      }
    } catch {
      targetUrl = DEFAULT_API_URL;
    }
  }

  if (!targetUrl) {
    targetUrl = DEFAULT_API_URL;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        status: 'error',
        message: `Endpoint API mengembalikan status HTTP ${response.status} (${response.statusText})`,
        data: []
      };
    }

    const json: any = await response.json();
    return {
      success: true,
      endpoint: targetUrl,
      count: json.count || (Array.isArray(json.data) ? json.data.length : 0),
      total: json.total || (Array.isArray(json.data) ? json.data.length : 0),
      data: Array.isArray(json.data) ? json.data : []
    };
  } catch (err: any) {
    return {
      success: false,
      status: 'error',
      message: err.name === 'AbortError'
        ? 'Koneksi ke Recruitment API timeout (melebihi 8 detik)'
        : `Gagal terhubung ke Recruitment API: ${err.message || err}`,
      data: []
    };
  }
});
