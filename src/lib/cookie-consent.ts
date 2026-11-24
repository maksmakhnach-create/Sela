import { COOKIE_POLICY } from "@/data/legal";

export const COOKIE_CONSENT_STORAGE_KEY = "sela-cookie-consent";
export const COOKIE_CONSENT_COOKIE_NAME = "sela_cookie_consent";
export const COOKIE_OPEN_SETTINGS_EVENT = "sela-open-cookie-settings";
export const COOKIE_CONSENT_CHANGE_EVENT = "sela-cookie-consent-change";

export type CookieConsentState = {
  version: string;
  necessary: true;
  analytics: boolean;
  decidedAt: string;
};

export function isConsentCurrent(value: CookieConsentState | null): value is CookieConsentState {
  return Boolean(value && value.version === COOKIE_POLICY.version);
}

export function readCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (!parsed || parsed.necessary !== true || typeof parsed.analytics !== "boolean") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function persistCookieConsent(state: CookieConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify({ v: state.version, a: state.analytics ? 1 : 0 })
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: state })
  );
}

export function buildConsent(analytics: boolean): CookieConsentState {
  return {
    version: COOKIE_POLICY.version,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_OPEN_SETTINGS_EVENT));
}

export function canLoadAnalytics(state: CookieConsentState | null): boolean {
  return isConsentCurrent(state) && state.analytics === true;
}
