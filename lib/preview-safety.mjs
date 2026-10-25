/** Preview safety is checked before a build or Prisma client can open a connection. */
export function isPreview(env=process.env){return env.VERCEL_ENV==='preview'||env.BM_ISOLATED_PREVIEW==='1';}
export function assertPreviewEnvironment(env=process.env){
 if(!isPreview(env))return;
 if(env.BM_ISOLATED_PREVIEW!=='1'||env.BM_DISABLE_NOTIFICATIONS!=='1')throw Error('Preview requires isolation and notification suppression.');
 for(const [key,value] of Object.entries(env))if(value&&(/^(AT_|BM_NOTIFY_NUMBERS)/.test(key)||/WHATSAPP.*(TOKEN|KEY|SECRET)/i.test(key)))throw Error('Live messaging configuration is forbidden in Preview.');
 const host=env.BM_PREVIEW_DB_HOST,name=env.BM_PREVIEW_DB_NAME,role=env.BM_PREVIEW_DB_ROLE;
 if(!host||!name?.startsWith('bm_preview_')||!role?.startsWith('bm_preview_runtime_'))throw Error('Explicit Preview database identity required.');
 const hosted={host:'ep-broad-river-abhqdvw9.eu-west-2.aws.neon.tech',name:'bm_preview_20261025',role:'bm_preview_runtime_20261025'};
 const ci=env.CI==='true'&&env.VERCEL!=='1'&&host==='127.0.0.1'&&name==='bm_preview_ci'&&role==='bm_preview_runtime_ci';
 if(!ci&&(host!==hosted.host||name!==hosted.name||role!==hosted.role))throw Error('Unapproved Preview identity configuration.');
 const keys=['DATABASE_URL','DIRECT_URL','DATABASE_URL_UNPOOLED','PRISMA_DATABASE_URL'];
 if(!env.DATABASE_URL)throw Error('Preview database URL required.');
 for(const key of keys){if(!env[key])continue;let url;try{url=new URL(env[key]);}catch{throw Error('Invalid Preview database configuration.');}
  const actualHost=url.hostname.replace('-pooler.','.');
  if(['host','hostaddr','user','password','database','dbname','options'].some(key=>url.searchParams.has(key)))throw Error('Connection identity overrides are forbidden.');
  if(!['postgres:','postgresql:'].includes(url.protocol)||actualHost.includes('ep-late-resonance-abvpu8hv')||actualHost!==host||url.pathname!=='/'+name||decodeURIComponent(url.username)!==role)throw Error('Preview database target rejected.');
 }
}
