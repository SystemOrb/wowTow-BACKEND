import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map, catchError } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private _http: HttpClient) { }

  getClients() {
    const URL = `${HTTP_SERVICE}client/car/model`;
    return this._http.get(URL).pipe(
      map( (response: any) => {
        return response;
      }),
      catchError( (err: any) => {
        return new Observable<string>(err);
      })
    );
  }
  getProfileCustomer(_key: string) {
    const URL = `${HTTP_SERVICE}client/car/model/image/${_key}`;
    try {
      return this._http.get(URL).pipe(
        map( (response: any) => {
          return response;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        })
      );
    } catch (error) {
        throw error;
    }
  }
}
