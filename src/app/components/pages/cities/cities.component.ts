import { Component, OnInit } from '@angular/core';
import { ZoneMapService } from '../../../services/cities/zone-map.service';
import { WowTowZone } from '../../../classes/city/wowzone.class';
import { PartialObserver } from 'rxjs/internal/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styles: []
})
export class CitiesComponent implements OnInit {
  Zones: WowTowZone[] = [];
  constructor(private _zone: ZoneMapService, private _router: Router) { }

  async ngOnInit() {
    this.Zones = await this.GetAllInvoices();
  }
  GetAllInvoices(): Promise<WowTowZone[] | any> {
    return new Promise((resolve, reject) => {
      this._zone.GetAllZones().subscribe(
        (GeoZone: PartialObserver<any> | any): void => {
          if (!GeoZone.status) {
            throw new Error(GeoZone.msg);
          }
          resolve(GeoZone.GeoZone);
        }
      );
    });
  }
  navigateZone(zoneKey: string) {
    this._router.navigate([`/admin/cities/${zoneKey}`]);
  }
}
