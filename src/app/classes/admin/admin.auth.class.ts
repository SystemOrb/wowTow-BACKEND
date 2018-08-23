export class AdminUser {
    constructor (
        public email: string,
        public password: string,
        public name?: string,
        public ROLE?: string,
        public status?: boolean,
        public token?: string,
        public _id?: string
    ) {}
}
