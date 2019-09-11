import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from 'src/app/config/config.enviroments';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SystemFeeClass } from 'src/app/classes/system/fees.class';
import { DutyVehicleTypeClass } from '../../classes/system/vehicles.class';
import { ListExtraMileCityClass } from '../../classes/system/extraMiles.city.class';
/*
Se encarga de crear en el sistema todas las tarifas y comisiones que manejará las aplicaciones
imitando el archivo de excel V5
*/
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private _http: HttpClient) { }


  getObjectFromSystem(operationType: string) {
    const URL = `${HTTP_SERVICE}${operationType}`;
    return this._http.get(URL).pipe(
      map( (response: any) => {
        return response;
      }),
      catchError( (err: any) => {
        return new Observable<string>(err);
      })
    );
  }

  UpdateObjectToSystem(operationType: string, ObjectSystem: SystemFeeClass | DutyVehicleTypeClass | ListExtraMileCityClass, id: string) {
    try {
      const url = `${HTTP_SERVICE}${operationType}/${id}`;
      return this._http.put(url, ObjectSystem).pipe(
        map( (data: any) => {
          return data;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  DeleteObjectToSystem(operationType: string, ObjectSystem: SystemFeeClass | DutyVehicleTypeClass | ListExtraMileCityClass, id: string) {
    try {
      const url = `${HTTP_SERVICE}${operationType}/${id}`;
      return this._http.delete(url).pipe(
        map( (data: any) => {
          return data;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  CreateObjectToSystem(operationType: string, ObjectSystem: SystemFeeClass | DutyVehicleTypeClass | ListExtraMileCityClass) {
    try {
      const url = `${HTTP_SERVICE}${operationType}`;
      return this._http.post(url, ObjectSystem).pipe(
        map( (data: any) => {
          return data;
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
