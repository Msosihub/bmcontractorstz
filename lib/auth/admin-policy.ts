export type AdminSessionPolicy = { phone: string; expiresAt: Date };

export function canAdminister(
  session: AdminSessionPolicy | null,
  isAllowed: (phone: string) => boolean,
  now = new Date(),
) {
  return Boolean(session && session.expiresAt > now && isAllowed(session.phone));
}
