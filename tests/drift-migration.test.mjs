import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
test('reconciliation handles inspected production column shape without overwriting approved values',async()=>{
 const db=new PGlite();
 try {
  const columns=JSON.parse(await readFile('tests/production-schema-fixture.json','utf8'));
  const tables=Map.groupBy(columns,c=>c.table_name);
  const quote=x=>'"'+x.replaceAll('"','""')+'"';
  for(const [name,fields] of tables)await db.exec('CREATE TABLE '+quote(name)+' ('+fields.map(c=>quote(c.column_name)+' '+c.data_type+(c.column_default?' DEFAULT '+c.column_default:'')+(c.is_nullable==='NO'?' NOT NULL':'')).join(',')+')');
  await db.exec(`INSERT INTO "Service" (id,slug,"titleEn","descriptionEn","updatedAt") VALUES ('s','fixture','Fixture','Preserve existing',now());
   INSERT INTO "CctvPackage" (id,slug,"titleEn",cameras,"updatedAt") VALUES ('c','fixture','Fixture',8,now());
   INSERT INTO "Project" (id,slug,category,"titleEn","updatedAt") VALUES ('p','approved-project','Approved category','Fixture',now());`);
  const migration=await readFile('prisma/migrations/20261016080000_reconcile_auth_and_intake/migration.sql','utf8');
  await db.exec(migration);
  await db.exec(migration); // Repeat is safe; migration history is still managed by Prisma, not this test.
  assert.equal((await db.query('SELECT "descriptionEn" FROM "Service"')).rows[0].descriptionEn,'Preserve existing');
  assert.equal((await db.query('SELECT cameras FROM "CctvPackage"')).rows[0].cameras,8);
  assert.equal((await db.query('SELECT slug FROM "Project"')).rows[0].slug,'approved-project');
  assert.equal((await db.query('SELECT count(*)::int AS n FROM "EnquirySubmission"')).rows[0].n,0);
 }finally{await db.close();}
});
