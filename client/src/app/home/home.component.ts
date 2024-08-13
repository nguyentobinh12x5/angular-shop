import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { BASE_URL } from '../../../config';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  totalRecords: number = 0;

  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = { ...product };
    this.displayEditPopup = !this.displayEditPopup;
  }

  toggleAddPopup() {
    this.displayAddPopup = !this.displayAddPopup;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    price: '',
    rating: 0,
    image: '',
  };

  onConfirmEdit(selectedProduct: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(selectedProduct, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`${BASE_URL}/clothes`, { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`${BASE_URL}/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(`${BASE_URL}/clothes/${id}`).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addProduct(product: Product) {
    this.productsService.addProduct(`${BASE_URL}/clothes`, product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
