export class Employer {
    constructor(
        public _key: string,
        public name: string,
        public email: string,
        public status?: boolean,
        public working?: boolean,
        public authorized?: boolean
    ) {}
}
