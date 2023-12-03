import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { navbarData } from './nav-data';
import { AuthService } from 'src/app/services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 /* @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
 
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded); */
  @Output() onToggleSidebar: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth= 0;
  collapsed = false;
  navdata = navbarData;
  tokenTimer:any;
  
  constructor(private router:Router,private authService:AuthService) {
    var currentUser:any = JSON.parse(localStorage.getItem('currentUser')as any) 
   /*  let expiresInDuration = currentUser.expiresIn;
    
    this.tokenTimer = setTimeout(()=>{ this.logout()}, expiresInDuration*1000);  */
   }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  closeSidenav():void {
    this.collapsed = false;
    this.onToggleSidebar.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})

  }

  toggleCollapsed(){
      this.collapsed = !this.collapsed
      this.onToggleSidebar.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }

  logout(){
   this.authService.logout();
  }

}
