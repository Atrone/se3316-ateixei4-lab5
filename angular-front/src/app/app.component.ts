import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo1';
  
  constructor(public authService: AuthService) {}
  
  signup(email: string, password: string) {
    console.log(email)
    console.log(password);
    this.authService.signup(email, password);
    email = password = '';
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
    email = password = '';    
  }
  
  resend(){
    this.authService.sendEmailVerification();
  }

  logout() {
    this.authService.logout();
  }

}