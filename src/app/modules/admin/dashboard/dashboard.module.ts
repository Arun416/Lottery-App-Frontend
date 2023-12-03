import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
const routes:Routes = [
  {path:'', component:DashboardComponent}
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    JsonPipe,
    DecimalPipe,
    OrderModule,
    NgxPaginationModule
  ],
  exports: [DashboardComponent,RouterModule]
})
export class DashboardModule { }
