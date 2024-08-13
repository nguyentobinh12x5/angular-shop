import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../../../config';
import { Product } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}
  productId: string | null = null;
  product: Product | null = null;

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    this.productsService
      .getProduct(`${BASE_URL}/clothes/${this.productId}`)
      .subscribe({
        next: (product: Product) => {
          this.product = product;
          console.log(product);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
