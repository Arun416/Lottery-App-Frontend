import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminLogin!:FormGroup;
   loading: boolean=false;
  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router :Router) { }

  ngOnInit(): void {
    this.adminLogin = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmitLogin(formData:any){
    console.log(formData);
    this.loading = true;
    setTimeout(()=>{
      this.authService.login(formData).subscribe({
        next:(res:any)=>{
          alert(res.message);
          this.loading = false
          this.router.navigate(['/admin/dashboard']);
        },
        error:err =>{
          alert(err)
        }
      })
    },2000)
 
  }

}
