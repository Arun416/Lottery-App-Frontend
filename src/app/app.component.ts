import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lottery-frontend';
  // sidebarExpanded = true;
  tokenId!:any;
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(public authService:AuthService){}

  toggleSideNav(data:SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }

  
}
