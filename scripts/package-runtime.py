import subprocess,pathlib,hashlib,json,tarfile,gzip,io,re
import sys,os
root=pathlib.Path.cwd();out=pathlib.Path(sys.argv[1]).resolve();out.mkdir(parents=True,exist_ok=False)
assert not subprocess.check_output(['git','status','--porcelain'],text=True).strip(),'Dirty candidate'
sha=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();stamp=int(subprocess.check_output(['git','show','-s','--format=%ct',sha],text=True))
files=subprocess.check_output(['git','ls-tree','-r','--name-only',sha],text=True).splitlines()
roots={'package.json','package-lock.json','next.config.ts','tsconfig.json','postcss.config.mjs','eslint.config.mjs','proxy.ts','prisma.config.ts','.vercelignore','instrumentation.ts'}
def included(p):return ((p.split('/')[0] in {'app','components','data','lib','public'} and not p.startswith('public/images/luxury-concepts/originals/')) or p in roots or p in {'prisma/schema.prisma','scripts/preview-build-preflight.mjs','scripts/validate-runtime-archive.mjs'})
inc=[p for p in files if included(p)];required=json.loads(subprocess.check_output([os.environ.get('BM_NODE','node'),'scripts/validate-runtime-archive.mjs','--list'],text=True));assert set(required).issubset(inc),'Missing required runtime entrypoint';exc=[p for p in files if not included(p)];target=os.environ.get('BM_RELEASE_TARGET','preview');assert target in {'preview','production'},'Unsupported release target';archive=out/('bm-'+target+'-'+sha[:12]+'.tar.gz');rows=[]
with archive.open('wb') as raw,gzip.GzipFile(filename='',mode='wb',fileobj=raw,mtime=0) as zipped,tarfile.open(fileobj=zipped,mode='w',format=tarfile.PAX_FORMAT) as tar:
 for p in sorted(inc):
  assert not any(part.startswith('.env') or part in {'.vercel','node_modules','.next','.git'} for part in pathlib.PurePosixPath(p).parts)
  b=subprocess.check_output(['git','show',sha+':'+p]);assert b'-----BEGIN PRIVATE KEY-----' not in b
  if pathlib.Path(p).suffix in {'.ts','.tsx','.js','.mjs','.json','.css'}:assert not re.search(rb'postgres(?:ql)?://[^\s:/]+:[^\s@]+@',b),'Credential-bearing URL in runtime source'
  t=tarfile.TarInfo('bm-phase1b-preview/'+p);t.size=len(b);t.mtime=stamp;t.mode=0o644;t.uid=t.gid=0;t.uname=t.gname='';tar.addfile(t,io.BytesIO(b));rows.append({'path':p,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
archive_sha=hashlib.sha256(archive.read_bytes()).hexdigest();extract=out/('verified-extracted-source-'+sha[:12]);extract.mkdir(exist_ok=False)
with tarfile.open(archive) as tar:tar.extractall(extract,filter='data')
source=extract/'bm-phase1b-preview'
assert all(hashlib.sha256((source/x['path']).read_bytes()).hexdigest()==x['sha256'] for x in rows)
assert not list(source.rglob('.env*')) and not (source/'.vercel').exists()
manifest={'date':'2026-10-28','repository':'Msosihub/bmcontractorstz','branch':subprocess.check_output(['git','branch','--show-current'],text=True).strip(),'commit':sha,'archive':str(archive),'archiveSHA256':archive_sha,'archiveBytes':archive.stat().st_size,'verifiedExtractedSource':str(source),'includedFileCount':len(rows),'includedFiles':rows,'excludedTrackedFiles':exc,'target':{'scope':'erangs-projects','project':'bmcontractorstz','projectId':'prj_RHNQnlM5RmscyTmfXfyyWOKTwVVJ','environment':os.environ.get('BM_RELEASE_TARGET','preview')},'schemaAndLockfileUnchangedSince':'27ab0774f9138c4904da205d1c3aab229595bdb9','deployed':False}
(out/'RELEASE-MANIFEST.json').write_text(json.dumps(manifest,indent=2));(out/'SHA256SUMS').write_text(archive_sha+'  '+archive.name+'\n');print(json.dumps({k:manifest[k] for k in ['commit','archive','archiveSHA256','archiveBytes','includedFileCount','verifiedExtractedSource']},indent=2))

subprocess.run([os.environ.get('BM_NODE','node'),str(source/'scripts/validate-runtime-archive.mjs'),str(source),str(out/'RELEASE-MANIFEST.json')],check=True)
