import {spawnSync} from "node:child_process";
import {mkdirSync,writeFileSync,readdirSync} from "node:fs";
import path from "node:path";
const output=process.argv[2];
if(!output||!path.isAbsolute(output))throw new Error("Supply an absolute evidence output directory.");
mkdirSync(output,{recursive:true});
const checks=[
 ["typescript",process.execPath,["node_modules/typescript/bin/tsc","--noEmit","--incremental","false"]],
 ["lint",process.execPath,["node_modules/eslint/bin/eslint.js","."]],
 ["unit-tests",process.execPath,["--test","--test-concurrency=1",...readdirSync("tests").filter(name=>name.endsWith(".test.mjs")).map(name=>"tests/"+name)]],
 ["intake-integration",process.execPath,["--test","tests/enquiry-integration.mjs"]],
];
const evidence=[];
for(const [name,command,args]of checks){
 const result=spawnSync(command,args,{encoding:"utf8"});
 const log=(result.stdout||"")+(result.stderr||"");
 writeFileSync(path.join(output,name+".txt"),log);
 evidence.push({name,exitCode:result.status});
 console.log(name+": "+(result.status===0?"PASS":"FAIL"));
}
writeFileSync(path.join(output,"verification.json"),JSON.stringify(evidence,null,2));
process.exit(evidence.every(result=>result.exitCode===0)?0:1);
