import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {ShopComponent} from './shop/shop.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProductComponent} from './product/product.component';
import {ShopShellComponent} from './shop-shell/shop-shell.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'shop', component: ShopShellComponent, children: [
      {path: '', component: ShopComponent},
      {path: 'product/:id', component: ProductComponent}]
  },
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
