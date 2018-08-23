import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from '../auth/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor (private _admin: AdminService, private _router: Router) {
  }
  async canActivate() {
    const logged = await this._admin.ngOnInit();
    if (!logged) {
      this._router.navigate(['/login', {
        session: 'TimeOut'
      }]);
      return;
    } else {
      if (this._admin.Token === null && (this._admin.AdminLogged) === null) {
        this._router.navigate(['/login', {
          session: 'TimeOut'
        }]);
        return;
      }
    }
    return true;
  }
}
