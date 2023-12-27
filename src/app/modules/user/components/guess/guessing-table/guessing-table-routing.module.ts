import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessingTableComponent } from './guessing-table.component';

const routes: Routes = [{ path: '', component: GuessingTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuessingTableRoutingModule { }
