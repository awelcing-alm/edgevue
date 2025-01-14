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


declare global {
  interface Window {
    Zephr?: {
      run: (config?: any) => void;
      outcomes?: Record<string, any>;
      accessDetails?: any;
      includeOutcomes: boolean;
      outcomesAsEvents: boolean;
      groupFields: boolean;
    };
  }
}

declare global {
  interface Window {
    [key: string]: any; // Dynamic key to store custom dataLayer keys
  }
}