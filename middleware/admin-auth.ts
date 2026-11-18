export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/adminwww24') && to.path !== '/adminwww24/login') {
    try {
      const headers = useRequestHeaders(['cookie']);
      const res: any = await $fetch('/api/auth/me', {
        headers
      });

      if (!res || !res.authenticated) {
        return navigateTo('/adminwww24/login');
      }
    } catch {
      return navigateTo('/adminwww24/login');
    }
  }
});
