export default defineNuxtPlugin(() => {
  if (process.server) return;

  const analyticsCookie = useCookie('analytics_enabled');
  
  // Only track clicks if analytics are enabled
  if (analyticsCookie.value === 'true') {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const eventData = {
        event: 'globalClick',
        elementTag: target.tagName.toLowerCase(),
        elementId: target.id || null,
        elementClasses: target.className || null,
        text: target.textContent?.trim() || null,
        timestamp: Date.now()
      };
  
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventData);
      console.log('[DataLayer] Global click event fired →', eventData);
    });
  }
});