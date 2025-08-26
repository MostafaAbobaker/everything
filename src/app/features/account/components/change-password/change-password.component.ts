import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  constructor(private _authService: AuthService, private toastr: ToastrService,
  ) { }

  updatePasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required]),
    confirmNewPassword: new FormControl(null, [Validators.required]),
  })

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      this._authService.updatePassword(this.updatePasswordForm.value).subscribe({
        next: (result) => {
          this.toastr.success(result.message, 'Password Updated', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        },
        error: (err) => {
          this.toastr.warning(err.error.message, 'error ', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }

      })
    }
  }


}
