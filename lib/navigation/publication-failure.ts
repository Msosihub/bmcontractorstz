const transportCodes = new Set(['P1001', 'P1002', 'P1008', 'P1017', 'ECONNRESET', 'ETIMEDOUT']);
const fatalCodes = new Set(['P1000', 'P1010', '28000', '28P01', '42501', '3D000']);
const pgTransportMessages = new Set([
  'Connection terminated due to connection timeout',
  'Connection terminated unexpectedly',
  // pg-pool/index.js: bounded pending-client acquisition timeout, observed locally.
  'timeout exceeded when trying to connect',
]);

/** Only observed transport failures may degrade public navigation. Never log driver messages. */
export function isPublicationTransportFailure(error: unknown): boolean {
  const seen = new Set<object>();
  let current = error;
  let transport = false;
  for (let depth = 0; depth < 6 && current && typeof current === 'object' && !seen.has(current); depth++) {
    seen.add(current);
    const value = current as {code?: unknown; message?: unknown; cause?: unknown; originalError?: unknown};
    const code = typeof value.code === 'string' ? value.code : '';
    if (fatalCodes.has(code) || code.startsWith('28') || (/^[0-9A-Z]{5}$/.test(code) && !code.startsWith('P') && !transportCodes.has(code))) return false;
    if (transportCodes.has(code) || (!code && typeof value.message === 'string' && pgTransportMessages.has(value.message))) transport = true;
    current = value.cause || value.originalError;
  }
  return transport;
}
