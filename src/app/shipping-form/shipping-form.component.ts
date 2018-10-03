import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {AuthService} from '../auth.service';
import {OrderService} from '../order.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Order} from '../models/order';
import {Shipping} from '../models/order-shipping';
import {ShoppingCartService} from '../shopping-cart.service';


@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(shipping: Shipping) {
    const order = new Order({
      shipping: shipping,
      items: this.cart.items,
      dateCreated: new Date().getTime().toString(),
      userId: this.userId,
      total: this.cart.totalItemsPrice
    });
    const result = await this.orderService.create(order);
    (await this.shoppingCartService.clearCart());
    this.router.navigate(['/order-success', result.key]);
  }
}
