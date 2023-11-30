import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes:Routes= [
    {path:'',component:SidebarComponent}
]

@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule,RouterModule.forChild(routes)],
    exports: [SidebarComponent,RouterModule]
})

export class SidebarModule {}