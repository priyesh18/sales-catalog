import { AppUser } from '../models/user';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
 

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): FirebaseObjectObservable<AppUser> { 
    return this.db.object('/users/' + uid);
  }
}
