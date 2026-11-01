import {test} from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {PGlite} from "@electric-sql/pglite";
import {Prisma} from "@prisma/client";
test("fresh migration chain reproduces Prisma columns and preserves legacy data/prices",async()=>{
 const db=new PGlite();
 try {
  await db.exec(await readFile("prisma/migrations/20260704193720_init/migration.sql","utf8"));
  await db.exec(`INSERT INTO "Product" ("id","slug","name","price","updatedAt") VALUES ('fixture','fixture','Fixture',12345,CURRENT_TIMESTAMP);
  INSERT INTO "CctvPackage" ("id","slug","titleEn","cameraCount","updatedAt") VALUES ('fixture','fixture','Fixture',8,CURRENT_TIMESTAMP);
  INSERT INTO "SupportArticle" ("id","slug","titleEn","contentEn","category","updatedAt") VALUES ('fixture','fixture','Fixture','Original content','Original category',CURRENT_TIMESTAMP);
  INSERT INTO "Project" ("id","titleEn","serviceType","updatedAt") VALUES ('fixture','Fixture','CCTV',CURRENT_TIMESTAMP);`);
  await db.exec(await readFile("prisma/migrations/20261016080000_reconcile_auth_and_intake/migration.sql","utf8"));
  assert.equal((await db.query('SELECT price FROM "Product" WHERE id=\'fixture\'')).rows[0].price,12345);
  assert.equal((await db.query('SELECT cameras FROM "CctvPackage" WHERE id=\'fixture\'')).rows[0].cameras,8);
  assert.equal((await db.query('SELECT "categoryEn" FROM "SupportArticle" WHERE id=\'fixture\'')).rows[0].categoryEn,"Original category");
  assert.equal((await db.query('SELECT category FROM "Project" WHERE id=\'fixture\'')).rows[0].category,"CCTV");
  assert.equal((await db.query('SELECT count(*)::int AS total FROM pg_constraint WHERE conname=\'CctvPackageItem_packageId_fkey\'')).rows[0].total,1);
  for(const model of Prisma.dmmf.datamodel.models){
   const columns=(await db.query("SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1",[model.name])).rows.map(row=>row.column_name);
   for(const field of model.fields.filter(field=>field.kind!=="object")) assert.ok(columns.includes(field.dbName||field.name),model.name+"."+field.name);
  }
 } finally {await db.close();}
});
