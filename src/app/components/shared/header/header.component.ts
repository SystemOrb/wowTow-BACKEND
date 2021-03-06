import { Component, OnInit } from '@angular/core';
import { RiskService } from '../../../services/customers/risk.service';
import { RiskControl } from '../../../classes/customers/customer.risk.class';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/auth/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public Risk: RiskControl[] | any = [];
  public displayControlWarning: boolean;
  constructor(private _risk: RiskService, private _admin: AdminService, private _router: Router) { }

  async ngOnInit() {
    this.Risk = await this.UploadTableRisk();
    if (!this.Risk.length) {
      this.displayControlWarning = false;
    } else {
      this.displayControlWarning = true;
    }
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
  async Logout() {
    const logout = await this._admin.clearLocalStorage();
    if (logout) {
      this._router.navigate(['/login']);
    }
  }
}
