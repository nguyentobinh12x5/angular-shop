import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BASE_URL } from '../../../config';
import { Products } from '../../types';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService
      .getProducts(`${BASE_URL}/clothes`, { page: 0, perPage: 5 })
      .subscribe((products: Products) => {
        console.log(products.items);
      });
  }
}
