import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../header/header.module';


const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    LoginComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HeaderModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

})
export class LoginModule { }
