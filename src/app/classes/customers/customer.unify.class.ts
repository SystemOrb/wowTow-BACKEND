import { CustomerCar } from './customer.car.class';
import { Customer } from './customer.class';
export class AllDataCustomer {
    constructor(
        public _keyPrincipal: string,
        public car_model: CustomerCar,
        public client: Customer
    ) {}
}
