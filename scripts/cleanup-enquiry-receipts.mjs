import pg from 'pg';
// Dedicated scheduler command. Does not load .env or share the application URL implicitly.
const url = process.env.BM_RECEIPT_CLEANUP_DATABASE_URL;
if (!url) throw new Error('Dedicated cleanup database URL is required.');
const apply = process.argv.includes('--apply');
const client = new pg.Client({connectionString:url,connectionTimeoutMillis:10000});
try {
 await client.connect();
 await client.query(apply ? 'BEGIN' : 'BEGIN READ ONLY');
 await client.query("SET LOCAL statement_timeout='10s'");
 const cutoff = new Date(Date.now()-24*60*60*1000);
 const result = apply ? await client.query(`WITH expired AS (
  SELECT id FROM "EnquirySubmission" WHERE "createdAt" < $1
  ORDER BY "createdAt" LIMIT 500 FOR UPDATE SKIP LOCKED
 ) DELETE FROM "EnquirySubmission" USING expired WHERE "EnquirySubmission".id=expired.id`,[cutoff])
 : await client.query('SELECT count(*)::int AS expired FROM "EnquirySubmission" WHERE "createdAt" < $1',[cutoff]);
 await client.query('COMMIT');
 console.log(JSON.stringify({mode:apply?'apply':'dry-run',retentionHours:24,batchLimit:500,...(apply?{deleted:result.rowCount}:{expired:result.rows[0].expired})}));
} catch(error) { await client.query('ROLLBACK').catch(()=>{}); console.error('Receipt cleanup failed; code:',error.code || 'unavailable');process.exitCode=1; }
finally {await client.end();}
