import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Order} from './models/order';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) {
  }


  list() {
    // return this.db.list('/orders').valueChanges();
    return this.db.list('/orders')
      .snapshotChanges()
      .pipe(map(items => {           // <== new way of chaining
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          data['key'] = key;
          return data;
        });
      }));
  }

  get(orderId: string) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  create(order: Order) {
    return this.db.list('/orders').push(order);
  }

  ordersByUser(userId: string) {
    // return this.db.list('/orders', ref => {
    //   return ref.orderByChild('userId').equalTo(userId);
    // }).valueChanges();

    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(map(items => {           // <== new way of chaining
        console.log(items);
        return items.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          data['key'] = key;
          return data;
        });
      }));
  }
}
