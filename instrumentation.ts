// Next awaits register before accepting requests on a new Node server instance.
export async function register(){
 if(process.env.NEXT_RUNTIME==='nodejs'){
  const {verifyPreviewDatabase}=await import('./lib/preview-database.mjs');
  await verifyPreviewDatabase();
 }
}
