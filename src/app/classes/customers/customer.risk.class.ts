import { CustomerCar } from './customer.car.class';
export class RiskControl {
    constructor(
        public _id: string,
        public risk_average: string,
        public risk_comment: string,
        public risk_status: boolean,
        public car_model?: CustomerCar,
        public risk_date?: string
    ) {}
}
