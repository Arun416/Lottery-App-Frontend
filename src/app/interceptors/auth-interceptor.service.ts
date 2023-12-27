import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { EventEmitter, Injectable } from "@angular/core";
import { NgToastService } from "ng-angular-popup";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(public authService:AuthService,private toast:NgToastService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
      .pipe(
        catchError((requestError: HttpErrorResponse) => {
          let errorMsg = '';
          if (requestError.error instanceof ErrorEvent) {
            console.log('this is client side error',req);
            errorMsg = `Error: ${requestError.error.message}`;
          }
          else {
            if (requestError.status === 401) {
              errorMsg = requestError.error.message
            }
            else if (requestError.status === 400) {
                errorMsg = requestError.error.message
            }
       
          }
          return throwError(errorMsg);
        })
      )
  }

}