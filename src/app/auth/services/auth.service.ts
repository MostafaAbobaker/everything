import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // isLogged = new BehaviorSubject<boolean>(localStorage.getItem('token')? true: false);
  constructor(private _http: HttpClient) {

  }

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

  updatePassword(form: object): Observable<any> {
    return this._http.post('Accounts/update-password', form)
  }
  getAllUserAddress(userId: string): Observable<any> {
    return this._http.get('Accounts/get-all-address/' + userId);
  }
  addAddress(form: object): Observable<any> {
    return this._http.post('Accounts/Add-User-Address', form)
  }
  UpdateUserAddress(form: object): Observable<any> {
    return this._http.put('Accounts/Update-User-Address', form)
  }
  deleteUserAddress(addressId: number): Observable<any> {
    return this._http.delete('Accounts/Delete-User-Address/' + addressId);
  }
  UpdateUserProfile(form: object): Observable<any> {
    return this._http.post('Accounts/update-user-profile', form)
  }
  getUserProfile(userId: string): Observable<any> {
    return this._http.get('Accounts/get-user-profile?userId=' + userId);
  }
  getRegions(): Observable<any> {
    return this._http.get('Accounts/get-all-region')
  }
  logout() {
    // localStorage.removeItem('token');
    // this.isLogged.next(false);
  }
}
