"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pouchdb_1 = __importDefault(require("pouchdb"));
var pouchdb_adapter_node_websql_1 = __importDefault(require("pouchdb-adapter-node-websql"));
var PouchFind = require("pouchdb-find");
pouchdb_1.default.plugin(pouchdb_adapter_node_websql_1.default);
pouchdb_1.default.plugin(PouchFind);
function createDB(name) {
    return new pouchdb_1.default(name + ".db", { adapter: 'websql' });
}
exports.default = createDB;
