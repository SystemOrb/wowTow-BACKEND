import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from './payments/stripe.service';
import { PaypalService } from './payments/paypal.service';
import { ClientsService } from './customers/clients.service';
import { DriversService } from './customers/drivers.service';
import { RiskService } from './customers/risk.service';
import { ProvidersDocumentsService } from './providers/providers-documents.service';
import { ExpirationGuard } from './guards/expiration.guard';
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
    RiskService,
    ProvidersDocumentsService,
    ExpirationGuard
  ]
})
export class ServicesModule { }
