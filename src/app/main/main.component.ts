import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product';
import {ProductService} from '../service/product/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(3).subscribe(products => this.products = products);
  }

}
