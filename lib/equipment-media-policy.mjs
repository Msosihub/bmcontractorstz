/** These reference photos are for local design review until source permissions are recorded. */
export function assertEquipmentMediaPublication(env, manifest) {
  const hosted = env.VERCEL === '1' || env.VERCEL_ENV === 'production' || env.BM_CLEAN_PRODUCTION === '1';
  if (!hosted) return;
  if (!Array.isArray(manifest?.assets) || !manifest.assets.length || manifest.assets.some(x => x.productionApproved !== true || typeof x.permissionEvidence !== 'string' || x.permissionEvidence.trim().length < 12)) {
    const error = new Error('Equipment photo reuse clearance is pending. Local review only; hosted publication is blocked.');
    error.code = 'ERR_EQUIPMENT_MEDIA_RIGHTS';
    throw error;
  }
}
