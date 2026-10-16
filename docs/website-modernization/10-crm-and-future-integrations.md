# Integration boundaries — design only
Confirmed source integration: Africa’s Talking SMS. Popup is help links, not an AI agent. No active EspoCRM/n8n integration found in inspected app source; external arrangements unverified.

Use modular monolith: content/catalogue/enquiries/identity/inventory-later/integration adapters. Reuse persistence.
| Data | Authority to confirm | Boundary |
|---|---|---|
| Presentation | Website or approved upstream | Explicit mappings; one master |
| Intake enquiry | Website | Stable ID, persist before notification |
| Follow-up/opportunity | EspoCRM if authoritative | Idempotency by enquiry ID |
| Stock | Existing system if present | No competing stock databases |
| Invoices/payments/balances | Accounting | No custom website ledger |
| Notifications | SMS adapter/n8n if useful | Authenticated, bounded retries, redacted logs |

Future flow: validate → persist once → delivery status → adapter → bounded retry. Small DB outbox only if reliable async delivery requires it; no broker by default.

Defer CRM sync, new WhatsApp APIs, payments, PDF quotes, supplier sync and portals. Verify current Cloud/Evolution API use first. No live customer communications in tests.

Priority P3. Dependencies: owners/field mapping/consent/retention. Risk: duplicate leads/privacy leaks. Acceptance: mocked retries create one lead, errors visible, secrets server-only, minimum personal data. Management approves production connections.
