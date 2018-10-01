import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  list() {
    // return this.db.list('/categories/').valueChanges();
    return this.db.list(`/categories`)
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
