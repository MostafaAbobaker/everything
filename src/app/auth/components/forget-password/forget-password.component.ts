import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  apiErrorMassage: string = '';
  verifyCode:boolean = false;
  constructor(private _authService:AuthService , private _router: Router) { }

  ForgotPasswordForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });

  forgotPassword() {
    if(this.ForgotPasswordForm.valid) {
      this._authService.forgotPassword(this.ForgotPasswordForm.value).subscribe({
        next:(data)=>{
          this.verifyCode = true;
        },
        error:(err) => {this.apiErrorMassage = err.error.message}
      })
    }
  }


}
