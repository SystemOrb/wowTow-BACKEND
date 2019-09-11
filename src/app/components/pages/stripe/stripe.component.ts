import { Component, OnInit } from '@angular/core';
import { StripeTransactions } from '../../../classes/payments/stripe.payment.class';
import { StripeService } from '../../../services/customers/stripe.service';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase/firebase.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styles: []
})
export class StripeComponent implements OnInit {
  Transactions: StripeTransactions[] | any = [];
  constructor(private _router: Router, private fb: FirebaseService) { }

  async ngOnInit() {
    this.Transactions = await this.GetAllInvoices();
    console.log(this.Transactions);
  }
  GetAllInvoices(): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
      this.fb.GetTrackFromFirebase().subscribe(
        (payments: PartialObserver<any> | any): void => {
          resolve(payments);
        }
      );
    });
  }
  navigateInvoice(objectCharge: any): void {
    this._router.navigate([`/admin/payments/stripe/invoice/${objectCharge.charge.id}`], {
      queryParams: {
        payment: JSON.stringify(objectCharge)
      }
    });
  }
}
