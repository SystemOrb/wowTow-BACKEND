import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { ProvidersDocumentsService } from '../providers/providers-documents.service';
import { DocumentExpiration } from '../../classes/employers/document.expiration.class';

@Injectable({
  providedIn: 'root'
})
export class ExpirationGuard implements CanActivate {
  constructor(private _expService: ProvidersDocumentsService) {
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.getAllExpiration().then((resolve: any) => {
      if (resolve.length) {
      }
    }, (Exception) => {
      throw new Error(Exception);
    });
    return true;
  }
  getAllExpiration(): Promise<DocumentExpiration | boolean> {
    return new Promise((resolve, reject) => {
      this._expService.allExpirations().subscribe(
        (ExpirationsDocs: PartialObserver<any> | any): void => {
          if (!ExpirationsDocs.status) {
            reject(ExpirationsDocs.msg);
          }
          resolve(ExpirationsDocs.allDocumentData);
        }
      );
    });
  }
}
