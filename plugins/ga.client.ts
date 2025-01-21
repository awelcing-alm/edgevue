// Add type definitions for window.gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
    [key: string]: any; // Allow string indexing for GA disable property
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  if (process.client && config.public.gaId) {
    const router = useRouter();
    const analyticsCookie = useCookie('analytics_enabled');

    // Only initialize GA if analytics are enabled
    if (analyticsCookie.value === 'true') {
      router.afterEach((to) => {
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_path: to.fullPath,
            page_title: to.meta.title as string || document.title,
          });
        }
      });
    } else {
      // Remove GA cookies if analytics are disabled
      document.cookie = '_ga=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      document.cookie = '_ga_HDP4C20H65=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
      // Disable GA tracking
      const gaId = config.public.gaId as string;
      window[`ga-disable-${gaId}`] = true;
    }
  }
});