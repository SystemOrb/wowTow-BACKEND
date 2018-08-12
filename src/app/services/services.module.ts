import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from './payments/stripe.service';
import { PaypalService } from './payments/paypal.service';
import { ClientsService } from './customers/clients.service';
import { DriversService } from './customers/drivers.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StripeService,
    PaypalService,
    DriversService,
    ClientsService
  ]
})
export class ServicesModule { }
