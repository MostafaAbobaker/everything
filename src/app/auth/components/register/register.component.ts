import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registered : boolean=true;
  otpEmail : boolean=false;
  otpMobile : boolean=false;
  userId : string='';
  typePassword : boolean=true;
  typeRePassword : boolean=true;
  apiErrorMessage:string='';
  errorMessage:string='';
  constructor(private _authService:AuthService, private _router:Router ) { }

  RegisterForm:FormGroup = new FormGroup({
    // name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{5,}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{5,}$/)]),
    PhoneNumber: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
  });

  register() {
    if (this.RegisterForm.valid) {
      const formData = new FormData();
      Object.entries(this.RegisterForm.value).forEach(([key, value]) => {
        formData.append(key, value !== null && value !== undefined ? String(value) : '');
      });
      this._authService.registerFrom(formData).subscribe({
        next: (data) => {
          console.log('Registration successful' , data);
          this.userId = data.userId; // Assuming the API returns userId
          this.registered =false ;
          this.otpEmail =true;
          // this._router.navigate(['./auth/login']);
        },
        error: (err) => {
          // this.apiErrorMessage = err.error.message;

          console.error('Registration failed', err);
          this.errorMessage = err.error
        }
      });
    }
  }

  PasswordMatchedForm = (control: AbstractControl): ValidationErrors | null =>{
    const password = control?.get('password')?.value;
    const rePassword = control?.get('rePassword')?.value;
  return password == rePassword && password && rePassword? null : { passwordMismatch: true };
}
}
