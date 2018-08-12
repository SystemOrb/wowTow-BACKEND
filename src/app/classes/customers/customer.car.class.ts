export class CustomerCar {
    constructor(
        public car_id: string,
        public car_name: string,
        public car_colour: string,
        public car_plate: string,
        public car_model: string,
        public car_image: string,
        public client_id?: string,
        public client_name?: string,
        public client_email?: string,
        public GOOGLE?: boolean,
        public client_status?: boolean
    ) {}
}
