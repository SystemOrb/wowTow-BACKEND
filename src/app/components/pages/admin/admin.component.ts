import { Component, OnInit } from '@angular/core';
import { DriversService } from '../../../services/customers/drivers.service';
import { EmployerTow } from '../../../classes/employers/car.employer.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  Employers: EmployerTow[] = [];
  constructor(private _employers: DriversService, private _router: Router) { }

  ngOnInit() {
    this.loadEmployers();
  }
  loadEmployers() {
    this._employers.getAllDrivers().subscribe(
      (emp: any) => {
        if (!emp.status) {
          throw new Error(`title: ${emp.msg} error: ${emp.err}`);
        }
        for (const drivers of emp.resp ) {
            this.Employers.push(new EmployerTow(
                drivers._id,
                drivers.driver.tow_name,
                drivers.driver.tow_plate,
                drivers.driver.tow_model,
                drivers.tow_image,
                drivers.driver._id,
                null,
                drivers.driver.driver.name,
                drivers.driver.driver.email,
                drivers.driver.driver.status,
                drivers.driver.driver.statusWork,
                drivers.driver.driver.authorized
            ));
        }
      }
    );
  }
  navigateProfile(_key: string) {
    this._router.navigate([`/admin/drivers/profile/${_key}`]);
  }
}
