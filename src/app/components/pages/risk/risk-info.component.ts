import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/customers/risk.service';
import { RiskControl } from '../../../classes/customers/customer.risk.class';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
declare const swal: any;
@Component({
  selector: 'app-risk-info',
  templateUrl: './risk-info.component.html',
  styles: []
})
export class RiskInfoComponent implements OnInit {
  Risk: RiskControl | any;
  RiskKey: string;
  constructor(private _risk: RiskService, private _get: ActivatedRoute) {
    this._get.params.subscribe( (get: Params): void => {
      this.RiskKey = get['riskKey'];
    });
   }

  async ngOnInit() {
     this.Risk = await this.getRiskInfo();
  }
  getRiskInfo(): Promise<RiskControl> {
    return new Promise((resolve, reject) => {
      this._risk.getRisk(this.RiskKey).subscribe(
        (Risk: any): void => {
          if (!Risk.status) {
            throw new Error('Failure to load this Risk Control, please try later ' + Risk.err);
          }
          resolve(Risk.AllData);
        }
      );
    });
  }
  updateRiskControl(RiskForm: NgForm): Promise<RiskControl> {
    return new Promise((resolve, reject) => {
      try {
        if (RiskForm.invalid) {
          reject(false);
        }
        this._risk.UpdateRisk(RiskForm.value.risk_key,
        new RiskControl(null, null, null, RiskForm.value.risk_status))
        .subscribe(
          (Risk: any): void => {
            if (!Risk.status) {
              reject(Risk.err);
            }
            if (Risk.Risk.risk_status) {
              swal('Operation Successfully', 'This Risk Control has been closed for administration', 'success');
            } else {
              swal('Operation Successfully', 'This Risk Control has been added in pending review for administration', 'warning');
            }
            return;
          }
        );

      } catch (error) {
        throw error;
      }
    });
  }
}
