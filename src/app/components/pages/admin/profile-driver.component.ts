import { Component, OnInit } from '@angular/core';
import { Employer } from '../../../classes/employers/customer.employer.class';
import { EmployerTow } from '../../../classes/employers/car.employer.class';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from '../../../services/customers/drivers.service';
import { HTTP_SERVICE } from '../../../config/config.enviroments';

@Component({
  selector: 'app-profile-driver',
  templateUrl: './profile-driver.component.html',
  styles: []
})
export class ProfileDriverComponent implements OnInit {
  _key: string;
  picture: string;
  Employer: Employer;
  Tow: EmployerTow;
  constructor(private _employer: DriversService, private _param: ActivatedRoute) {
    this._param.params.subscribe(
      (get: any) => this._key = get['id']
    );
  }

  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    this._employer.getDriverProfile(this._key).subscribe(
      (profile: any) => {
        if (!profile.status) {
          throw new Error(`title: ${profile.msg} error: ${profile.err}`);
        }
        this.picture = `${HTTP_SERVICE}upload/image/employers/${profile.resp.tow_image}`;
        this.Tow = profile.resp.driver;
        this.Employer = profile.resp.driver.driver;
      }
    );
  }
}
