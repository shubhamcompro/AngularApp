import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../models/product';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Product[];
  filteredProducts$: Product[];
  category: string;
  cart: any;
  subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) {
    this.productService
      .list()
      .switchMap((products: Product[]) => {
        this.products$ = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts$ = (this.category) ? this.products$.filter(product => product.category === this.category) : this.products$;
      });
  }

  async ngOnInit() {
    const cart$ = (await this.shoppingCartService.getCart());
    this.subscription = cart$.subscribe(cart => {
      this.cart = cart;
    });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
