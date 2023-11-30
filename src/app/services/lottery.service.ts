import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOTTERY } from '../models/lottery';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  token_ID:any = localStorage.getItem('auth');

  constructor(private http:HttpClient) { }

  getAllLotteries():Observable<LOTTERY>{
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.get<LOTTERY>(environment.apiUrl+'lotteries',{headers: header});
  }

  saveLottery(lotery_Data:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
      return this.http.post(environment.apiUrl+'lottery',lotery_Data,{headers: header})
  }
}
