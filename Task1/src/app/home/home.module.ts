import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../header/header.module';


const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    HomeComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    HttpClientModule,
  ],

})
export class HomeModule { }
