import { ref } from 'vue';

interface ZephrRunOptions {
  jwt: string;
  customData?: Record<string, any>;
  debug?: boolean; // Added debug flag
}

declare global {
  interface Window {
    zephrBrowser?: {
      run: (options: ZephrRunOptions) => void;
    };
    Zephr?: {
      outcomes?: Record<string, any>;
    };
  }
}

export function useZephrFeature() {
  const isFeatureAllowed = ref(false);
  const isLoading = ref(true);

  function evaluateFeature(featureId: string) {
    if (typeof window === 'undefined' || !window.zephrBrowser) {
      console.error('Zephr Browser SDK is not available.');
      isFeatureAllowed.value = false;
      isLoading.value = false;
      return;
    }

    window.zephrBrowser.run({
      jwt: 'your-jwt-token-here', // Replace with actual JWT
      customData: { featureCheck: featureId },
      debug: true, // Now valid
    });

    document.addEventListener('zephr.browserDecisionsFinished', () => {
      const outcomes = window.Zephr?.outcomes || {};
      isFeatureAllowed.value = outcomes[featureId]?.outcomeLabel === 'allow';
      isLoading.value = false;
    });
  }

  return { isFeatureAllowed, isLoading, evaluateFeature };
}
