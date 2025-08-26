import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Iuser } from '../../interface/iuser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  constructor(private _authService: AuthService, private toastr: ToastrService,
    private _router: Router
  ) { }
  userProfileForm: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    shippingPrice: new FormControl(0),
    regionName: new FormControl(null),
  });

  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile(): void {

    const userId = localStorage.getItem('everything-userId') || '';
    if (!userId) {
      this._router.navigate(['/auth/login']);
      return;
    }
    this._authService.getUserProfile(userId).subscribe({
      next: (result) => {
        this.userProfileForm.patchValue(result);
      },
      error: (err) => {
      },
    });

  }
  UpdateUserProfile(): void {
    debugger
    const formData = new FormData();
    formData.append('fullName', this.userProfileForm.value.fullName);
    formData.append('fullName_Ar', this.userProfileForm.value.fullName);
    formData.append('isActive', "true");
    formData.append('userId', localStorage.getItem('everything-userId') || '');
    formData.append('gender', this.userProfileForm.value.gender);


    this._authService.UpdateUserProfile(formData).subscribe({
      next: (result) => {
        this.getUserProfile();
        this.toastr.success(result.message, 'Profile Updated', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
      },
    });

  }
}
