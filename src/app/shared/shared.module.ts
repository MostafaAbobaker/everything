import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    NotFound404Component,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    NotFound404Component,
    RouterModule
  ],
})
export class SharedModule { }
