import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, JsonPipe } from '@angular/common';

import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { GuessingsComponent } from './components/guessings/guessings.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { BodyComponent } from './components/body/body.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GuessTableComponent } from './components/guess-table/guess-table.component';

const routes: Routes = [
    { 
      path: '', component: AdminComponent ,children:[
        {path: '',redirectTo:'login', pathMatch:'full'},
        {path:'login',component: AdminLoginComponent},
        {path:'dashboard',component: DashboardComponent,  canActivate: [AuthGuard]},
        {path:'guessing',component: GuessingsComponent,  canActivate: [AuthGuard]},
]}];


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    AdminLoginComponent,
    BodyComponent,
    DashboardComponent,
    GuessingsComponent,
    GuessTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    JsonPipe,
    DecimalPipe,
    NgxPaginationModule,
    HttpClientModule,
    NgbToastModule,
    NgToastModule,
  ],
  exports:[AdminComponent,RouterModule]
})
export class AdminModule { }
