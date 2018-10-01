import {Product} from './product';

export class ShoppingCartItem {
  quantity: number;
  product: Product;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalItemPrice() {
    return this.product.price * this.quantity;
  }


}
