import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  filteredProducts: Product[];

  constructor(private productService: ProductService) {
    this.subscription = this.productService.list().subscribe((products: Product[]) => {
      this.filteredProducts = this.products = products;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ? (this.products.filter(p => {
      return p.title.toLowerCase().includes(query.toLowerCase());
    })) : this.products;
  }
}
