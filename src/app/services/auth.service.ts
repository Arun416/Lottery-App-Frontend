import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Toast {
	template: TemplateRef<any>;
	classname?: string;
	delay?: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  public isTokenExpired:boolean = false;

  constructor(private http: HttpClient,private router:Router) { 
    const token = localStorage.getItem('auth');
    this._isLoggedIn$.next(!!token);
  }

  login(loginData:any){
    return this.http.post(environment.apiUrl+'admin/login',loginData).pipe(
      tap((response:any)=>{
        this.router.navigate(['/admin/dashboard']);
        // const expiresInDuration = response.expiresIn;  
        this._isLoggedIn$.next(true);
        localStorage.setItem('auth',response.token);

      })
    )
  }


  setTokenExpiredError(value: boolean): void {
    this.isTokenExpired = value;
  }

  getIsTokenExpiredError(): boolean {
    return this.isTokenExpired;
  }

  logout(){
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser')
    localStorage.removeItem('lottery_No');
    localStorage.removeItem('sub_Lottery_No');
    localStorage.removeItem('sub_Lottery_No1');
    localStorage.removeItem('sub_Lottery_No2') 
    this.router.navigate(['/admin/login'])
    window.location.reload();
  }

  toasts: Toast[] = [];

	show(toast: Toast) {
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
