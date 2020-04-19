import PouchDB from "pouchdb";
import NodeWebSQLAdapter from "pouchdb-adapter-node-websql";
const PouchFind = require("pouchdb-find");

PouchDB.plugin(NodeWebSQLAdapter);
PouchDB.plugin(PouchFind);

export default function createDB(name: string) {
    return new PouchDB(`${name}.db`, { adapter: 'websql' })
}