import { Injectable } from '@angular/core';
import UserInterface from '../interfaces/user.interface';
import { WebRequestService } from './web-request.service';
import { catchError, shareReplay, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public registeredUser: UserInterface = {}
  public currentUser: UserInterface = {}
  public loggedIn: boolean;
  public userInfoMenu = false;
  public showForm = false;

  constructor(private _rq: WebRequestService, public _rt:Router,  private _http: HttpClient) {}


  // check that user and password doesn't exist
  public initialRegister(body) {
    return this._rq.post('auth/validate-register', body)
  }

  // register user
  public secondaryRegister(body) {
    return this._rq.post('auth/register', body).pipe(
      tap((res: any) => {
        this.setSession(res.accessToken, res.refreshToken, res.newUser._id)
      })
    )
  }

  // login
    public login(body) {   
    return this._rq.login(body).pipe(
      shareReplay(),
      tap((res: any) => {
        this.setSession(res.accessToken, res.refreshToken, res.user._id)
      })
     )
    }

    // logout
    public logout() {
      this.removeSession()
      this.registeredUser = {}
      this._rt.navigateByUrl("sign-in")
    }

    // local storage functions
    private setSession(accessToken: string, refreshToken: string, userId: string) {
      localStorage.setItem('AT', accessToken);
      localStorage.setItem('RT', refreshToken);
      localStorage.setItem('User', userId);
    }
    // remove session from local storage 
    private removeSession() {
      localStorage.removeItem('AT');
      localStorage.removeItem('RT');
      localStorage.removeItem('User');
    }

    // get accessToken from local storage
    public getAccessToken() {
      return localStorage.getItem('AT');
    }

    // get refreshToken from local storage
    public getRefreshToken() {
      return localStorage.getItem('RT');
    }
    
    // set accessToken in local storage 
    public setAccessToken(token) {
      return localStorage.setItem('AT', token );
    }

    // get userId from local storage
    public getUserId() {
      return localStorage.getItem('User');
    }

    // get user
    public getUser() {
      return this._rq.get('user')
    }

    // new access token /refresh 
    public getNewAccessToken() {
      return this._http.get(`${this._rq.ROOT_URL}/auth/refresh`, {
        headers: {
          'refreshtoken': this.getRefreshToken(),
          '_id': this.getUserId()
        },
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.body['access-token']);
        }, (err: any) => {
          console.log(err)
        })
      )
    }
  }