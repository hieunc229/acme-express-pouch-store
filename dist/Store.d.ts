import { Certificate } from "./types";
declare type Props = {
    name: string;
};
export default class PouchSqliteCertStore {
    private db;
    constructor(props: Props);
    /**
     * Insert a certificate
     */
    insert(domain: string, expiry: number): Promise<Certificate>;
    get(domain: string): Promise<Certificate>;
    /**
     * Remove a certificate
     */
    remove(domain: string): Promise<any>;
    /**
     * update certificate info (used when renewing certificate)
     */
    update(domain: string, changes: any, override?: boolean): Promise<Certificate>;
    /**
     * Get a list of domain that will be expired on or before given date (as in milliseconds)
     */
    getExpiredDomainsByDate(expiry: number): Promise<Certificate[]>;
    destroy(confirm?: boolean): Promise<void>;
}
export {};
