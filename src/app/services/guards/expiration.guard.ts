import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { ProvidersDocumentsService } from '../providers/providers-documents.service';
import { DocumentExpiration } from '../../classes/employers/document.expiration.class';
import { PrivacyDocument } from '../../classes/employers/document.class';
import swal from 'sweetalert';
@Injectable({
  providedIn: 'root'
})
export class ExpirationGuard implements CanActivate {
  constructor(private _expService: ProvidersDocumentsService) {
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.getAllExpiration().then(async (resolve: any) => {
      if (resolve.length) {
        const AllDocsUpdated = await this.ExpiresDate(resolve);
        if (AllDocsUpdated.status) {
          swal('System message', 'The system automatically has been updated with all documents due today', 'info');
        }
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
  ExpiresDate(ExpirationDocCollection: any): Promise<DocumentExpiration | any> {
    return new Promise((resolve, reject) => {
      try {
        // Recorremos la colección de documentos y buscamos su vigencia
        for (const ExpDocs of ExpirationDocCollection) {
          const DateExp = ExpDocs.expiration.split('T')[0];
          // Verificamos si la fecha actual es la misma registrada en el sistema de documentos
          if (DateExp === this.now() && ExpDocs.doc.documentStatus) {
            this._expService.validateDoc(
              ExpDocs.doc._id, new PrivacyDocument(ExpDocs.doc._id, false)
            ).subscribe((Document_: PartialObserver<any> | any) => {
              if (Document_.status) {
                resolve({
                  status: true,
                  change: Document_.activated
                });
              }
            });
          }
        }
      } catch (error) {
        throw error;
      }
    });
  }
  now(): string {
    return new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + new Date().getDate();
  }
}
