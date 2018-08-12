export class EmployerTow {
    constructor(
        public tow_id: string,
        public tow_name: string,
        public tow_plate: string,
        public tow_model: string,
        public tow_image: string,
        public driver_id?: string,
        public tow_colour?: string,
        public driver_name?: string,
        public driver_email?: string,
        public driver_status?: boolean,
        public driver_working?: boolean,
        public driver_authorized?: boolean
    ) {}
}
