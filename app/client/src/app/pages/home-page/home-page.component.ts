import { Component, OnInit } from '@angular/core';
import { DatastorageService } from '../../services/datastorage.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  newProducts: Product[] = [];

  constructor(private database: DatastorageService) {}

  ngOnInit() {
    this.database.getProducts().subscribe((res) => {
      res.forEach((product) => {
        if (this.newProducts.length == 4) {
          return;
        }

        this.newProducts.push(product);
      });
    });
  }
}
