import {Component, Input} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product);
  }
}
