import { Component, OnInit } from '@angular/core';
import { Employer } from '../../../classes/employers/customer.employer.class';
import { DriversService } from '../../../services/customers/drivers.service';
import { PartialObserver } from 'rxjs';
import { ModalProvidersService } from '../../../services/modal/modal-providers.service';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styles: []
})
export class EmployersComponent implements OnInit {
  Providers: Employer[] | any = [];
  constructor(private _providers: DriversService, public _modal: ModalProvidersService) { }

  async ngOnInit() {
    this.Providers = await this.loadEmployers();
    console.log(this.Providers);
  }
  loadEmployers(): Promise<Employer[] | any> {
    return new Promise((resolve, reject) => {
      this._providers.getAllDrivers().subscribe(
        (ServiceProviders: PartialObserver<any> | any) => {
          if (ServiceProviders.status) {
            resolve(ServiceProviders.resp);
          }
        }
      );
    });
  }
}
