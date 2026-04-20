export function isMiniPayBrowser(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.ethereum?.isMiniPay);
}

export function supportsFeeCurrency(): boolean {
  return isMiniPayBrowser();
}

export function getMiniPayConnectorId(): string {
  return "injected";
}
