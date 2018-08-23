import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private _http: HttpClient) { }

  // Paypal transactions
  GetAllInvoices() {
    const UrlPayment = `${HTTP_SERVICE}admin/payments/paypal`;
    return this._http.get(UrlPayment).pipe(
        map( (Paypal: any): void => {
          return Paypal;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
  }
  GetInvoiceById(paypalKey: string) {
    const UrlPayment = `${HTTP_SERVICE}admin/payments/paypal/${paypalKey}`;
    return this._http.get(UrlPayment).pipe(
        map( (Paypal: any): void => {
          return Paypal;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
  }
}
