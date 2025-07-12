import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../auth/Guards/auth.guard';
import { AddressComponent } from './components/address/address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { QuotationComponent } from './components/quotation/quotation.component';

const routes: Routes = [
    { path: '', component:MyAccountComponent,children:[
      {path:'',redirectTo:'orders', pathMatch:'full'},

      { path: 'orders', component:OrdersComponent},
      { path: 'address', component:AddressComponent},
      { path: 'settings', component:SettingsComponent},
      { path: 'change-password', component:ChangePasswordComponent},
      { path: 'quotation', component:QuotationComponent},

    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
