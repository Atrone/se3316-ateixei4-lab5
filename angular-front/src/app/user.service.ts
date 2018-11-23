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
    uid = this.afAuth.authState.pipe(
      map(authState => 
      {
        if(!authState){
        return null;
      }
      else
      {
        return authState.uid;
      }
      
      }),
    );
    isRegistered = this.uid.pipe(
      switchMap(uid =>{
        if(!uid)
        {
          return observableOf(false);
        }
        else
        {
          return this.db.object('/registered/'+uid).valueChanges();
        }
      })
      );
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
  login()
  {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout()
  {
    this.afAuth.auth.signOut();
  }
}
