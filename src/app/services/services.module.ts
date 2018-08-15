import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from './payments/stripe.service';
import { PaypalService } from './payments/paypal.service';
import { ClientsService } from './customers/clients.service';
import { DriversService } from './customers/drivers.service';
import { RiskService } from './customers/risk.service';
import { AveragePipe } from './pipes/average.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    StripeService,
    PaypalService,
    DriversService,
    ClientsService,
    RiskService
  ]
})
export class ServicesModule { }
