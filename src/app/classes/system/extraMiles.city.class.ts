/*
lista que se encarga de crear la interfaz de millas extras por vehiculo, por ciudad
*/
export class ListExtraMileCityClass {
    constructor (
        public car_type: string, // ObjectId de la clase DutyVehicleTypeClass del archivo vehicles.class
        public extra_miles: number, // Valor de la milla extra
        public city: string // ObjectId de la clase SystemFeeClass del archivo fees.class.ts
    ) {}
}
