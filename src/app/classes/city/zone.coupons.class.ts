export class Coupon {
    constructor (
        public amount_discount: number,
        public date_start: Date,
        public date_end: Date,
        public city?: string,
        public _id?: string
    ) {}
}
