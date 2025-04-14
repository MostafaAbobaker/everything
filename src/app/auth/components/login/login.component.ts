import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mailExample= 'meyorat307@ronete.com'

  typePassword:boolean = true;

  apiErrorMassage:string='';

  destroyLogin?: Subscription;

  constructor(private _authService:AuthService,
              private _router: Router,
              ) {}


  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
  })

  login() {
    console.log(this.loginForm);
    if(this.loginForm.valid) {
      this.destroyLogin = this._authService.loginForm(this.loginForm.value).subscribe({
        next:(data) => {console.log(data);
          this._router.navigate(['/home']);
          // this._authService.isLogged.next(true);
          localStorage.setItem('token', data.token);
          // console.log('Done Login' , localStorage.getItem('token'));

        },
        error:(err) => {console.log(err.error.message);
          // this.apiErrorMassage = err.error.message;
          alert(err.error.message)
        }

      })
    }
  }

  ngOnDestroy(): void {
    /* this.destroyLogin?.unsubscribe()
    console.log('Done Destroy' , this.destroyLogin); */

  }
}
