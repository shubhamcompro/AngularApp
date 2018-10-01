import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';
import {take} from 'rxjs/operators';
import {ShoppingCart} from './models/shopping-cart';
import {Observable} from 'rxjs';
import {ShoppingCartItem} from './models/shopping-cart-item';

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
      .map((x: { items: { [productId: string]: ShoppingCartItem } }) => new ShoppingCart(x.items));
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = await this.create().key;
      localStorage.setItem('cartId', cartId);
    }
    return cartId;
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
        console.log('Product', product);
        item$.update({product: product, quantity: ((item ? item.quantity : 0) || 0) + change});
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
