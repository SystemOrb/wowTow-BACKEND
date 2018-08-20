import { Employer } from './customer.employer.class';
export class PrivacyDocument {
    constructor(
        public doc_key: string,
        public documentStatus: boolean,
        public document_name?: string,
        public document_type?: string,
        public user?: Employer
    ) {}
}
