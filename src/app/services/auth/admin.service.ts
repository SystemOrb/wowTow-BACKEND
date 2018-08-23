import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminUser } from '../../classes/admin/admin.auth.class';
import { HTTP_SERVICE } from '../../config/config.enviroments';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {
  public Token: string = null;
  public AdminLogged: AdminUser = null;
  constructor(private _http: HttpClient) {
  }
   ngOnInit(): Promise<boolean | any> {
    return new Promise( async (resolve, reject) => {
      const logged = await this.loadLocalStorage();
      if (logged.status) {
        this.AdminLogged = logged.adminData,
        this.Token = logged.token;
        resolve(true);
      }
      resolve(false);
    });
  }
  // Login
  LoginAdmin(user: AdminUser) {
    const loginURL = `${HTTP_SERVICE}admin/login/auth`;
    return this._http.post(loginURL, user).pipe(
      map((Admin: any): void => {
        return Admin;
      }),
      catchError((Exception) => {
        return new Observable<any>(Exception);
      })
    );
  }
  // LocalStorage
  createLocalStorage(admin: AdminUser, token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('TOKEN', token);
      resolve(true);
    });
  }
  loadLocalStorage(): Promise<boolean | any> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('admin') !== null && localStorage.getItem('TOKEN') !== null) {
        resolve({
          status: true,
          token: localStorage.getItem('TOKEN'),
          adminData: JSON.parse(localStorage.getItem('admin'))
        });
      } else {
        resolve(false);
      }
    });
  }
  clearLocalStorage(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve(true);
    });
  }

}
