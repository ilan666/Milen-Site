import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../pages/admin/admin.service';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { map, pipe, tap, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatastorageService {
  baseAPI = environment.baseAPIURL;

  product: Product;
  products: Product[] = [];
  menProducts: Product[] = [];
  womenProducts: Product[] = [];
  childrenProducts: Product[] = [];
  accessoriesProducts: Product[] = [];
  perfume: Product[] = [];

  constructor(private http: HttpClient, private adminService: AdminService) {}

  uploadProduct(product: Product) {
    this.http.post(this.baseAPI + 'product/add', product).subscribe(() => {
      console.log('Uploaded');
    });
  }

  getProducts() {
    return this.http.get<Product[]>(this.baseAPI + 'product').pipe(
      tap((res) => {
        res.forEach((product) => {
          this.products.push(product);
        });
      })
    );
  }

  getProductsByCategory(category: string) {}

  getProductByType(type: string) {}

  getSingleProduct(id: number) {}
}
