import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AddressComponent } from './components/address/address.component';
import { SettingsComponent } from './components/settings/settings.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { QuotationComponent } from './components/quotation/quotation.component';


@NgModule({
  declarations: [
    AddressComponent,
    SettingsComponent,
    OrdersComponent,
    MyAccountComponent,
    ChangePasswordComponent,
    QuotationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
