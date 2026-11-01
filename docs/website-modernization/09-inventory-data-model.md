# Minimal inventory — deferred proposal
Confirmed schema has no stock/movement/location/reorder models. First identify existing authoritative inventory/accounting system; keep Engineering and Car Accessories separate.

Proposed only if needed:
- StockLocation: actual Engineering storage, code, active state.
- StockMovement: product/location, signed quantity/type/reason, source reference, unique idempotency key, actor/time and reversal reference.
- StockBalance: product/location unique pair; atomically maintained with movement if needed for efficient reads.
- ReorderPolicy: product/location threshold.
- Reservation: defer unless actual allocation workflow demands it.
Supplier availability is not owned stock. Quotes do not deduct stock. Sales transaction prices are distinct from catalogue prices.

Define units, decimal/integer rules and negative-stock policy. Use transactions and appropriate locking/conditional writes. Keep immutable history/reversals rather than erasing adjustments.

Priority P3. Dependencies: ownership, initial stock count, roles, units/location policy. Risk: dual truth/overselling. Acceptance: concurrent outbound obeys policy, retries do not double-post, balances reconcile and adjustments have actor/reason. Management approves ownership; accounting retains financial authority.
