import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private _http: HttpClient) { }

  // Get all invoices
  GetInvoices() {
    const UrlPayment = `${HTTP_SERVICE}admin/payments/stripe`;
    return this._http.get(UrlPayment).pipe(
      map((stripePayment: any) => {
        return stripePayment;
      }),
      catchError((Exception: any) => {
        return new Observable<any>(Exception);
      }),
    );
  }
  // Invoice by key
  GetInvoiceByKey(stripeKey: string) {
    const UrlPayment = `${HTTP_SERVICE}admin/payments/stripe/${stripeKey}`;
    return this._http.get(UrlPayment).pipe(
      map((stripePayment: any) => {
        return stripePayment;
      }),
      catchError((Exception: any) => {
        return new Observable<any>(Exception);
      }),
    );
  }
}
