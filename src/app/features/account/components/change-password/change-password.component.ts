import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  constructor(private _authService: AuthService
  ) { }

  updatePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
    confirmNewPassword: new FormControl(null, [Validators.required]),
  })

  updatePassword() {
    console.log(this.updatePasswordForm);
    if (this.updatePasswordForm.valid) {
      this._authService.updatePassword(this.updatePasswordForm.value).subscribe({
        next: (data) => {
          console.log(data);

        },
        error: (err) => {
          console.log(err.error.message);
          alert(err.error.message)
        }

      })
    }
  }


}
