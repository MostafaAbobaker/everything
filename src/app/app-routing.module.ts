import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './shared/components/not-found404/not-found404.component';
import { LayoutComponent } from './home/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  {path:'home', loadChildren:() => import ('./home/home.module').then((m) => m.HomeModule)},

  { path: '**', component: NotFound404Component } // For handling 404 errors
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
