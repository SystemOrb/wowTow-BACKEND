import { Component, OnInit } from '@angular/core';
import { ModalProvidersService } from '../../../services/modal/modal-providers.service';
import { PrivacyDocument } from '../../../classes/employers/document.class';
import { ProvidersDocumentsService } from '../../../services/providers/providers-documents.service';
import { NgForm } from '@angular/forms';
import { DriversService } from '../../../services/customers/drivers.service';
import { PartialObserver } from 'rxjs';
import swal from 'sweetalert';
@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: []
})
export class ProvidersComponent implements OnInit {
  Documents: PrivacyDocument[] | any = [];
  constructor(public _modal: ModalProvidersService, private _provider: DriversService) {
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
  FormAuth(formData: NgForm) {
    if (!formData.valid) {
      return;
    }
    this._provider.AuthorizationProvider(
      this._modal.keyUser, formData.value.authorized)
        .subscribe( (auth: PartialObserver<any> | any) => {
          if (auth.status) {
            swal('System Message', auth.msg, 'success');
            return;
          }
        });
  }
}
