export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    try {
      const headers = useRequestHeaders(['cookie']);
      const res: any = await $fetch('/api/auth/me', {
        headers
      });

      if (!res || !res.authenticated) {
        return navigateTo('/admin/login');
      }
    } catch {
      return navigateTo('/admin/login');
    }
  }
});
