import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { NgToastService } from "ng-angular-popup";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

    constructor(private authSer:AuthService,private toast:NgToastService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       let authService = this.authSer;
       let authReq = req

       authReq = this.AddTokenHeader(req,authService.getToken())
        return next.handle(authReq).pipe(
            catchError(errorData=>{
                if(errorData.status===401){
                    authService.logout();
                    setTimeout(()=>{this.toast.info({detail:"INFO",summary: "Session Expired!!Please Login",duration:5000,sticky:false,position:'topRight'})
                },600)
                }
                return throwError(errorData)
            })
        )
    }


    AddTokenHeader(request: HttpRequest<any>,token:string){
        return  request.clone({headers: request.headers.set('Authorization', 'Bearer '+token)})
    }
}