import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Fruitiest Of Fruit Shelves';
  emailH : string;
  passwordH : string;
  constructor(public authService: AuthService) {}
  
  signup(email: string, password: string) {
    console.log(email);
    console.log(password);
    this.emailH = email;
    this.passwordH = password;
    this.authService.signup(email, password);
    email = password = '';
    console.log(this.emailH);
    console.log(this.passwordH);
  }

  login(email: string, password: string) {
    this.emailH = email;
    this.passwordH = password;
    this.authService.login(email, password);
    email = password = '';   
    console.log(this.emailH);
    console.log(this.passwordH);
  }
  
  resend(){
    this.authService.sendEmailVerification();
  }

  logout() {
    this.authService.logout();
  }
  

}