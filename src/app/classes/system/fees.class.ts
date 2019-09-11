/*
Clase que se encarga de construir la interfaz
que tendrá todas las variables numericas
del sistema para las app
*/
export class SystemFeeClass {
    constructor(
        public dispatch_service: number, // Costo del dispatch del wootow
        public max_miles: number, // Millas maxima antes de cobrar millas extras
        public wootow_fee: number, // La comisión de wootow por cada servicio en %
        public charge_nigth: number, // Variable incremental en % de incremento por la noche
        public city: string, // Ciudad donde se aplicará la tarifa
        public _id?: string
    ) {}
}
