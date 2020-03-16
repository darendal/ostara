import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatTableModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { MainComponent } from './main/main.component';
import { HomeBoxesComponent } from './home-boxes/home-boxes.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {ProductService} from './service/product/product.service';
import { AppRoutingModule } from './app-routing.module';
import { ShopComponent } from './shop/shop.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ShopShellComponent } from './shop-shell/shop-shell.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {ConstructionComponent} from './construction/construction.component';
import {CookieService} from 'ngx-cookie-service';
import { CartComponent } from './cart/cart.component';
import { CartTotalComponent } from './cart-total/cart-total.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeBoxesComponent,
    ProductCardComponent,
    ShopComponent,
    AboutComponent,
    ContactComponent,
    ProductComponent,
    ShopShellComponent,
    ConstructionComponent,
    CartComponent,
    CartTotalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatRippleModule,
    MatTabsModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [ProductService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
