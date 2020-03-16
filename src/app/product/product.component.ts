import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart/cart.service';
import {Product} from '../models/product';
import {ProductService} from '../service/product/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;
  count;

  private productId: string;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private productService: ProductService) { }


  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('id');
    this.count = this.cartService.getProductCount(this.productId);

    this.productService.getProductById(this.productId).subscribe(p => this.product = p);
  }

  addToCart(): void {
    this.cartService.addProduct(this.product.id);
    this.count = this.cartService.getProductCount(this.productId);
  }

}
