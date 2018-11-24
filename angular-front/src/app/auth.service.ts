import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  NACError:boolean = false;
  AAError:boolean = false;
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }
  
  sendEmailVerification(){
    firebase.auth().currentUser.sendEmailVerification().then(function(){
      console.log("Check your email");
      }).catch(function(error){
        
      })
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        firebase.auth().currentUser.sendEmailVerification().then(function(){
        console.log("Check your email");
        this.NACError = false;
        }).catch(function(error){
        });
        });
        .catch(err => {
          this.AAError = false;
          this.NACError = true;
          console.log(err.message);
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.AAError = false;
        console.log('Nice, it worked!');
        console.log(firebase.auth().currentUser.emailVerified);
      })
      .catch(err => {
        this.NACError = false;
        this.AAError = true;
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.NACError = false;
    this.AAError = false;
  }

}