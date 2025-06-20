import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpMobileComponent } from './components/otp-mobile/otp-mobile.component';
import { OtpEmailComponent } from './components/otp-email/otp-email.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    SetPasswordComponent,
    OtpMobileComponent,
    OtpEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
