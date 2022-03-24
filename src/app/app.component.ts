import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'heb-pizza';
  
  constructor(public authService: AuthService, private router: Router) { 
    authService.getUserToken.subscribe(user => this.handleLogin(user));
  }

  public isAuthenticated = false;

  public handleLogin(user:any){
      if (user.length) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }
}
