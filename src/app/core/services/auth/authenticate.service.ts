/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SystemConstant } from '../../constants/system.constant';
import { UrlConstant } from '../../constants/url.constant';
import { AuthModel, LoginFormModel } from '../../models/common/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrlAdmin: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrlAdmin = UrlConstant.API.LOGIN_ADMIN;
  }

  // common
  getNameOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO))?.fullName;
  }
  getAvatarOfLogin(): string {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO))?.avatar;
  }

  // login Admin + Secretary google
  doLoginAdminSecretaryGoogle(token: string): Observable<AuthModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        idToken: token
      })
    };

    return this.http
      .post<AuthModel>(this.apiUrlAdmin + `/google`, null, httpOptions)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  // login Admin + Secretary username/pass
  doLoginAdminSecretaryForm(model: LoginFormModel): Observable<AuthModel> {
    return this.http
      .post<AuthModel>(this.apiUrlAdmin, model)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  // set/ get localStorage model Auth
  getAuthData(): AuthModel {
    return JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO));
  }

  setAuthData(model: AuthModel): void {
    localStorage.setItem(
      SystemConstant.CURRENT_INFO,
      JSON.stringify(model)
    );
  }

  // logout
  doLogout(): void {
    localStorage.removeItem(SystemConstant.CURRENT_INFO);
    localStorage.removeItem(SystemConstant.CURRENT_INFO_GOOGLE);
    this.router.navigate([UrlConstant.ROUTE.MAIN.HOME]);
  }

  // check roles
  checkRoleAdmin(): boolean {
    const auth = this.getAuthData();
    let role = [];
    role = auth.roles.filter(item => item === SystemConstant.ROLE.ADMIN);
    if (role && role.length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
