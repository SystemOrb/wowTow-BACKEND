import { Component, OnInit } from '@angular/core';
import { ModalProvidersService } from '../../../services/modal/modal-providers.service';
import { PrivacyDocument } from '../../../classes/employers/document.class';
import { ProvidersDocumentsService } from '../../../services/providers/providers-documents.service';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: []
})
export class ProvidersComponent implements OnInit {
  Documents: PrivacyDocument[] | any = [];
  constructor(public _modal: ModalProvidersService, private _provider: ProvidersDocumentsService) {
  }

  ngOnInit() {
    this._modal.open.subscribe((resp: any) => {
      if (resp.status) {
        this.Documents = resp.documents;
        console.log(this.Documents);
      }
    }, (error: any) => {
      throw error;
    });
  }

}
