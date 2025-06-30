import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './shared/components/not-found404/not-found404.component';
import { LoginComponent } from './auth/components/login/login.component';
import { noAuthGuard } from './auth/Guards/no-auth.guard';

const routes: Routes = [
  {path:'', loadChildren:() => import ('./features/home/home.module').then((m) => m.HomeModule)},
  {path:'auth', loadChildren:() => import ('./auth/auth.module').then((m) => m.AuthModule)},
  {path:'login', canActivate:[noAuthGuard],component:LoginComponent},
  { path: '**', component: NotFound404Component } // For handling 404 errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
