import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-email',
  templateUrl: './otp-email.component.html',
  styleUrl: './otp-email.component.scss'
})
export class OtpEmailComponent implements OnInit {
  otpForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  timer: number = 60;
  intervalId: any;
  resendDisabled: boolean = true;

  @Input() idUser: string = '';
  constructor(private fb: FormBuilder, private _authService: AuthService,private _router: Router) {
    this.otpForm = this.fb.group({
      userId: [this.idUser],
      otp: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.startTimer();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startTimer() {
    this.timer = 60;
    this.resendDisabled = true;
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.resendDisabled = false;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  resendCode() {
    // TODO: Add logic to actually resend the code via API
    this.startTimer();
  }

  submitOtp() {

     if (this.otpForm.valid) {
    const otpData = {
      "userId": this.idUser,
      "otp": this.otpForm.get('otp')?.value
    };
debugger
  this.otpForm.value.userId = this.idUser
    this._authService.checkOTP(this.otpForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'تم التحقق بنجاح';
        this.errorMessage = '';
        this._router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'حدث خطأ في التحقق';
        this.successMessage = '';
      },

    });
    /* this._authService.checkOTP(this.otpForm.value).subscribe({
        next: (response) => {
        },
        error: (error) => {

          this.errorMessage = error.error.message || 'حدث خطأ أثناء التحقق من رمز OTP.';
        }
      }); */
  }
}
}
