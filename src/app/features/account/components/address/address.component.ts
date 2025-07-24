import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  addressList?: any;
  defaultAddresses?: any;

  constructor(
    private _authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit(): void {
    this.getUserAddress();
  }
  getUserAddress(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('everything-userId') || '';
      this._authService.getAllUserAddress(userId).subscribe({
        next: (result) => {
          this.addressList = result.filter((item: any) => item.isdefault == false);
          this.defaultAddresses = result.filter((item: any) => item.isdefault);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  updateUserAddress(addressDetail: any): void {
    debugger
    addressDetail.isdefault = true;
    this._authService.UpdateUserAddress(addressDetail).subscribe({
      next: (result) => {
        this.getUserAddress();
        alert(result.message);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
}
