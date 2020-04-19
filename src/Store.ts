import { Certificate } from "./types";
import createDB from "./db";

type Props = {
    name: string,
}
export default class PouchSqliteCertStore {

    private db: PouchDB.Database;

    constructor(props: Props) {
        this.db = createDB(props.name);
    }

    /**
     * Insert a certificate
     */
    insert(domain: string, expiry: number): Promise<Certificate> {

        return new Promise((resolve, reject) => {
            this.db.put({ _id: domain, expiry })
                .then(rs => {
                    resolve({ _id: domain, expiry });
                })
                .catch(reject)
        })
    }

    get(domain: string): Promise<Certificate> {
        return new Promise((resolve, reject) => {
            this.db.get(domain)
                .then(rs => {
                    // @ts-ignore
                    resolve({ _id: rs._id, expiry: rs.expiry })
                })
                .catch(err => reject(new Error("Unable to fetch domain")))
        })
    }

    /**
     * Remove a certificate
     */
    remove(domain: string): Promise<any> {

        const _db = this.db;

        return new Promise((resolve, reject) => {
            _db.get(domain)
                .then(rs => {
                    _db.remove(rs)
                        .then(resolve).catch(reject)
                })
                .catch(reject)
        })
    }


    /**
     * update certificate info (used when renewing certificate)
     */
    update(domain: string, changes: any, override?: boolean): Promise<Certificate> {

        const _db = this.db;

        return new Promise((resolve, reject) => {

            _db.get(domain)
                .then(rs => {

                    let object = {
                        _id: domain,
                        // @ts-ignore
                        expiry: rs.expiry,
                        ...changes
                    };

                    _db.put({ ...object, _rev: rs._rev })
                        .then(rs => {
                            resolve(object)
                        })
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    /**
     * Get a list of domain that will be expired on or before given date (as in milliseconds)
     */
    getExpiredDomainsByDate(expiry: number): Promise<Certificate[]> {

        return new Promise((resolve, reject) => {
            this.db.find({
                selector: { expiry },
                fields: ['_id', 'expiry'],
                sort: ['_id']
            })
                .then(rs => {
                    resolve(rs.docs as any as Certificate[]);
                })
                .catch(reject);
        })
    }

    destroy(confirm?: boolean) {

        if (!confirm) {
            return Promise.reject(`Unable to destroy database since it hasn't been confirmed`);
        }

        return this.db.destroy();
    }
}