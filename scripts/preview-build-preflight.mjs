import {readdir} from 'node:fs/promises';
import {isPreview} from '../lib/preview-safety.mjs';
import {verifyPreviewDatabase} from '../lib/preview-database.mjs';
if(isPreview()){
 if((await readdir('.')).some(name=>name.startsWith('.env')))throw Error('Preview build must not contain environment files.');
 await verifyPreviewDatabase();
}
