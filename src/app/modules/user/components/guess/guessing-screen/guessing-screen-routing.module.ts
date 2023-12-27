import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessingScreenComponent } from './guessing-screen.component';

const routes: Routes = [{ path: '', component: GuessingScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuessingScreenRoutingModule { }
