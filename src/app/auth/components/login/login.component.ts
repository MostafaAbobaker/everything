import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mailExample= 'meyorat307@ronete.com'
   private platformId = inject(PLATFORM_ID);

  typePassword:boolean = true;

  apiErrorMassage:string='';

  destroyLogin?: Subscription;

  constructor(private _authService:AuthService,
              private _router: Router,
              ) {}


  loginForm:FormGroup = new FormGroup({
    emailOrPhone:new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
  })



  login() {
    if(this.loginForm.valid) {
      this.destroyLogin = this._authService.loginForm(this.loginForm.value).subscribe({
        next:(data) => {
          this._router.navigate(['/home']);
          // this._authService.isLogged.next(true);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('everything-token', data.token);
            localStorage.setItem('everything-email', data.email);
            localStorage.setItem('everything-userId', data.userId);

          }



        },
        error:(err) => {
          // this.apiErrorMassage = err.error.message;

        }

      })
    }
  }

  ngOnDestroy(): void {
    //  this.destroyLogin?.unsubscribe()

  }
}
