import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';
import {take} from 'rxjs/operators';
import {ShoppingCart} from './models/shopping-cart';
import {Observable} from 'rxjs';
import {ShoppingCartItem} from './models/shopping-cart-item';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {


  constructor(private db: AngularFireDatabase) {
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map((x: { items: { [productId: string]: ShoppingCartItem } }) => {
        return new ShoppingCart(x.items);
      });
  }

  private isCartExist(cartId) {
    return new Promise((resolve, reject) => {
     this.db.object('/shopping-carts/' + cartId).valueChanges().first().toPromise()
        .then(cart => {
          if (cart) {
            resolve(true);
          } else {
            reject(new Error('Cart id expired'));
          }
        });
    });
  }


  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      try {
        const isCartExitst = await this.isCartExist(cartId);
        return cartId;
      } catch (err) {
        cartId = await this.create().key;
        localStorage.setItem('cartId', cartId);
        return cartId;
      }
    } else {
      cartId = await this.create().key;
      localStorage.setItem('cartId', cartId);
      return cartId;
    }
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object <any>('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private removeCartItem(cartId: string, productId: string) {
    return this.db.object <any>('/shopping-carts/' + cartId + '/items/' + productId).remove();
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      const finalQuantity = ((item ? item.quantity : 0) || 0) + change;
      if (finalQuantity === 0) {
        this.removeCartItem(cartId, product.key);
      } else {
        item$.update({product: product, quantity: finalQuantity});
      }
    });
  }

  async addToCart(product: Product) {
    await this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    await this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
}
