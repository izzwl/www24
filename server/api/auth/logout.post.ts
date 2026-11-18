import { defineEventHandler, deleteCookie } from 'h3';

export default defineEventHandler((event) => {
  deleteCookie(event, 'cms_auth', {
    path: '/'
  });

  return {
    success: true,
    message: 'Berhasil logout'
  };
});
