import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RiskControl } from '../../classes/customers/customer.risk.class';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(private _http: HttpClient) { }

  getRisk(RiskKey?: string) {
    try {
      let url;
      if (RiskKey) {
        url = `${HTTP_SERVICE}client/car/risk/${RiskKey}`;
      } else {
        url = `${HTTP_SERVICE}client/car/risk`;
      }
      return this._http.get(url).pipe(
        map( (riskControl: any) => {
          return riskControl;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  removeRisk(RiskKey: string) {
    try {
      const url = `${HTTP_SERVICE}client/car/risk/${RiskKey}`;
      return this._http.delete(url).pipe(
        map( (riskControl: any) => {
          return riskControl;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  UpdateRisk(RiskKey: string, Risk: RiskControl) {
    try {
      const url = `${HTTP_SERVICE}admin/clients/risk/${RiskKey}`;
      return this._http.put(url, Risk).pipe(
        map( (riskControl: any) => {
          return riskControl;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
