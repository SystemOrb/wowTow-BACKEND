import { Component, OnInit } from '@angular/core';
import { ZoneMapService } from '../../../services/cities/zone-map.service';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { WowTowZone } from '../../../classes/city/wowzone.class';
import { PartialObserver } from 'rxjs/internal/types';
import { ZoneCouponService } from '../../../services/cities/zone-coupon.service';
import { Coupon } from '../../../classes/city/zone.coupons.class';

@Component({
  selector: 'app-zonemap',
  templateUrl: './zonemap.component.html',
  styleUrls: ['./zonemap.component.css']
})
export class ZonemapComponent implements OnInit {
  keyZone: string;
  wowTowZone: WowTowZone;
  zoneCoupon: Coupon | any;
  constructor(private _zone: ZoneMapService, private _get: ActivatedRoute,
  public _coupon: ZoneCouponService) {
    this._get.params.subscribe((param: Subscriber<any>): void => {
      this.keyZone = param['zone'];
    });
  }

  async ngOnInit() {
    this.wowTowZone = await this.GetZoneMap();
    this.zoneCoupon = await this.GetCoupon();
    console.log(this.wowTowZone);
    console.log(this.zoneCoupon);
  }
  GetZoneMap(): Promise<WowTowZone | any> {
    return new Promise((resolve, reject) => {
      this._zone.GetZoneById(this.keyZone).subscribe(
        (Zone: PartialObserver<any> | any): void => {
          if (!Zone.status) {
            throw new Error(Zone.msg);
          }
           resolve(Zone.GeoZone);
        }
      );
    });
  }
  // Coupon
  GetCoupon(): Promise<Coupon | any> {
    return new Promise((resolve, reject) => {
      this._coupon.getCouponByCity(this.keyZone).subscribe(
        (Zone: PartialObserver<any> | any): void => {
          if (!Zone.status) {
            throw new Error(Zone.msg);
          }
           resolve(Zone.Coupon);
        }
      );
    });
  }
  dispatchEventCoupon(): void {
    this._coupon.getCouponByCity(this.keyZone).subscribe(
      (coupon: PartialObserver<any> | any): void => {
        if (coupon.Coupon.length) {
          this._coupon.couponEmitter.emit(coupon.Coupon[0]);
        } else {
          this._coupon.couponEmitter.emit(false);
        }
      }
    );
  }
}
