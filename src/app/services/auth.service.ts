import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('auth');
    this._isLoggedIn$.next(!!token);
  }

  login(loginData:any){
    return this.http.post(environment.apiUrl+'admin/login',loginData).pipe(
      tap((response:any)=>{
        this._isLoggedIn$.next(true);
        localStorage.setItem('auth',response.token)
      })
    )
  }

  logout(){
    localStorage.removeItem('auth');
  }
}
