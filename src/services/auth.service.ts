import { UserService } from './user.service';
import { AppUser } from '../models/user.model';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import firebase from 'firebase'; 

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    ) { 
    this.user$ = afAuth.authState;    
  }

  login(email: string, password: string,name: string) {
   
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(() => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: name,
        photoURL: null
      }).then(() => {
        this.user$.subscribe(user => {
          this.userService.save(user);
        } )
        
      })
    })
    
  }

  logout() { 
    this.afAuth.auth.signOut();
  }
  get appUser$() : Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });    
  }
}