import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router'
import { Observable, catchError, throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
    token:any =  localStorage.getItem("auth")
    constructor(private router: Router){

    }
    headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.token
    });
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: req.headers.set("Token", this.token) });

        console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(authReq).pipe(catchError(err => {
            // onError
            console.log(err);
            if (err instanceof HttpErrorResponse) {
                console.log(err.status);
                console.log(err.statusText);
                if (err.status === 401) {
                    window.location.href = "admin/login";
                }
            }
            return throwError(err);
        }))
           
    }
}