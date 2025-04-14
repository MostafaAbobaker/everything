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
  typePassword : boolean=true;
  typeRePassword : boolean=true;
  apiErrorMessage:string='';
  constructor(private _authService:AuthService, private _router:Router ) { }

  RegisterFrom:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{5,}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{5,}$/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
  }, {
    // validators: this.PasswordMatchedForm
  });

  register() {
    console.log(this.RegisterFrom);
    if(this.RegisterFrom.valid) {
      this._authService.registerFrom(this.RegisterFrom.value).subscribe({
        next:(data) =>{
          console.log(data);
          this._router.navigate(['/Login']);
        },
        error:(err)=>{
          console.log(err.error.message);
          this.apiErrorMessage = err.error.message;
        }


      })
    }
  }

  PasswordMatchedForm = (control: AbstractControl): ValidationErrors | null =>{
    const password = control?.get('password')?.value;
    const rePassword = control?.get('rePassword')?.value;
  return password == rePassword && password && rePassword? null : { passwordMismatch: true };
}
}
