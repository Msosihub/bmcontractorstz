// Next awaits register before accepting requests on a new Node server instance.
export async function register(){
 if(process.env.NEXT_RUNTIME==='nodejs'){
  const {verifyDatabaseEnvironment}=await import('./lib/production-database.mjs');
  await verifyDatabaseEnvironment();
 }
}
