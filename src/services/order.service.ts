import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
@Injectable()
export class OrderService {
    constructor(private db:AngularFireDatabase) {}
    placeOrder(order) {
        return this.db.list('/orders').push(order);
    }
}