import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { NavigationEnd, Router } from '@angular/router';

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
  public showHeader: boolean = true;
  isSideNavCollapsed = false;
  screenWidth = 0;
  tokenId!:any;
  
  constructor(public authService:AuthService){}

  toggleSideNav(data:SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed
  }

}
