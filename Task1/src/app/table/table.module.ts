import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from '../header/header.module';

const routes: Routes = [
  {
      path: '',
      component: TableComponent,
      pathMatch: 'full'
  }
];

@NgModule({
    declarations: [
        TableComponent,
        // HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        HeaderModule
    ]
})
export class TableModule { }
