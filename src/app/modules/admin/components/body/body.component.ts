import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  @Input() collapsed = true;
  @Input() screenWidth = 0;
  isAdminRole:boolean = true;
  constructor(private router: Router,
              public authService:AuthService,
              private toast: NgToastService){}
  
  ngOnInit(): void {}

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
