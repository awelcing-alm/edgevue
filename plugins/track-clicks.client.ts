// plugins/track-clicks.client.ts
export default defineNuxtPlugin(() => {
    if (process.server) return
  
    document.addEventListener('click', (e: MouseEvent) => {
      // The clicked element
      const target = e.target as HTMLElement
      
      // Define whatever data you need
      const eventData = {
        event: 'globalClick',
        elementTag: target.tagName.toLowerCase(),
        elementId: target.id || null,
        elementClasses: target.className || null,
        text: target.textContent?.trim() || null,
        timestamp: Date.now()
      }
  
      // Fire it off to the dataLayer
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(eventData)
      console.log('[DataLayer] Global click event fired →', eventData)
    })
  })
  