import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#0d6efd';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#1976d2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit,OnDestroy{
  @Input() collapsed = true;
  @Input() screenWidth = 0;
  customLoadingTemplate!: TemplateRef<any>;
  emptyLoadingTemplate!: TemplateRef<any>;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.threeBounce,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px',
    fullScreenBackdrop: true
  };
  private loadingSubscription!: Subscription;
  
  constructor(private router: Router,
              public authService:AuthService,
              private loadingService: LoadingService){}
  
  ngOnInit(): void { 
    this.loadingSubscription = this.loadingService.loading.subscribe((loading) => {
      this.loading = loading;
    });
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

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.loadingSubscription.unsubscribe();
  }
}
