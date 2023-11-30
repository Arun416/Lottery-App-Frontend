import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'', redirectTo:'admin/dashboard', pathMatch:'full'
  },
  {
    path:'admin/login',
    loadChildren:()=> import('./modules/admin/admin-login/admin-login.module').then(m=>m.AdminLoginModule)
  },
  {
    path:'admin/dashboard',
    loadChildren:()=> import('./modules/admin/dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
