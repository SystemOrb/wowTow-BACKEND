import { Component, OnInit } from '@angular/core';
import { StripeTransactions } from '../../../classes/payments/stripe.payment.class';
import { StripeService } from '../../../services/customers/stripe.service';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styles: []
})
export class StripeComponent implements OnInit {
  Transactions: StripeTransactions[] | any = [];
  constructor(private _stripe: StripeService, private _router: Router) { }

  async ngOnInit() {
    this.Transactions = await this.GetAllInvoices();
  }
  GetAllInvoices(): Promise<StripeTransactions[] | any> {
    return new Promise((resolve, reject) => {
      this._stripe.GetInvoices().subscribe(
        (payments: PartialObserver<any> | any): void => {
          if (!payments.status) {
            throw new Error(payments.msg);
          }
          resolve(payments.allOrder);
        }
      );
    });
  }
  navigateInvoice(stripeKey: string): void {
    this._router.navigate([`/admin/payments/stripe/invoice/${stripeKey}`]);
  }
}
