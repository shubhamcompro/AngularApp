import {ShoppingCartItem} from './shopping-cart-item';
import {Product} from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (const productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem({quantity: item.quantity, product: item.product}));
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (const productKey in this.items) {
      count += this.items[productKey].quantity;
    }
    return count;
  }

  get totalItemsPrice() {
    let price = 0;
    for (const productKey in this.items) {
      price += this.items[productKey].quantity * this.items[productKey].product.price;
    }
    return price;
  }

  getQuantityOfItem(product: Product) {
    for (const productKey in this.items) {
      if (this.items[productKey].product.key === product.key) {
        return this.items[productKey].quantity;
      }
    }
    return 0;
  }
}

