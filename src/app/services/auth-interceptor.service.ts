import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { EventEmitter, Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(public authService:AuthService){}
    
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
              this.isTokenExpiredError(requestError)
              errorMsg = requestError.error.message
            }
            else if (requestError.status === 400) {
                errorMsg = requestError.error.message
            }
          /*   console.log('this is server side error',requestError);
            errorMsg = `Error Code: ${requestError.status},  Message: ${requestError.error.message}`; */
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }


   private isTokenExpiredError(error: any): boolean {
    console.log(error,"ok");
    
    if (error.error && error.error.message == 'Token expired. Please log in again.') {
      this.authService.setTokenExpiredError(true);
      return true;
    }
    return false;
  } 
}