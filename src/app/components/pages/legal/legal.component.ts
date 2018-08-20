import { Component, OnInit } from '@angular/core';
import { ProvidersDocumentsService } from '../../../services/providers/providers-documents.service';
import { PrivacyDocument } from '../../../classes/employers/document.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styles: []
})
export class LegalComponent implements OnInit {
  Documents: PrivacyDocument[] | any = [];
  constructor(private _docPartial: ProvidersDocumentsService, private _router: Router) { }

  async ngOnInit() {
    this.Documents = await this.loadProvidersDocs();
    console.log(this.Documents);
  }
  loadProvidersDocs(): Promise<PrivacyDocument[]> {
    return new Promise((resolve, reject) => {
      try {
        this._docPartial.AllDocuments().subscribe(
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
  Navigation(_docKey: string) {
    this._router.navigate([`/admin/documents/${_docKey}`]);
  }
}
