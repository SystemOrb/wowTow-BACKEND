import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../services/customers/clients.service';
import { Customer } from '../../../classes/customers/customer.class';
import { CustomerCar } from '../../../classes/customers/customer.car.class';
import { HTTP_SERVICE } from '../../../config/config.enviroments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  _key: string;
  picture: string;
  client: Customer;
  Car: CustomerCar;
  constructor(private _param: ActivatedRoute, private _customer: ClientsService) {
    this._param.params.subscribe((get: any) => {
      this._key = get['id'];
    });
  }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this._customer.getProfileCustomer(this._key).subscribe(
      (profile: any) => {
        if (profile.status) {
          this.picture = profile.resp[0].car_image;
          this.client = profile.resp[0].car_model.client;
          this.Car = profile.resp[0].car_model;
          console.log(profile.resp[0]);
        }
      }
    );
  }
}
