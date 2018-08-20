import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PrivacyDocument } from '../../classes/employers/document.class';
import { DocumentExpiration } from '../../classes/employers/document.expiration.class';

@Injectable({
  providedIn: 'root'
})
export class ProvidersDocumentsService {

  constructor(private _http: HttpClient) { }

  AllDocuments(_expDoc?: string) {
    let urlDocHTTP;
    if (_expDoc) {
      urlDocHTTP = `${HTTP_SERVICE}admin/documents/${_expDoc}`;
    } else {
      urlDocHTTP = `${HTTP_SERVICE}admin/documents`;
    }
    try {
      return this._http.get(urlDocHTTP).pipe(
        map( (LegalDoc: any) => {
          return LegalDoc;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  validateDoc(_keyDoc: string, Doc: PrivacyDocument) {
    try {
      const UrlDocHttp = `${HTTP_SERVICE}admin/documents/${_keyDoc}`;
      return this._http.put(UrlDocHttp, Doc).pipe(
        map( (legalDoc: any) => {
          return legalDoc;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  changeExp(_expDoc: string, Doc: DocumentExpiration) {
    try {
      const UrlDocHttp = `${HTTP_SERVICE}admin/documents/expiration/expByDoc/${_expDoc}`;
      return this._http.put(UrlDocHttp, Doc).pipe(
        map( (legalDoc: any) => {
          return legalDoc;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  addExpiration(docExp: DocumentExpiration) {
    try {
      const UrlDocHttp = `${HTTP_SERVICE}admin/documents/expiration`;
      return this._http.post(UrlDocHttp, docExp).pipe(
        map( (legalDoc: any) => {
          return legalDoc;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  getExpiration(docKey: string) {
    try {
      const UrlDocHttp = `${HTTP_SERVICE}admin/documents/expiration/expByDoc/${docKey}`;
      return this._http.get(UrlDocHttp).pipe(
        map( (legalDoc: any) => {
          return legalDoc;
        }),
        catchError( (err: any) => {
          return new Observable<string>(err);
        }),
      );
    } catch (error) {
      throw error;
    }
  }
  allExpirations() {
    try {
      const UrlDocHttp = `${HTTP_SERVICE}admin/documents/expiration/normal`;
      return this._http.get(UrlDocHttp).pipe(
        map( (legalDoc: any) => {
          return legalDoc;
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
