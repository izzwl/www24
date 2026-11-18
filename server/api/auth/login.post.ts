import { defineEventHandler, readBody, createError, setCookie } from 'h3';
import { authenticateCmsUser, createSessionToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body || {};

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username dan password wajib diisi.'
    });
  }

  const result = await authenticateCmsUser(username, password);

  if (!result.ok || !result.user) {
    throw createError({
      statusCode: 401,
      statusMessage: result.message || 'Otorisasi gagal.'
    });
  }

  const token = createSessionToken(result.user);

  setCookie(event, 'cms_auth', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 hari
    path: '/'
  });

  return {
    success: true,
    user: result.user
  };
});
