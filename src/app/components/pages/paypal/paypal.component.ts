import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../classes/payments/paypal.address.class';
import { PaypalService } from '../../../services/customers/paypal.service';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styles: []
})
export class PaypalComponent implements OnInit {
  PaypalTransactions: Payment[] | any;
  constructor(private _paypal: PaypalService, private _route: Router) { }

  async ngOnInit() {
    this.PaypalTransactions = await this.GetAllInvoices();
    console.log(this.PaypalTransactions);
  }
  GetAllInvoices(): Promise<Payment[] | any> {
    return new Promise((resolve, reject) => {
      this._paypal.GetAllInvoices().subscribe(
        (payments: PartialObserver<any> | any): void => {
          if (!payments.status) {
            throw new Error(payments.msg);
          }
          resolve(payments.invoice);
        }
      );
    });
  }
  navigateInvoice(paypalKey: string) {
    this._route.navigate([`/admin/payments/paypal/${paypalKey}`]);
  }
}
