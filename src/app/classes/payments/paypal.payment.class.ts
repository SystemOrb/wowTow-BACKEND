export class PaypalPayment {
    constructor (
        public payment_status: boolean,
        public item_name: string,
        public item_price: number,
        public item_currency: string,
        public item_description: string,
        public payment_ref: string,
        public payment_date: Date,
        public payment_merchant: string,
        public payer_name: string,
        public payer_lastname: string,
        public payer_email: string,
        public payment_method: string,
        public _id?: string
    ) {}
}
