export {};

declare global {
  interface Window {
    zephrBrowser?: {
      run: (options: { jwt: string; customData?: Record<string, any> }) => void;
      showRegistration?: () => void;
    };
    dataLayer: Array<any>;
    gtag: (...args: any[]) => void; // For GA4
  }
}
