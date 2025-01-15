interface ZephrOutcome {
  featureId: string;
  featureLabel: string;
  outcomeId: string;
  outcomeLabel: string;
}

interface ZephrAccessDetails {
  trials?: Record<string, any>;
  meters?: Record<string, any>;
  timeTrials?: Record<string, any>;
  outcomes?: Record<string, ZephrOutcome>;
}

interface ZephrRunOptions {
  jwt: string;
  customData?: Record<string, any>;
  debug?: boolean;
}

declare global {
  interface Window {
    Zephr?: {
      outcomes?: Record<string, { outcomeLabel: string }>;
      accessDetails?: any;
    };
    zephrBrowser?: {
      run: (options: { jwt?: string; debug?: boolean }) => void;
    };
  }
}
export {};

export {};
