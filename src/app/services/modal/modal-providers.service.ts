import { Injectable, Output, EventEmitter } from '@angular/core';
import { ProvidersDocumentsService } from '../providers/providers-documents.service';
import { PrivacyDocument } from '../../classes/employers/document.class';
import { PartialObserver } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalProvidersService {
  @Output() open: EventEmitter<PrivacyDocument[] | any> = new EventEmitter();
  constructor(private _Docs: ProvidersDocumentsService) { }
  public modalDisplay: boolean = false;
  public keyUser: string;

  public modalOpen() {
    if (!this.keyUser) {
      return;
    }
    this._Docs.getAllDocsByUser(this.keyUser).subscribe(
      (Docs: PartialObserver<any> | any): void => {
        this.open.emit(Docs);
      }
    );
  }
}

