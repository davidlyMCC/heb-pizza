import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from "moment";
import { User } from '../models/user.model';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:4200/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getUserToken: BehaviorSubject<any> = new BehaviorSubject<string>((localStorage.getItem('token')|| ""));

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
  }
    
  login(username:string, password:string ) {
      return this.http.post(AUTH_API, {
        username,
        password
      }).pipe(
        catchError((err) => {
          console.log('error caught in service')
          console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      ).subscribe( ((response:any) => {
        if (response && response.access_token)
          this.successfulLogin(response)
      }) );
  }

  successfulLogin(response: any) {
    localStorage.setItem('token', response.access_token)
    this.getUserToken.next(response.access_token);
    this.router.navigateByUrl('/')
  }

  logout() {
    this.getUserToken.next('');
    localStorage.removeItem('token');
  }

  getToken(){
    return localStorage.getItem('token') || ''
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || '';
    // Check whether the token is expired and return
    // true or false
    console.log(token)
    if (!token) return false;
    
    let decodedToken = this.jwtHelper.decodeToken(token)
    console.log(decodedToken)
    console.log(decodedToken.exp, moment.now() / 1000)
    // TODO : DST Check
    // Token from swagger api doesn't have a valid exp date because of DST
    // return !this.jwtHelper.isTokenExpired(token);
    let inOneHour = moment().add(1,"hour").unix()
    return decodedToken.exp >= (inOneHour / 1000)
    
    
  }
}
