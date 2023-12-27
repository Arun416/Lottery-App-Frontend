import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, JsonPipe } from '@angular/common';

import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MenuPageComponent } from './components/menu-page/menu-page.component';
import { DisplayComponent } from './components/display/display.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { TableComponent } from './components/table/table.component';
import { GuessingScreenComponent } from './components/guess/guessing-screen/guessing-screen.component';
import { GuessingTableComponent } from './components/guess/guessing-table/guessing-table.component';

const routes: Routes = [  
  { path: '', component: UserComponent ,children:[
    {path: '',redirectTo:'menu', pathMatch:'full'}, 
    {path:'menu',component: MenuPageComponent},
    {path:'Dashboard',component: DisplayComponent },
    {path:'records',component: TableComponent },
    {path:'guess-page',component:GuessingScreenComponent},
    {path:'guess-records',component:GuessingTableComponent},
  ]}
 ];

@NgModule({
  declarations: [
    UserComponent,
    MenuPageComponent,
    DisplayComponent,
    TableComponent,
    GuessingScreenComponent,
    GuessingTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    JsonPipe,
    DecimalPipe,
    NgxPaginationModule
  ],
  exports:[UserComponent,RouterModule]
})
export class UserModule { }
