# acme-express-pouch-store

Acme-express certificate storage using [pouchdb](https://github.com/pouchdb/pouchdb). This storage is used to manage and renew certificate.

## Example

_See [src/Store.test.ts](/src/Store.test.ts)_

## API

| Methods
| ------------------------------------------------------------------------
| **insert: (domain: string, expiry: number) => Promise<Certificate>**
| Insert a new certificate info with expiration date in milliseconds
| ------------------------------------------------------------------------
| **get(domain: string): Promise<Certificate>**
| Get a certificate info using domain
| ------------------------------------------------------------------------
| **update: (domain: string, changes: any, override?: boolean ) => Promise<Certificate>**
| Update a certificate info (used after renewing certificate)
| ------------------------------------------------------------------------
| **remove: (domain: string) => Promise<any>**
| Remove a certificate (used when revoking a certficiate)
| ------------------------------------------------------------------------
| **getExpiredDomainsByDate: (expiry: number) => Promise<Certificate[]>**
| Get a list of certificates by on/before the given expiration date (in milliseconds).
| ------------------------------------------------------------------------


## Pouchdb plugin and adapter

By default, it use `sqlite3` with `pouchdb-adapter-node-websql` adapter.
You can replace the its default store by inject into PouchDB as following

```js

// For ES6 syntax
import { PouchAdapter } from "acme-express-pouch-store";

// Or by default
const { PouchAdapter } = require("acme-express-pouch-store");

PouchAdapter.setAdapter(
    adapter: "fs", "websql", ...
)
PouchAdapter.plugin(
    // Any pouchdb plugin
)
```

## Build & Test

To rebuild files, run

```ssh
$ yarn build
$ npm run build // npm
```


This module use Mocha and Chai for testing.

```ssh
$ yarn test
$ npm run test // npm
```

## License

- acme-express-pouch-store: [MIT](/LICENSES/MIT)
- PouchDB, pouchdb-adapter-node-websql, pouchdb-find: [Apache 2.0](/LICENSES/Apache-2.0)
- SQLite3: [See license](https://www.sqlite.org/copyright.html)