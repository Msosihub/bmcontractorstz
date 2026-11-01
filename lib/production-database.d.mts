export const PRODUCTION_DATABASE: Readonly<{host:string;name:string;role:string}>;
export function isProduction(env?:Record<string,string|undefined>):boolean;
export function assertProductionEnvironment(env?:Record<string,string|undefined>):void;
export function productionPgOptions(env?:Record<string,string|undefined>):Record<string,unknown>;
export function verifyDatabaseEnvironment(env?:Record<string,string|undefined>):Promise<void>;
