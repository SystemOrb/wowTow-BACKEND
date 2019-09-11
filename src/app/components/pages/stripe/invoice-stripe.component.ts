import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../../services/customers/stripe.service';
import { StripeTransactions } from '../../../classes/payments/stripe.payment.class';
import { PartialObserver } from 'rxjs/internal/types';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-invoice-stripe',
  templateUrl: './invoice-stripe.component.html',
  styles: []
})
export class InvoiceStripeComponent implements OnInit {
  ObjectCharge: any = '';
  OrderId: string = '';
  Transaction: StripeTransactions | any;
  constructor(private _stripe: StripeService, private _get: ActivatedRoute) {
      this._get.params.subscribe((param: Subscriber<any>): void => {
        this.OrderId = param['stripeKey'];
      });
      // Extra param
      this._get.queryParams.subscribe((extra) => {
        this.ObjectCharge = JSON.parse(extra.payment);
        console.log(this.ObjectCharge);
      });
   }

  async ngOnInit() {
    // this.Transaction = await this.GetAllInvoices();
  }
}
