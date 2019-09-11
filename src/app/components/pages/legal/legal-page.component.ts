import { Component, OnInit } from '@angular/core';
import { PrivacyDocument } from '../../../classes/employers/document.class';
import { ProvidersDocumentsService } from '../../../services/providers/providers-documents.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DocumentExpiration } from '../../../classes/employers/document.expiration.class';
import swal from 'sweetalert';
import * as moment from 'moment';
@Component({
  selector: 'app-legal-page',
  templateUrl: './legal-page.component.html',
  styles: []
})
export class LegalPageComponent implements OnInit {
  Documents: any = '';
  DocExpiration: DocumentExpiration | any;
  docKey: string;
  UpdateExp: boolean;
  UpdateDate: Date;
  constructor(private _docPartial: ProvidersDocumentsService, private _get: ActivatedRoute) {
      this._get.queryParams.subscribe(
        (data) => {
          this.Documents = JSON.parse(data.docData);
          this.docKey = this.Documents._id;
          console.log(this.Documents);
        }
      );
   }

  async ngOnInit() {
    const DocExp: any = await this.getExpiration();
    if (!DocExp || !DocExp.length) {
      this.UpdateExp = false;
    } else {
      this.UpdateExp = true;
      this.DocExpiration = DocExp[0];
      const test: any = moment(this.DocExpiration.expiration, 'DD-MM-YYYY', false);
      this.UpdateDate = test._i.split('T')[0];
    }
  }
  loadProvidersDocs(): Promise<PrivacyDocument> {
    return new Promise((resolve, reject) => {
      try {
        this._docPartial.AllDocuments(this.docKey).subscribe(
          (PrivacyDocs: any): void => {
            if (!PrivacyDocs.status) {
              throw new Error('Failure to response' + PrivacyDocs.msg);
            }
              resolve(PrivacyDocs.documents);
          }
        );
      } catch (error) {
        throw error;
      }
    });
  }
  // ADD EXPIRATION
  // Esta expiración es para validar al proveedor de servicio y añadir vigencia
  AddExpiration(formExp: NgForm): Promise<DocumentExpiration | boolean> {
    return new Promise(async (resolve, reject) => {
      if (!formExp.valid) {
        resolve(false);
      }
      try {
        if (!this.UpdateExp) {
          this._docPartial.addExpiration(
            new DocumentExpiration(formExp.value.doc, formExp.value.exp))
            .subscribe(
              async (PrivacyDocs: any) => {
                if (!PrivacyDocs.status) {
                  resolve(false);
               }
               swal('Operation successfully', 'Document Expiration has been added for this document', 'success');
               this.DocExpiration = PrivacyDocs.document;
               this.UpdateExp = true;
              }
            );
        } else {
          const test = await this.updateExpiration(new DocumentExpiration(formExp.value.doc, formExp.value.exp));
          console.log(test);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  getExpiration(): Promise<DocumentExpiration | boolean> {
    return new Promise((resolve, reject) => {
      try {
        this._docPartial.getExpiration(this.docKey).subscribe(
          (PrivacyDocs: any): void => {
            if (!PrivacyDocs.status) {
               resolve(false);
            }
            resolve(PrivacyDocs.document);
          }
        );
      } catch (error) {
        throw error;
      }
    });
  }
  updateExpiration(docExp: DocumentExpiration): Promise<DocumentExpiration | boolean> {
    return new Promise((resolve, reject) => {
      try {
          this._docPartial.changeExp(this.docKey, docExp)
            .subscribe(
              (PrivacyDocs: any): void => {
                if (!PrivacyDocs.status) {
                  resolve(false);
               }
               console.log(PrivacyDocs);
               swal('Operation successfully', 'Document Expiration has been updated for this document', 'success');
               this.DocExpiration = PrivacyDocs.document;
               this.UpdateExp = true;
              }
            );
      } catch (error) {
        reject(error);
      }
    });
  }
  // ACTIVE DOCUMENT
  // Para validar este documento al proveedor de servicio
  updateDocument(FormDoc: NgForm) {
    if (!FormDoc.valid) {
      return;
    }
    try {
      this._docPartial.validateDoc(this.docKey, new PrivacyDocument(
        this.docKey, FormDoc.value.documentStatus
      )).subscribe(
        (Privacy: any) => {
          if (!Privacy.status) {
            throw new Error(Privacy.msg);
          }
          swal('!Operation success', Privacy.msg, 'success');
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
