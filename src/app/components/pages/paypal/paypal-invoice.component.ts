import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../classes/payments/paypal.address.class';
import { PaypalService } from '../../../services/customers/paypal.service';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-paypal-invoice',
  templateUrl: './paypal-invoice.component.html',
  styles: []
})
export class PaypalInvoiceComponent implements OnInit {
  paypalKey: string;
  Invoice: Payment | any;
  constructor(private _paypal: PaypalService, private _get: ActivatedRoute) {
    this._get.params.subscribe((param: Subscriber<any>): void => {
      this.paypalKey = param['paypalKey'];
    });
  }

  async ngOnInit() {
    this.Invoice = await this.GetPaypalInvoice();
    console.log(this.Invoice);
  }
  GetPaypalInvoice(): Promise<Payment | any> {
    return new Promise((resolve, reject) => {
      this._paypal.GetInvoiceById(this.paypalKey).subscribe(
        (payments: PartialObserver<any> | any): void => {
          if (!payments.status) {
            throw new Error(payments.msg);
          }
           resolve(payments.invoice);
        }
      );
    });
  }
}
