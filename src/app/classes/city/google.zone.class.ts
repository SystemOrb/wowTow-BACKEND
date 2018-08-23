export class Geozone {
    constructor (
        public formatted_address: string,
        public location_type: string,
        public latitude: number,
        public longitude: number,
        public place_id: string,
        public _id?: string
    ) {}
}
