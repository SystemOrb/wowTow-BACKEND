import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/customers/risk.service';
import { RiskControl } from '../../../classes/customers/customer.risk.class';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styles: []
})
export class RiskComponent implements OnInit {
  public Risk: RiskControl[] | any[] = [];
  toHTML: HTMLDocument;
  constructor(private _risk: RiskService, private _router: Router) { }
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
  confirmation(riskKey: string, index: number) {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this Risk Control?',
      icon: 'warning',
      dangerMode: false,
    })
    .then(async willDelete => {
      const deleted = await this.RemoveControl(riskKey, index);
      if (willDelete && deleted) {
        swal('Operation Successfully!', 'Your Risk Control has been deleted!', 'success');
      }
    });
  }
  RemoveControl(RiskKey: string, index: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this._risk.removeRisk(RiskKey).subscribe(
          (Risk: any) => {
            if (Risk.status) {
              this.Risk.splice(index, 1);
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      } catch (error) {
        throw error;
      }
    });
  }
  navigate(riskKey: string) {
    this._router.navigate([`/admin/controls/risk/${riskKey}`]);
  }
}
