import mysql from 'mysql2/promise';
import crypto from 'crypto';
import type { H3Event } from 'h3';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    const config = useRuntimeConfig();
    pool = mysql.createPool({
      host: (config.dbHost as string) || process.env.DB_HOST || '127.0.0.1',
      port: Number(config.dbPort || process.env.DB_PORT) || 3806,
      user: (config.dbUser as string) || process.env.DB_USER || 'root',
      password: (config.dbPassword as string) || process.env.DB_PASSWORD || 'apps4ntp',
      database: (config.dbName as string) || process.env.DB_NAME || 'portalpy',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export function verifyDjangoPassword(plain: string, stored: string): boolean {
  if (!stored || !plain) return false;
  try {
    // 1. Unsalted MD5 (32 hex characters)
    if (/^[a-f0-9]{32}$/i.test(stored)) {
      const hash = crypto.createHash('md5').update(plain).digest('hex');
      return crypto.timingSafeEqual(Buffer.from(hash.toLowerCase()), Buffer.from(stored.toLowerCase()));
    }
    // 2. pbkdf2_sha256$iterations$salt$hash
    if (stored.startsWith('pbkdf2_sha256$')) {
      const parts = stored.split('$');
      if (parts.length !== 4) return false;
      const [, iterStr, salt, hash] = parts;
      const iterations = parseInt(iterStr, 10);
      const derived = crypto.pbkdf2Sync(plain, salt, iterations, 32, 'sha256').toString('base64');
      return crypto.timingSafeEqual(Buffer.from(derived), Buffer.from(hash));
    }
    // 3. md5$salt$hash
    if (stored.startsWith('md5$')) {
      const parts = stored.split('$');
      if (parts.length !== 3) return false;
      const [, salt, hash] = parts;
      const derived = crypto.createHash('md5').update(salt + plain).digest('hex');
      return crypto.timingSafeEqual(Buffer.from(derived.toLowerCase()), Buffer.from(hash.toLowerCase()));
    }
    // 4. pbkdf2_sha1$iterations$salt$hash
    if (stored.startsWith('pbkdf2_sha1$')) {
      const parts = stored.split('$');
      if (parts.length !== 4) return false;
      const [, iterStr, salt, hash] = parts;
      const iterations = parseInt(iterStr, 10);
      const derived = crypto.pbkdf2Sync(plain, salt, iterations, 20, 'sha1').toString('base64');
      return crypto.timingSafeEqual(Buffer.from(derived), Buffer.from(hash));
    }
  } catch (e) {
    console.error('Password verification error:', e);
    return false;
  }
  return false;
}

export interface AuthSession {
  id: number;
  username: string;
  fullName: string;
  groups: string[];
  exp: number;
}

export function createSessionToken(user: { id: number; username: string; fullName: string; groups: string[] }): string {
  const config = useRuntimeConfig();
  const secret = (config.sessionSecret as string) || process.env.SESSION_SECRET || 'ntp_www24_cms_secret_key_8f7b2c9e1a3d5f6a';
  const payload: AuthSession = {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    groups: user.groups,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 hari
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payloadBase64).digest('base64url');
  return `${payloadBase64}.${signature}`;
}

export function verifySessionToken(token: string): AuthSession | null {
  if (!token || !token.includes('.')) return null;
  const [payloadBase64, signature] = token.split('.');
  const config = useRuntimeConfig();
  const secret = (config.sessionSecret as string) || process.env.SESSION_SECRET || 'ntp_www24_cms_secret_key_8f7b2c9e1a3d5f6a';
  const expectedSig = crypto.createHmac('sha256', secret).update(payloadBase64).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload: AuthSession = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAuthUser(event: H3Event): AuthSession | null {
  const cookie = getCookie(event, 'cms_auth');
  if (!cookie) return null;
  return verifySessionToken(cookie);
}

export async function authenticateCmsUser(username: string, plainPassword: string) {
  try {
    const pool = getDbPool();
    const [rows]: any = await pool.execute(
      `SELECT u.id, u.username, u.password, u.first_name, u.last_name, u.is_active,
              GROUP_CONCAT(g.name SEPARATOR ',') as group_names
       FROM auth_user u
       LEFT JOIN auth_user_groups ug ON u.id = ug.user_id
       LEFT JOIN auth_group g ON ug.group_id = g.id
       WHERE u.username = ?
       GROUP BY u.id`,
      [username.trim()]
    );

    if (!rows || rows.length === 0) {
      return { ok: false, message: 'Username atau password salah.' };
    }

    const user = rows[0];
    if (user.is_active !== 1) {
      return { ok: false, message: 'Akun ini dalam status nonaktif.' };
    }

    const isMatch = verifyDjangoPassword(plainPassword, user.password);
    if (!isMatch) {
      return { ok: false, message: 'Username atau password salah.' };
    }

    // Periksa apakah user memiliki grup dengan awalan cmswww24
    const allGroups: string[] = user.group_names ? user.group_names.split(',') : [];
    const cmsGroups = allGroups.filter(g => g.startsWith('cmswww24'));

    if (cmsGroups.length === 0) {
      return {
        ok: false,
        message: 'Akses ditolak: User Anda tidak terdaftar dalam grup berawalan cmswww24.'
      };
    }

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ') || user.username;
    return {
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        fullName,
        groups: cmsGroups
      }
    };
  } catch (error: any) {
    console.error('Database auth error:', error);
    return {
      ok: false,
      message: 'Gagal menghubungi database otorisasi (' + (error.message || 'Koneksi error') + ')'
    };
  }
}
