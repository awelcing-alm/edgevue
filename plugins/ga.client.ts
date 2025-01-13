export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
  
    if (process.client && config.public.gaId) {
      const router = useRouter();
  
      router.afterEach((to) => {
        window.gtag('event', 'page_view', {
          page_path: to.fullPath,
          page_title: to.meta.title || document.title,
        });
      });
    }
  });
  