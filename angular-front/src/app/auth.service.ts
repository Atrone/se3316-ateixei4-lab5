// BELOW CODE HAS BEEN REFERENCED FROM ALLIGATOR.IO

// imports for the auth service
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  // create vars for user, account creation error, account access error, and deactivated account error.
  user: Observable<firebase.User>;
  NACError:boolean = false;
  AAError:boolean = false
  DError:boolean = false;
  // construct an angularFireAuth instance, set the user to the auth state
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }
  
  //sends email verification
  sendEmailVerification(){
    firebase.auth().currentUser.sendEmailVerification().then(function(){
      console.log("Check your email");
      }).catch(function(error){
        
      })
  }

  // signs up user, if sucess, sends email verification, sets error booleans
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value)
        firebase.auth().currentUser.sendEmailVerification().then(function(){
        console.log("Check your email");
        this.NACError = false;
        }).catch(function(error){
        });
        }).catch(err => {
          this.AAError = false;
          this.DError = false;
          this.NACError = true;
          console.log(this.NACError);
          console.log('Something went wrong:',err.message);
      });
  }
  
  //logs in user, sets error booleans
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
        if(err.message == "The user account has been disabled by an administrator.")
        {
          console.log(err.message);
          this.DError = true;
          this.NACError = false;
          this.AAError = false;
        }
        else
        {
          this.NACError = false;
          this.DError = false;
          this.AAError = true;
        }
        console.log('Something went wrong:',err.message);
      });
  }

  // logs out user, sets error booleans
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.NACError = false;
    this.AAError = false;
  }

}