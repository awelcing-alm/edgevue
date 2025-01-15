declare global {
  interface Window {
    [key: string]: any[]; // Allow window to have string-indexed arrays
    Zephr?: {
      outcomes?: Record<string, { outcomeLabel: string }>;
      accessDetails?: any;
    };
  }
}

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/blaize/datalayer', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let response: Record<string, any>;
        try {
          response = JSON.parse(xhr.responseText);
        } catch (e) {
          console.error("Error parsing response:", e);
          response = {};
        }

        if (xhr.status === 200) {
          Object.entries(response).forEach(([dataLayerFieldName, pageView]) => {
            if (!(dataLayerFieldName in window)) {
              window[dataLayerFieldName] = []; // Now explicitly typed as an array
            }
            const events: any[] = [];

            if (window.Zephr?.outcomes) {
              pageView.zephrOutcomes = window.Zephr.outcomes ?? {}; // Provide an empty object as fallback
              Object.entries(window.Zephr.outcomes || {}).forEach(([outcomeKey, outcomeValue]) => {
                events.push({ event: `zephr-outcome-${outcomeKey}`, ...outcomeValue });
              });
            }

            window[dataLayerFieldName].push(pageView);
          });

          const readyEvent = new Event('zephr.dataLayerReady');
          document.dispatchEvent(readyEvent);
        }
      }
    };
    xhr.send(null);
  });
});
