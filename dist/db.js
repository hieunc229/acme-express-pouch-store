"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pouchdb_1 = __importDefault(require("pouchdb"));
var NodeWebSQLAdapter = require("pouchdb-adapter-node-websql");
var PouchFind = require("pouchdb-find");
pouchdb_1.default.plugin(NodeWebSQLAdapter);
pouchdb_1.default.plugin(PouchFind);
var _adapter = 'websql';
function setAdapter(adapter) {
    _adapter = adapter;
}
function plugin(pouchPlugin) {
    pouchdb_1.default.plugin(pouchPlugin);
}
var PouchAdapter = { setAdapter: setAdapter, plugin: plugin };
exports.PouchAdapter = PouchAdapter;
function createDB(name) {
    return new pouchdb_1.default(name + ".db", { adapter: _adapter });
}
exports.default = createDB;
