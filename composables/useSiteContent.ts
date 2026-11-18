export const useSiteContent = <T = any>(section?: string) => {
  const url = section ? `/api/content?section=${encodeURIComponent(section)}` : '/api/content';
  const key = section ? `content-${section}` : 'content-all';
  return useAsyncData<T>(key, () => $fetch(url));
};
