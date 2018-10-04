import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Order} from '../models/order';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  userOrders: Order[];

  constructor(private orderService: OrderService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$
      .switchMap(user => this.orderService.ordersByUser(user.uid))
      .map(order => {
        this.userOrders.push(new Order(...order));
      });
  }
}
