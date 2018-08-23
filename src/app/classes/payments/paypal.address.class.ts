import { PaypalPayment } from './paypal.payment.class';
export class Payment {
    constructor (
        public payer_name: string,
        public payer_address: string,
        public payer_city: string,
        public payer_postcode: string,
        public payer_country: string,
        public service: PaypalPayment,
        public _id?: string
    ) {}
}
