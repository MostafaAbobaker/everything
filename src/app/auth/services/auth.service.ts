import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // isLogged = new BehaviorSubject<boolean>(localStorage.getItem('token')? true: false);
  constructor(private _http:HttpClient) {}

  registerFrom(from:any):Observable<any> {
    return this._http.post('Accounts/Register',from)
  }

  loginForm(from:object):Observable<any> {
    return this._http.post('Accounts/Loginbyemailorphone', from)
  }

  forgotPassword(form:object): Observable<any> {
    return this._http.post('auth/forgotPasswords', form)
  }
  checkOTP(form:any): Observable<any> {
    return this._http.post('Accounts/CheckOTP', form)
  }
  resendOTP(id:string): Observable<any> {
    return this._http.post('Accounts/CheckOTP', id)
  }



  logout() {
    // localStorage.removeItem('token');
    // this.isLogged.next(false);
  }
}
