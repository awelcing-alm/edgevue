declare global {
  interface Window {
    [key: string]: any[]; // Allows string-indexed properties to be arrays
    Zephr?: {
      outcomes?: Record<string, { outcomeLabel: string }>;
      accessDetails?: any;
    };
  }
}

interface PageViewEvent {
  zephrOutcomes?: Record<string, { outcomeLabel: string }>;
  [key: string]: any;
}

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/blaize/datalayer', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let response: Record<string, PageViewEvent>;
        try {
          response = JSON.parse(xhr.responseText);
        } catch (e) {
          console.error("Error parsing response:", e);
          response = {};
        }

        if (xhr.status === 200) {
          Object.entries(response).forEach(([dataLayerFieldName, pageView]) => {
            if (typeof dataLayerFieldName !== 'string') return; // Type guard

            // Ensure that `window[dataLayerFieldName]` is typed as an array of `PageViewEvent`
            if (!Array.isArray(window[dataLayerFieldName])) {
              window[dataLayerFieldName] = []; // Initialize the array if not already
            }
            const events: Array<Record<string, any>> = [];

            if (window.Zephr?.outcomes) {
              pageView.zephrOutcomes = window.Zephr.outcomes ?? {}; // Provide an empty object as fallback
              Object.entries(window.Zephr.outcomes).forEach(([outcomeKey, outcomeValue]) => {
                events.push({ event: `zephr-outcome-${outcomeKey}`, ...outcomeValue });
              });
            }

            // Push pageView into the window's data layer array
            (window[dataLayerFieldName] as PageViewEvent[]).push(pageView);
          });

          const readyEvent = new Event('zephr.dataLayerReady');
          document.dispatchEvent(readyEvent);
        }
      }
    };
    xhr.send(null);
  });
});
