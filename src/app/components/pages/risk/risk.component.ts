import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/customers/risk.service';
import { RiskControl } from '../../../classes/customers/customer.risk.class';
import { Router } from '@angular/router';
import swal from 'sweetalert';
// declare const swal: any;
@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styles: []
})
export class RiskComponent implements OnInit {
  public Risk: RiskControl[] | any = [];
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
            for (const warning of Risk.AllData) {
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
      title: 'Remove Risk Control',
      text: 'Are you sure? This action cannot be undone',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        const rm = await this.RemoveControl(riskKey, index);
        if (!rm) {
          this.Risk.splice(index, 1);
        }
      }
    });
  }
  RemoveControl(RiskKey: string, index: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this._risk.removeRisk(RiskKey).subscribe(
          (Risk: any) => {
            if (Risk.status) {
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
