import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor{

  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();

  constructor(public _auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request)
    
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          
          return this.refreshAccessToken()
          .pipe(
            switchMap(() => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            }),
            catchError((err: any) => {
              this._auth.logout();
              return empty();
            })
          )
      }
      return throwError(err);
    })
  )
}

       refreshAccessToken() {
        if (this.refreshingAccessToken) {
          return new Observable(observer => {
            this.accessTokenRefreshed.subscribe(() => {
              // this code will run when the access token has been refreshed
              observer.next();
              observer.complete();
            })
          })
       } else {
        this.refreshingAccessToken = true;
        // call a method in the auth service to send a request to refresh the access token
        return this._auth.getNewAccessToken().pipe(
          tap(() => {
            console.log("Access Token Refreshed!");
            this.refreshingAccessToken = false;
            this.accessTokenRefreshed.next();
          })
        )
       }
      }




       public addAuthHeader(request) { 
         const token = this._auth.getAccessToken()
         if (token) {
           return request.clone({
             setHeaders: {
               'Authorization': token
             }
           })
          }
          return request;
       }



    }
    

