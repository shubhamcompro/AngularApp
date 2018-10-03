import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  order$;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const orderId: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.order$ = this.orderService.get(orderId);
  }
}
