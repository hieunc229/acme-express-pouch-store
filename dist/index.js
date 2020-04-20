"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = __importDefault(require("./Store"));
var db_1 = require("./db");
exports.PouchAdapter = db_1.PouchAdapter;
exports.default = Store_1.default;
