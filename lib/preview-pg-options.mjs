import { Socket } from "node:net";
import { assertPreviewEnvironment, isPreview } from "./preview-safety.mjs";

export const PREVIEW_CONNECTION_BUDGET_MS = 15000;
export const PREVIEW_ADDRESS_ATTEMPT_MS = 1000;

/** Scope the longer address-attempt window to approved Preview pg sockets only.
 * No global DNS/network changes, IPv4 forcing, TLS changes or write retries.
 */
export function previewPgOptions(env = process.env) {
  if (!isPreview(env)) return {};
  assertPreviewEnvironment(env);
  return {
    max: 1,
    connectionTimeoutMillis: PREVIEW_CONNECTION_BUDGET_MS,
    stream: () => {
      const socket = new Socket();
      socket.connect = function (port, host) {
        return Socket.prototype.connect.call(this, {
          port,
          host,
          autoSelectFamily: true,
          autoSelectFamilyAttemptTimeout: PREVIEW_ADDRESS_ATTEMPT_MS,
        });
      };
      return socket;
    },
  };
}
