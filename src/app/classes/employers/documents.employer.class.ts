import { PrivacyDocument } from './document.class';

export class ProvidersDocuments {
    constructor (
        public _id: string,
        public doc: PrivacyDocument,
        public expiration: Date
    ) {}
}
