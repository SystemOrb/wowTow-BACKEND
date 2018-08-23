import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../services/auth/admin.service';
import { AdminUser } from '../../../classes/admin/admin.auth.class';
import { PartialObserver } from 'rxjs/internal/types';
import swal from 'sweetalert';
import { Router } from '@angular/router';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: Date = new Date();

  constructor(private _admin: AdminService, private _router: Router) {
      init_plugins();
  }

  ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('full-screen');
      body.classList.add('login');
      const navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');
      if (navbar.classList.contains('nav-up')) {
          navbar.classList.remove('nav-up');
      }
  }
AuthAdmin(formData: NgForm) {
    if (!formData.valid) {
        return;
    }
    // Sistema de login con save en LocalStorage y Token Save
    this._admin.LoginAdmin(new AdminUser(formData.value.email, formData.value.password))
        .subscribe( async (Auth: PartialObserver<any> | any) => {
            if (Auth.status) {
                const saveAdmin = new AdminUser(Auth.data.email, null, Auth.data.name,
                Auth.data.ROLE, Auth.data.status, Auth.token, Auth.data._id);
                 const storage = await this._admin.createLocalStorage(saveAdmin, Auth.token);
                 if (storage) {
                     const validateSaved = await this._admin.loadLocalStorage();
                     if (validateSaved.status) {
                        setTimeout((): void => {
                            this._router.navigate(['/dashboard']);
                        }, 2000);
                     }
                 }
            }
        }, ((): void => {
            swal('Error', 'failed authentication, re-enter your credentials', 'error');
        }));
}

}
