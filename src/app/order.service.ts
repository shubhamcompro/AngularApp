import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Order} from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) {
  }


  list() {
    return this.db.list('/orders').valueChanges();
  }

  get(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  create(order: Order) {
    return this.db.list('/orders').push(order);
  }
}
