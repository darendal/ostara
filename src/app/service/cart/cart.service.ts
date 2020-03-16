import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {ProductService} from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private cookieService: CookieService, private productService: ProductService) {
  }

  private cartCount = new Subject<number>();
  private itemsCount = 0;
  private countMap = new Map<string, number>();
  CartState = this.cartCount.asObservable();

  addProduct(productId: string) {

    this.itemsCount += 1;
    this.cartCount.next(this.itemsCount);

    if (this.countMap.has(productId)) {
      this.countMap.set(productId, this.countMap.get(productId) + 1);
    } else {
      this.countMap.set(productId, 1);
    }

    this.setCookie(this.getEncodedCart());
  }

  removeProduct(productId: string) {
    this.itemsCount -= 1;
    this.cartCount.next(this.itemsCount);
  }

  getProductCount(id: string): number {
    const count = this.countMap.get(id);
    return count ? count : 0;
  }

  getCartContent(): Map<string, number> {

    return this.countMap;
  }

  initCartCookie(): void {
    if (this.cookieExists()) {
      this.decodeCartString(this.cookieService.get(environment.cookieName));
    } else {
      this.setCookie('');
    }
  }

  private cookieExists(): boolean {
    return this.cookieService.check(environment.cookieName);
  }

  private setCookie(value: string) {
    this.cookieService.set(environment.cookieName, value, environment.cookieLifetime, '/');
  }

  private getEncodedCart(): string {

    let ret = '';
    this.countMap.forEach((value, key) => {
      ret += `${key}: ${value};`;
    });

    return btoa(ret);
  }

  private decodeCartString(value: string): void {

    if (value === '') {
      return;
    }

    const tokens = atob(value).split(';');

    tokens.forEach(token => {
      if (token === '') {
        return;
      }
      const split = token.split(':');
      this.countMap.set(split[0], Number(split[1]));
    });

    let count = 0;
    this.countMap.forEach((mapValue) => {
      count += Number(mapValue);
    });

    this.itemsCount = count;
    this.cartCount.next(this.itemsCount);

  }
}
