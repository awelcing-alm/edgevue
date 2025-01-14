(() => {
  if (typeof window === 'undefined') return;

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
            window[dataLayerFieldName] = [];
          }
          const events: any[] = [];

          if (window.Zephr?.includeOutcomes && window.Zephr?.outcomes) {
            pageView.zephrOutcomes = window.Zephr.outcomes;
            Object.entries(window.Zephr.outcomes).forEach(([outcomeKey, outcomeValue]) => {
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
})();