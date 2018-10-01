import {Injectable} from '@angular/core';
import {Product} from 'src/app/models/product';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  get(id: string) {
    return this.db.object('/products/' + id).valueChanges();
  }

  update(id: string, product: Product) {
    return this.db.object('/products/' + id).update(product);
  }

  delete(id: string) {
    this.db.object('/products/' + id).remove();
  }

  list() {
    return this.db.list('/products')
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
}
