import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LOTTERY } from '../models/lottery';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  token_ID:any = localStorage.getItem('auth');

  constructor(private http:HttpClient) { }

  getAllLotteries(page:any,limit:any,column:any,sortType:any,searchTerm:any){
    const header = new HttpHeaders({ 
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })

    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("sortOrder",sortType);
    queryParams = queryParams.append("search",searchTerm);

    return this.http.get<LOTTERY[]>(environment.apiUrl+'lotteries',{params:queryParams,headers: header});
  }


  getUserLotteryResults(page:any,limit:any,sortType:any,column:any){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("sortField",column);
    queryParams = queryParams.append("sortOrder",sortType);
    return this.http.get<LOTTERY>(environment.apiUrl+'lotteries/user',{params:queryParams})
  }

  saveLottery(lotery_Data:any){
    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer "+this.token_ID
    })
    return this.http.post(environment.apiUrl+'lottery',lotery_Data,{headers: header})
  }
}
