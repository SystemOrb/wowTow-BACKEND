import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map, catchError } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { AdminService } from '../auth/admin.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private _http: HttpClient, private _admin: AdminService) {
   }

  getAllDrivers() {
    const URL = `${HTTP_SERVICE}admin/employers/membership?token=${this._admin.Token}`;
    try {
      return this._http.get(URL).pipe(
        map( (drivers: any) => {
          return drivers;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  getDriverProfile(_key: string) {
    const URL = `${HTTP_SERVICE}admin/employers/membership/${_key}?token=${this._admin.Token}`;
    try {
      return this._http.get(URL).pipe(
        map( (drivers: any) => {
          return drivers;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  loadPicture(folder: string, img: string) {
    const URL = `${HTTP_SERVICE}upload/${folder}/${img}`;
    return this._http.get(URL).pipe(
      map( (picture: any) => {
        return picture;
      }),
      catchError( (err: any) => {
        return new Observable<string>(err);
      }),
    );
  }
  // Authorization
  AuthorizationProvider(keyUser: string, inputAuth: boolean) {
    const URL = `${HTTP_SERVICE}admin/employers/membership/provider/${keyUser}?token=${this._admin.Token}`;
    return this._http.put(URL, {authorized: inputAuth}).pipe(
      map( (Authorization: any) => {
        return Authorization;
      }),
      catchError( (err: any) => {
        return new Observable<string>(err);
      }),
    );
  }
}

