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
  collapsed = true;
  navdata = navbarData;
  constructor(private router:Router,private authService:AuthService) { }

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
    this.router.navigate(['/admin/login'])
    localStorage.removeItem('lottery_No');
    localStorage.removeItem('sub_Lottery_No');
    localStorage.removeItem('sub_Lottery_No1');
    localStorage.removeItem('sub_Lottery_No2') 
    this.authService.logout();
    window.location.reload();
  }

}
