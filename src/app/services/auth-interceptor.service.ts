import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor{
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
          /*   console.log('this is server side error',requestError);
            errorMsg = `Error Code: ${requestError.status},  Message: ${requestError.error.message}`; */
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}