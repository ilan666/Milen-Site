import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatastorageService } from '../../../services/datastorage.service';
import { Product } from '../../../models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  imageLink: string;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private database: DatastorageService) {}

  ngOnInit() {
    this.productFromInit();
  }

  productFromInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      primaryImage: ['', Validators.required],
      sizes: ['', Validators.required],
      colors: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]],
      desc: ['', Validators.required],
    });
  }

  onSubmit() {
    const newProduct = new Product(
      this.productForm.value['name'],
      this.productForm.value['type'],
      this.productForm.value['category'],
      this.productForm.value['primaryImage'],
      this.productForm.value['sizes'],
      this.productForm.value['colors'],
      this.productForm.value['quantity'],
      this.productForm.value['price'],
      this.productForm.value['desc']
    );

    this.database.uploadProduct(newProduct);
  }
}
