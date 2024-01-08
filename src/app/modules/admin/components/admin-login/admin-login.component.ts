import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminLogin!:FormGroup;
  loading: boolean=false;
  submitted:boolean = false;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router :Router,
              private toast: NgToastService,
              private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Login")
    this.adminLogin = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  get lfc() {
    return this.adminLogin.controls;
  }

  onSubmitLogin(formData:any){
    this.loading = true;
    this.submitted = true;

    if(this.adminLogin.invalid){
     this.toast.error({detail:"ERROR",summary:"Please fill out this fields",duration:5000,sticky:false,position:'topRight'});
      this.loading = false;
      return;
    }
    else {
    this.authService.login(formData).subscribe({
        next:(res:any)=>{
          this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000,sticky:false,position:'topRight'});
          this.loading = false;
        },
        error:err =>{
          this.toast.error({detail:"ERROR",summary:err,duration:5000,sticky:false,position:'topRight'});
          this.loading = false;
        }
      })
    }
  }

}
