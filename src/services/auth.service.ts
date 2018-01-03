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
  user$;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    ) { 
    this.user$ = afAuth.authState;    
  }

  login() {
   
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
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