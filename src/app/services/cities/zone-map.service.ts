import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WowTowZone } from '../../classes/city/wowzone.class';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneMapService {

  constructor(private _http: HttpClient) { }

  // Get Location with Google Response API Places
  GoogleApiPlaceQuery(search: string) {
    const UrlZone = `${HTTP_SERVICE}admin/cities/rate/google/${search}`;
    try {
      return this._http.get(UrlZone).pipe(
        map((Zone: any) => {
          return Zone;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
    } catch (error) {
      throw error;
    }
  }
  // Get all locations registered
  GetAllZones() {
    const UrlZone = `${HTTP_SERVICE}admin/cities/rate/google/zone/all`;
    try {
      return this._http.get(UrlZone).pipe(
        map((Zone: any) => {
          return Zone;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
    } catch (error) {
      throw error;
    }
  }
  // Get Location with ID
  GetZoneById(zoneKey: string) {
    const UrlZone = `${HTTP_SERVICE}admin/cities/rate/google/zone/location/${zoneKey}`;
    try {
      return this._http.get(UrlZone).pipe(
        map((Zone: any) => {
          return Zone;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
    } catch (error) {
      throw error;
    }
  }
  // Create a new zone with Google API
  CreateZone(location: WowTowZone) {
    const UrlZone = `${HTTP_SERVICE}admin/cities/rate/google`;
    try {
      return this._http.get(UrlZone).pipe(
        map((Zone: any) => {
          return Zone;
        }),
        catchError((Exception) => {
          return new Observable<any>(Exception);
        })
      );
    } catch (error) {
      throw error;
    }
  }
}
