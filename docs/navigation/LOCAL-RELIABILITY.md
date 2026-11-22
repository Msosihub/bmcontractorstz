# Navigation reliability observation — 22 November 2026

One actual local production-mode homepage request during the Kiswahili 820 px browser run returned HTTP 500. The server logged Prisma P1008 / DriverAdapterError SocketTimeout on Service.findMany. The compiled stack was traced to the new navigation publication read. Earlier 84 link cases and 142 manufacturer-model cases passed. A simultaneous independent recording run also completed normally. No form was submitted and no write was replayed.

The approved synthetic pg options remain max=1, connectionTimeoutMillis=15000 and the existing 1000 ms address-attempt window. No pool, network, DNS, TLS, compute, permission, credential or Production setting was changed. The evidence does not separate a socket/adapter/pool event from a Neon compute or network cause; it does not establish a permanent connectivity fix.

Minimal application correction: a recognized transport failure in the public navigation publication query omits **all** service-dependent destinations, including manufacturer aliases/features. It retains only independent directory/company/contact discovery and displays a clear bilingual notice. It performs no automatic retry and does not assume static services are published. This conservative result is request-scoped only; a subsequent request reads publication again. Unknown/permission errors still propagate.

This boundary does not catch or change instrumentation, database identity/privilege guards, authentication, enquiry persistence or other application database errors. Startup with an invalid identity remains blocked. Existing safeguards and connection budgets are unchanged.

Automated fault tests exercise the actual server Header boundary with a synthetic P1008 and assert no service/manufacturer links, useful directory/contact destinations and no retry. A permission error must still throw. Publication-state tests cover explicit withdrawal, planned metadata and normal bilingual navigation without changing shared Preview service records.

A protected hosted Preview must recheck first/post-idle reads, bounded concurrent public requests, publication behavior and recovery. The underlying intermittent synthetic transport issue remains an operational uncertainty; this correction prevents this particular navigation query from blanking otherwise available content, rather than claiming to fix all database reliability.
