import {ShoppingCartItem} from './shopping-cart-item';
import {Shipping} from './order-shipping';

export class Order {
  items: ShoppingCartItem[];
  shipping: Shipping;
  total?: number;
  dateCreated: string;
  userId: string;

  constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
