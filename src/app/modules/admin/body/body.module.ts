import { NgModule } from "@angular/core";
import { BodyComponent } from "./body.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes:Routes = [
    {path:'', component: BodyComponent}
]

@NgModule({
    declarations: [BodyComponent],
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [BodyComponent,RouterModule]
})

export class BodyModule {}