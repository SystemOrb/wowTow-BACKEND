import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/customers/risk.service';
import { RiskControl } from '../../../classes/customers/customer.risk.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public Risk: RiskControl[] | any[] = [];
  constructor(private _risk: RiskService) { }

  async ngOnInit() {
    this.Risk = await this.UploadTableRisk();
  }
  UploadTableRisk(): Promise<RiskControl[]> {
    return new Promise((resolve, reject) => {
      try {
        this._risk.getRisk().subscribe(
          (Risk: any) => {
            if (!Risk.status) {
              throw new Error('Failure to connect with database server');
            }
            const ArrayControl: RiskControl[] = new Array();
            for (const warning of Risk.dataTransfer) {
              ArrayControl.push(warning);
            }
            resolve(ArrayControl);
          }
        );
      } catch (error) {
        reject(false);
      }
    });
  }
}
