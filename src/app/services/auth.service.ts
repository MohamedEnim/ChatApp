import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app'
import { User } from 'src/app/models/user.model'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Observable<firebase.User>
  private authState: any;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) { 
    this.user = afAuth.authState; 
  }

  get currentUserId(){
    return this.authState !== null ? this.authState.user.uid : '';
  }

  signUp(email: string, password: string, displayName: string){
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user =>{
        this.authState = user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      });
  }

  setUserData(email: string, displayName: string, status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    }
    this.db.object(path).update(data);
  }


  login(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(user =>{
              this.authState = user;
              const status = 'online';
              this.setUserStatus(status);
            });
  }

  setUserStatus(status: string) {
    const path =  `users/${this.currentUserId}`;
    const data = {
      status: status
    }
   return this.db.object(path).update(data);
  }

  authUser(){
    return this.user;
  }
  
  logout(){
    const path=  `users/${this.currentUserId}`;
    const status = 'offline';
    this.setUserStatus(status);
    this.afAuth.auth.signOut().then(resolve =>{
      this.router.navigate(['/login']);
    });
  }

  isAuthenticate(): Observable<boolean>{
    return this.authUser()
    .pipe( map(user => {
      if(user){
        return true;
      }else{
        this.router.navigate(['/login']);
        return false;
      }
  }));
}

}
