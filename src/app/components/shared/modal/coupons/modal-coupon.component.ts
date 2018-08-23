import { Component, OnInit } from '@angular/core';
import { ZoneCouponService } from '../../../../services/cities/zone-coupon.service';
import { Coupon } from '../../../../classes/city/zone.coupons.class';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-coupon',
  templateUrl: './modal-coupon.component.html',
  styles: []
})
export class ModalCouponComponent implements OnInit {
  CouponData: Coupon | any;
  newCoupon: boolean;
  constructor(public _zone: ZoneCouponService, private _route: Router) { }

  async ngOnInit() {
    this._zone.couponEmitter.subscribe(
      (CouponData: any): void => {
        this.CouponData = CouponData;
        if (!this.CouponData) {
          this.newCoupon = true;
          this.CouponData = new Coupon(0, new Date(), new Date(), null, null);
        } else {
          this.CouponData = CouponData;
          const NewDateStart: any = moment(this.CouponData.date_start, 'DD-MM-YYYY', false);
          const NewDateEnd: any = moment(this.CouponData.date_end, 'DD-MM-YYYY', false);
          this.CouponData.date_start = NewDateStart._i.split('T')[0];
          this.CouponData.date_end = NewDateEnd._i.split('T')[0];
          this.newCoupon = false;
          console.log(this.CouponData);
        }
      }, (err: any): void => {
        throw err;
      }
    );
  }
  CouponConfiguration(CouponData: NgForm) {
    if (!CouponData.valid) {
      return;
    }
    if (this.newCoupon) {
      const coupon = new Coupon(CouponData.value.amount_discount,
         CouponData.value.date_start, CouponData.value.date_end,
        this._zone.zoneKey);
        this._zone.createCityCoupon(coupon).subscribe(
          (couponInsert: any): void => {
            if (couponInsert.status) {
              swal('!Operation Success', 'Your Coupon for this zone has been loaded', 'success');
              return;
            }
          }
        );
    } else {
      // Update coupon
      const coupon = new Coupon(CouponData.value.amount_discount,
        CouponData.value.date_start, CouponData.value.date_end,
       this._zone.zoneKey);
       this._zone.UpdateCouponCity(this.CouponData._id, coupon).subscribe(
         (couponUpdate: any): void => {
          if (couponUpdate.status) {
            swal('!Operation Success', 'Your Coupon for this zone has been updated', 'success');
            return;
          }
         }
       );
    }
  }
  Resfresh() {
    this._zone.ExistsCoupon = false;
    this._route.navigate([`/admin/redirection/cities/${this._zone.zoneKey}`]);
    // cities = Path en el que estamos
    // El key para volver a este mismo path
  }
}
