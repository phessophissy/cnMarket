export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= maxRetries; i++) {
    try { return await fn(); } catch (err) { lastError = err; if (i < maxRetries) await new Promise(r => setTimeout(r, delay * (i + 1))); }
  }
  throw lastError;
}
