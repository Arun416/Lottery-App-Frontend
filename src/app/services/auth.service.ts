import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USER } from '../models/user';

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
  toasts: Toast[] = [];
  private userSubject!: BehaviorSubject<USER | null>;
  public user!: Observable<USER | null>;

  constructor(private http: HttpClient,private router:Router) { 
    const token = localStorage.getItem('auth');
    this._isLoggedIn$.next(!!token);

    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
}

  login(loginData:any){
    return this.http.post(environment.apiUrl+'admin/login',loginData).pipe(
      map((response:any)=>{
        this.router.navigateByUrl('/admin/dashboard');
        // const expiresInDuration = response.expiresIn;  
        this._isLoggedIn$.next(true);
        localStorage.setItem('auth',response.token);
        localStorage.setItem('currentUser',JSON.stringify(response));
        this.userSubject.next(response);
        return response;
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
    this.router.navigate(['/admin/login']);
    this.userSubject.next(null);
    window.location.reload();
   
  }

	show(toast: Toast) {
		this.toasts.push(toast);
	}

	remove(toast: Toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}

  getToken(){
    return localStorage.getItem('auth') ||'';
  }
}
