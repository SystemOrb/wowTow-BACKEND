import { CustomerCar } from '../customers/customer.car.class';
export class StripeTransactions {
    constructor (
        public payment_description: string,
        public currency: string,
        public amount: number,
        public create: Date,
        public customer_key: string,
        public payment_status: boolean,
        public payment_system: boolean,
        public card_type: string,
        public client: CustomerCar,
        public transaction_ref?: string,
        public _id?: string,
        public dispute?,

    ) {}
}
