import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/customers/clients.service';
import { CustomerCar } from '../../../classes/customers/customer.car.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit {
  Customers: CustomerCar[] = [];
  constructor(private _customer: ClientsService, private _route: Router) { }
  ngOnInit() {
      this.loadCustomers();
  }
   loadCustomers() {
    this._customer.getClients().subscribe( (customers: any) => {
        if (customers.status) {
          for (const c of customers.customer) {
            if (c.car_model !== null && (c.car_model)) {
              this.Customers.push(new CustomerCar(
                c.car_model._id,
                c.car_model.car_name,
                c.car_model.car_colour,
                c.car_model.car_plate,
                c.car_model.car_model,
                c.car_image,
                c.car_model.client._id,
                c.car_model.client.name,
                c.car_model.client.email,
                c.car_model.client.GOOGLE,
                c.car_model.client.status
              ));
            }
          }
        } else {
          throw new Error('Failure to load all customers, please try later');
        }
    });
  }
  profileCar(_key: string) {
    this._route.navigate([`/admin/customers/profile/${_key}`]);
  }
}
