import { Injectable } from '@angular/core';
import {of as observableOf} from 'rxjs';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {map, switchMap} from 'rxjs/operators';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    signingIn = true;
    uid = this.afAuth.authState.pipe(
      map(authState => 
      {
        var x = document.getElementById("myDIV");
        if(!authState){
        x.style.display = "block";
        return null;
      }
      else
      {
        x.style.display = "none";
        return authState.uid;
      }
      
      }),
    );
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  login()
  {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }
  logout()
  {
    this.afAuth.auth.signOut();
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }
}
