import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartService} from './service/cart/cart.service';
import {environment} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  navLinks = [
    {path: '/main', label: 'Home', isActive: true},
    {path: '/shop', label: 'Shop', isActive: false},
    {path: '/about', label: 'About', isActive: false},
    {path: '/contact', label: 'Contact', isActive: false},
  ];

  cartPath = {path: '/cart', label: 'Cart', isActive: false};

  count = 0;
  private subscription: Subscription;
  readonly underConstruction = environment.underConstruction;

  constructor(private cartService: CartService, private cookieService: CookieService) { }

  ngOnInit() {

    this.subscription = this.cartService.CartState.subscribe((state: number) => {
      this.count = state;
    });

    this.cartService.initCartCookie();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
