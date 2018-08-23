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
  keyStripe: string;
  Transaction: StripeTransactions | any;
  constructor(private _stripe: StripeService, private _get: ActivatedRoute) {
      this._get.params.subscribe((param: Subscriber<any>): void => {
        this.keyStripe = param['stripeKey'];
      });
   }

  async ngOnInit() {
    this.Transaction = await this.GetAllInvoices();
    console.log(this.Transaction);
  }
  GetAllInvoices(): Promise<StripeTransactions[] | any> {
    return new Promise((resolve, reject) => {
      this._stripe.GetInvoiceByKey(this.keyStripe).subscribe(
        (payments: PartialObserver<any> | any): void => {
          if (!payments.status) {
            throw new Error(payments.msg);
          }
           resolve(payments.allOrder);
        }
      );
    });
  }

}
