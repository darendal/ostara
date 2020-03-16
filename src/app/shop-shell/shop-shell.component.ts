import { Component } from '@angular/core';

/**
 * Handles routing for shop and product.
 * Let shop page have url /shop
 * and product page have url /shop/product/:id
 */
@Component({
  selector: 'app-shop-shell',
  template: '<router-outlet></router-outlet>'
})
export class ShopShellComponent {

  constructor() { }

}
