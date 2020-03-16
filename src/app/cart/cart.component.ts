import { Component, OnInit } from '@angular/core';
import {CartService} from '../service/cart/cart.service';
import {CartDataSource} from '../models/cartDataSource';
import {ProductService} from '../service/product/product.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  dataSource: CartDataSource;
  displayedColumns: string[] = ['name', 'quantity', 'price'];

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {

    this.dataSource = new CartDataSource(this.cartService, this.productService);
    this.dataSource.loadCartData();
  }

  getTotalCost(): Observable<number> {
    return this.dataSource.connect(null).pipe(
      map( p => p.map(v => v.product.price * v.quantity).reduce((acc, value) => acc + value, 0)));
  }

  getTotalCount(): Observable<number> {
    return this.dataSource.connect(null).pipe(
      map( p => p.map(v => v.quantity).reduce((acc, value) => acc + value, 0)));
  }

}
