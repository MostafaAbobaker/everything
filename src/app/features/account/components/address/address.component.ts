import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { Iaddress } from '../../interface/iaddress';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iregion } from '../../interface/iregion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  addressList: Iaddress[] = [];
  defaultAddresses: Iaddress[] = [];
  regionsOptions: Iregion[] = [];
  constructor(
    private _authService: AuthService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  addressForm: FormGroup = new FormGroup({

    addrees: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.getRegions();
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
        this.toastr.success(result.message, 'Address Updated', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getRegions(): void {
    this._authService.getRegions().subscribe({
      next: (result) => {
        this.regionsOptions = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addNewAddress(): void {
    debugger
    this.addressForm.value.userId = localStorage.getItem('everything-userId') || '';
    this.addressForm.value.maplat = '0';
    this.addressForm.value.maplong = '0';
    this.addressForm.value.isdefault = true;
    this._authService.addAddress(this.addressForm.value).subscribe({
      next: (result) => {
        this.getUserAddress();
        this.toastr.success(result.message, 'New Address Added', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
  deleteAddress(addressId: number): void {
    this._authService.deleteUserAddress(addressId).subscribe({
      next: (result) => {
        this.getUserAddress();
        this.toastr.warning(result.message, 'Address Deleted', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
