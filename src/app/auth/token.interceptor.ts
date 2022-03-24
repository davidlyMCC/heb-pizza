import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../alerts';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, public router: Router, public alertService: AlertService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('error is intercept')
        console.error(error);
        if(error.status === 401) {
          this.authService.logout();
          this.alertService.error('Unauthorized Access')
          this.router.navigateByUrl('login')
        }
        return throwError(error.message);
      }))
  }
}