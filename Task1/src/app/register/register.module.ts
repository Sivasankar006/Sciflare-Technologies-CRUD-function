import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../header/header.module';


const routes: Routes = [
  {
      path: '',
      component: RegisterComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
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
export class RegisterModule { }
