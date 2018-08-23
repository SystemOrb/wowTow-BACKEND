import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../../classes/city/zone.coupons.class';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ZoneCouponService {
  public ExistsCoupon: boolean;
  public zoneKey: string;
  @Output() couponEmitter: EventEmitter<Coupon | any> = new EventEmitter();
  constructor(private _http: HttpClient) { }

  // Services for cities coupons
  createCityCoupon(couponData: Coupon) {
    const UrlCoupon = `${HTTP_SERVICE}admin/cities/coupons`;
    return this._http.post(UrlCoupon, couponData).pipe(
        map((ZoneCoupon: any) => {
          return ZoneCoupon;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
  }
  getCouponByCity(zoneKey: string) {
    const UrlCoupon = `${HTTP_SERVICE}admin/cities/coupons/search/city/${zoneKey}`;
    return this._http.get(UrlCoupon).pipe(
        map((ZoneCoupon: any) => {
          return ZoneCoupon;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
  }
  UpdateCouponCity(couponKey: string, couponData: Coupon) {
    const UrlCoupon = `${HTTP_SERVICE}admin/cities/coupons/${couponKey}`;
    return this._http.put(UrlCoupon, couponData).pipe(
        map((ZoneCoupon: any) => {
          return ZoneCoupon;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
  }
  DeleteCouponCity(couponKey: string) {
    const UrlCoupon = `${HTTP_SERVICE}admin/cities/coupons/${couponKey}`;
    return this._http.delete(UrlCoupon).pipe(
        map((ZoneCoupon: any) => {
          return ZoneCoupon;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
  }
}
