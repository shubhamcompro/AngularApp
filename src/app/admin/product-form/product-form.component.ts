import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {ProductService} from '../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.list();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(product => {
        this.product = product;
        console.log(product);
      });
    }
  }

  ngOnInit() {
  }

  save(product: Product) {
    if (this.id) {
      this.productService.update(this.id, product); // promise
    } else {
      this.productService.create(product); // promise
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product ?')) {
      return;
    }

    if (this.id) {
      this.productService.delete(this.id);
    }
    this.router.navigate(['/admin/products']);
  }
}
