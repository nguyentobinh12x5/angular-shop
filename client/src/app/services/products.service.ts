import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationParams, Product, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  // Getting products from the API
  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  // Getting a single product from the API
  getProduct = (url: string): Observable<Product> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  // Creating a new product
  addProduct = (url: string, product: Product): Observable<Product> => {
    return this.apiService.post(url, product, {
      responseType: 'json',
    });
  };

  // Updating a product
  editProduct = (url: string, product: Product): Observable<Product> => {
    return this.apiService.put(url, product, {
      responseType: 'json',
    });
  };

  // Deleting a product
  deleteProduct = (url: string): Observable<Product> => {
    return this.apiService.delete(url, {
      responseType: 'json',
    });
  };
}
