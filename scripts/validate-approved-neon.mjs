import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {parse} from 'dotenv';
import pg from 'pg';
import path from 'node:path';
// Exact owner-approved non-production target. No CLI argument can select production.
const host='ep-broad-river-abhqdvw9.eu-west-2.aws.neon.tech';
const database='bm_phase1a_validation';
const root=process.cwd(),work=process.argv[2],output=process.argv[3];
if(!work||!output||!path.isAbsolute(work)||!path.isAbsolute(output))throw new Error('Absolute work/evidence paths required.');
const values=parse(await readFile('.env','utf8'));
const url=new URL(values.DATABASE_URL);
url.hostname=host;url.pathname='/'+database;url.search='?sslmode=require';
const client=new pg.Client({connectionString:url.toString(),ssl:{rejectUnauthorized:true},statement_timeout:30000});
await mkdir(output,{recursive:true});
await mkdir(work,{recursive:true});
await writeFile(path.join(work,'neon-validation.config.ts'),`import {defineConfig} from ${JSON.stringify(path.join(root,'node_modules/prisma/config'))};
export default defineConfig({schema:${JSON.stringify(path.join(root,'prisma/schema.prisma'))},migrations:{path:${JSON.stringify(path.join(root,'prisma/migrations'))}},datasource:{url:process.env.BM_VALIDATION_DATABASE_URL}});`);
const checks=[];
function engine(args,schema){
 const target=new URL(url);target.searchParams.set('schema',schema);
 target.searchParams.set('sslaccept','strict');
 const env={PATH:process.env.PATH,HOME:process.env.HOME,TMPDIR:process.env.TMPDIR,BM_VALIDATION_DATABASE_URL:target.toString(),CHECKPOINT_DISABLE:'1'};
 const r=spawnSync(process.execPath,['node_modules/prisma/build/index.js',...args,'--config',path.join(work,'neon-validation.config.ts')],{env,encoding:'utf8',timeout:120000});
 const log=((r.stdout||'')+(r.stderr||'')).replaceAll(target.toString(),'[redacted connection]').replaceAll(url.password,'[redacted]');
 checks.push({schema,command:args.join(' '),exitCode:r.status});
 return {r,log};
}
try{
 await client.connect();
 const identity=(await client.query('SELECT current_database() AS name,version() AS version')).rows[0];
 if(identity.name!==database||!identity.version.includes('PostgreSQL 18'))throw new Error('Unexpected validation database.');
 const count=(await client.query("SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog','information_schema')")).rows[0].n;
 if(count!==0)throw new Error('Validation requires a completely empty database; existing data will not be overwritten.');
 await writeFile(path.join(output,'native-target.json'),JSON.stringify({host,database,branch:'br-ancient-mountain-abvb2bco',...identity},null,2));
 for(const command of [['migrate','deploy'],['migrate','status'],['migrate','deploy']]){
  const {r,log}=engine(command,'fresh');await writeFile(path.join(output,'fresh-'+checks.length+'.txt'),log);
  if(r.status!==0)throw new Error('Native fresh migration check failed.');
 }
 await client.query('CREATE SCHEMA drift');await client.query('SET search_path TO drift');
 const columns=JSON.parse(await readFile('tests/production-schema-fixture.json','utf8'));
 const quote=x=>'"'+x.replaceAll('"','""')+'"';
 for(const [name,fields] of Map.groupBy(columns,c=>c.table_name))await client.query('CREATE TABLE '+quote(name)+' ('+fields.map(c=>quote(c.column_name)+' '+c.data_type+(c.column_default?' DEFAULT '+c.column_default:'')+(c.is_nullable==='NO'?' NOT NULL':'')).join(',')+')');
 await client.query(`INSERT INTO "Service" (id,slug,"titleEn","descriptionEn","updatedAt") VALUES ('fixture','fixture','Fixture','Keep approved description',now());
 INSERT INTO "Project" (id,slug,category,"titleEn","updatedAt") VALUES ('fixture','keep-approved-url','Approved category','Fixture',now());`);
 for(const command of [['migrate','resolve','--applied','20260704193720_init'],['migrate','deploy'],['migrate','status']]){
  const {r,log}=engine(command,'drift');await writeFile(path.join(output,'drift-'+checks.length+'.txt'),log);
  if(r.status!==0)throw new Error('Native drift migration check failed.');
 }
 const preserved=(await client.query('SELECT slug FROM "Project" WHERE id=\'fixture\'')).rows[0].slug==='keep-approved-url';
 if(!preserved)throw new Error('Fixture URL changed.');
 console.log('Native PostgreSQL 18 migration engine: fresh, repeat, status and drift checks passed.');
}catch{console.error('Native validation failed; review restricted, redacted evidence logs.');process.exitCode=1;}
finally{await writeFile(path.join(output,'native-engine-checks.json'),JSON.stringify(checks,null,2));await client.end();}
