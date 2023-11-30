import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

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
    NgbTypeaheadModule,
    NgbPaginationModule,
  ],
  exports: [DashboardComponent,RouterModule]
})
export class DashboardModule { }
