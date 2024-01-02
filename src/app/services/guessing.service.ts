import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuessingService {
  token_ID:any = localStorage.getItem('auth');
  private loadComponentSubject = new Subject<void>();

  constructor(private http:HttpClient) { }


  getGuessingNumber(page:any,limit:any,sortType:any,column:any,searchInput:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortOrder",sortType);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("search",searchInput);

    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get(environment.apiUrl+'guessingDigit',{headers: header,params:queryParams});
  }


  getUserGuessingNumber(page:any,limit:any,sortType:any,column:any,searchInput:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortOrder",sortType);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("search",searchInput);

    return this.http.get(environment.apiUrl+'guessingDigit/user',{params:queryParams});
  }

  
  saveGuessingNumber(formValue:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.post(environment.apiUrl+'guessingDigit',formValue,{headers: header});
  }

  getLoadData() {
    this.loadComponentSubject.next();
  }

  triggeringData() {
    return this.loadComponentSubject.asObservable();
  }
}
