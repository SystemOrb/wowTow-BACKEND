export class DocumentExpiration {
    constructor(
        public doc: string,
        public exp: Date,
        public _id?: string,
    ) {}
}
