import PouchDB from "pouchdb";

const NodeWebSQLAdapter = require("pouchdb-adapter-node-websql");
const PouchFind = require("pouchdb-find");

PouchDB.plugin(NodeWebSQLAdapter);
PouchDB.plugin(PouchFind);

var _adapter = 'websql';
function setAdapter(adapter: string) {
    _adapter = adapter;
}

function plugin(pouchPlugin: any) {
    PouchDB.plugin(pouchPlugin);
}

const PouchAdapter = { setAdapter, plugin };

export {
    PouchAdapter
}

export default function createDB(name: string) {
    return new PouchDB(`${name}.db`, { adapter: _adapter });
}