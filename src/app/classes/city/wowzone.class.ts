import { Geozone } from './google.zone.class';
export class WowTowZone {
    constructor (
        public base_rate: number,
        public status: boolean,
        public geozone: Geozone,
        public _id?: string
    ) {}
}
