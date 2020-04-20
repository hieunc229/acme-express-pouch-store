/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
declare function setAdapter(adapter: string): void;
declare function plugin(pouchPlugin: any): void;
declare const PouchAdapter: {
    setAdapter: typeof setAdapter;
    plugin: typeof plugin;
};
export { PouchAdapter };
export default function createDB(name: string): PouchDB.Database<{}>;
