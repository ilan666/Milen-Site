import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  products: Product[] = [];
  productsChanged = new Subject<Product[]>();

  constructor() {}

  getProducts() {
    return this.products.slice();
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }
}
