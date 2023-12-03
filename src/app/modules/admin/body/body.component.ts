import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  @Input() collapsed = true;
  @Input() screenWidth = 0;
  
  constructor(public authService:AuthService){}

  ngOnInit(): void {
    console.log("worked",this.authService.getIsTokenExpiredError());
    setTimeout(()=>{
      if (this.authService.getIsTokenExpiredError()) {
        alert('Your session has expired. Please log in again.');
        this.authService.logout();
        this.authService.setTokenExpiredError(false); // Reset flag
        // Optionally, you may want to redirect the user to the login page here
      }
    },100)
   
  }

  getBodyClass(): string {
    
  
    let styleClass = '';

    if(this.collapsed && this.screenWidth >768){
      styleClass = 'body-trimmed';
    }
    else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth >0){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
