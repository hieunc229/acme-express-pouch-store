"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var PouchSqliteCertStore = /** @class */ (function () {
    function PouchSqliteCertStore(props) {
        this.db = db_1.default(props.name);
    }
    /**
     * Insert a certificate
     */
    PouchSqliteCertStore.prototype.insert = function (domain, expiry) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.put({ _id: domain, expiry: expiry })
                .then(function (rs) {
                resolve({ _id: domain, expiry: expiry });
            })
                .catch(reject);
        });
    };
    PouchSqliteCertStore.prototype.get = function (domain) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.get(domain)
                .then(function (rs) {
                // @ts-ignore
                resolve({ _id: rs._id, expiry: rs.expiry });
            })
                .catch(function (err) { return reject(new Error("Unable to fetch domain")); });
        });
    };
    /**
     * Remove a certificate
     */
    PouchSqliteCertStore.prototype.remove = function (domain) {
        var _db = this.db;
        return new Promise(function (resolve, reject) {
            _db.get(domain)
                .then(function (rs) {
                _db.remove(rs)
                    .then(resolve).catch(reject);
            })
                .catch(reject);
        });
    };
    /**
     * update certificate info (used when renewing certificate)
     */
    PouchSqliteCertStore.prototype.update = function (domain, changes, override) {
        var _db = this.db;
        return new Promise(function (resolve, reject) {
            _db.get(domain)
                .then(function (rs) {
                var object = __assign({ _id: domain, 
                    // @ts-ignore
                    expiry: rs.expiry }, changes);
                _db.put(__assign(__assign({}, object), { _rev: rs._rev }))
                    .then(function (rs) {
                    resolve(object);
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    };
    /**
     * Get a list of domain that will be expired on or before given date (as in milliseconds)
     */
    PouchSqliteCertStore.prototype.getExpiredDomainsByDate = function (expiry) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.find({
                selector: { expiry: expiry },
                fields: ['_id', 'expiry'],
                sort: ['_id']
            })
                .then(function (rs) {
                resolve(rs.docs);
            })
                .catch(reject);
        });
    };
    PouchSqliteCertStore.prototype.destroy = function (confirm) {
        if (!confirm) {
            return Promise.reject("Unable to destroy database since it hasn't been confirmed");
        }
        return this.db.destroy();
    };
    return PouchSqliteCertStore;
}());
exports.default = PouchSqliteCertStore;
