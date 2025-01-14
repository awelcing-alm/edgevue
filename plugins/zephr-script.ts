interface ZephrOutcome {
    featureId: string;
    featureLabel: string;
    outcomeId: string;
    outcomeLabel: string;
  }
  
  interface ZephrTrial {
    totalCredits: number;
    remainingCredits: number;
    dataLayerCreditsUsedKey?: string;
    dataLayerCreditsRemainingKey?: string;
    reportInDataLayer: boolean;
  }

  interface ZephrAccessDetails {
    trials?: Record<string, ZephrTrial>;
    meters?: Record<string, ZephrTrial>; // Add meters explicitly if applicable
    timeTrials?: Record<string, ZephrTimeTrial>;
    trialTrackingDetails?: Array<{ entitlementType: string; entitlementId: string; creditsRemainingKey?: string; creditsUsedKey?: string }>;
  }
  
  interface ZephrTimeTrial {
    trialDuration: number;
    trialDurationUnits: string;
    entryTime: string;
    trackerHits: number;
    timeRemainingInTrial: number;
    dataLayerTrialDurationKey?: string;
    dataLayerTrialDurationUnitsKey?: string;
    dataLayerTrackerEntryTimeKey?: string;
    dataLayerTrackerHitsKey?: string;
    dataLayerTrialTimeRemainingKey?: string;
    reportInDataLayer: boolean;
  }
  
  interface ZephrAccessDetails {
    trials?: Record<string, ZephrTrial>;
    timeTrials?: Record<string, ZephrTimeTrial>;
    trialTrackingDetails?: Array<{ entitlementType: string; entitlementId: string; creditsRemainingKey?: string; creditsUsedKey?: string }>;
  }
  
  declare global {
    interface Window {
      Zephr: {
        includeOutcomes: boolean;
        outcomesAsEvents: boolean;
        groupFields: boolean;
        outcomes?: Record<string, ZephrOutcome>;
        accessDetails?: ZephrAccessDetails;
      };
      [key: string]: any; // Allow dynamic dataLayer keys
    }
  }
  
  window.Zephr = window.Zephr || {
    includeOutcomes: true,
    outcomesAsEvents: false,
    groupFields: false,
  };
  
  (() => {
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
            if (window.Zephr.includeOutcomes && window.Zephr.outcomes) {
              pageView.zephrOutcomes = window.Zephr.outcomes;
              if (window.Zephr.outcomesAsEvents) {
                Object.entries(window.Zephr.outcomes).forEach(([outcomeKey, outcomeValue]) => {
                  const outcomeEvent = {
                    event: `zephr-outcome-${outcomeKey}`,
                    ...outcomeValue,
                  };
                  events.push(outcomeEvent);
                });
              }
            }
  
            if (window.Zephr.accessDetails) {
              const { trials = {}, timeTrials = {}, trialTrackingDetails = [] } = window.Zephr.accessDetails;
  
              // Trials (credits/metered)
              Object.entries(trials).forEach(([trialId, trial]) => {
                if (trial.reportInDataLayer) {
                  const usedCredits = trial.totalCredits - trial.remainingCredits;
                  const target = window.Zephr.groupFields ? (pageView.zephrTrials ||= {}) : pageView;
                  if (trial.dataLayerCreditsUsedKey) target[trial.dataLayerCreditsUsedKey] = usedCredits;
                  if (trial.dataLayerCreditsRemainingKey) target[trial.dataLayerCreditsRemainingKey] = trial.remainingCredits;
                }
              });
  
              // Trial tracking details
              trialTrackingDetails.forEach(details => {
                const trialType = details.entitlementType === 'credits' ? 'trials' : 'meters';
                const trial = (window.Zephr.accessDetails?.[trialType] || {})[details.entitlementId];
                if (!trial) return;
  
                const target = window.Zephr.groupFields ? (pageView.zephrTrials ||= {}) : pageView;
                if (details.creditsRemainingKey) target[details.creditsRemainingKey] = trial.remainingCredits;
                if (details.creditsUsedKey) target[details.creditsUsedKey] = trial.totalCredits - trial.remainingCredits;
              });
  
              // Time-based trials
              Object.entries(timeTrials).forEach(([timeTrialId, timeTrial]) => {
                if (timeTrial.reportInDataLayer) {
                  const target = window.Zephr.groupFields ? (pageView.zephrTrials ||= {}) : pageView;
                  if (timeTrial.dataLayerTrialDurationKey) target[timeTrial.dataLayerTrialDurationKey] = timeTrial.trialDuration;
                  if (timeTrial.dataLayerTrialDurationUnitsKey) target[timeTrial.dataLayerTrialDurationUnitsKey] = timeTrial.trialDurationUnits;
                  if (timeTrial.dataLayerTrackerEntryTimeKey) target[timeTrial.dataLayerTrackerEntryTimeKey] = timeTrial.entryTime;
                  if (timeTrial.dataLayerTrackerHitsKey) target[timeTrial.dataLayerTrackerHitsKey] = timeTrial.trackerHits;
                  if (timeTrial.dataLayerTrialTimeRemainingKey) target[timeTrial.dataLayerTrialTimeRemainingKey] = timeTrial.timeRemainingInTrial;
                }
              });
            }
  
            if (Object.keys(pageView).length > 0) {
              pageView.event = 'zephr-pageview';
              events.unshift(pageView);
            }
  
            events.forEach(event => window[dataLayerFieldName].push(event));
          });
  
          const readyEvent = new Event('zephr.dataLayerReady');
          document.dispatchEvent(readyEvent);
        }
      }
    };
  
    xhr.send(null);
  })();
  