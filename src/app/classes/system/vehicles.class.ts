/*
Clase que se encarga de crear la interfaz
de los vehiculos que maneja el sistema
*/
export class DutyVehicleTypeClass {
    constructor (
        public car_type: string,
        public car_truck: string,
        public truck_price: number,
        public _id?: string
    ) {}
}
