import {CartData} from './cartData';
import {CollectionViewer, DataSource} from '@angular/cdk/typings/collections';
import {BehaviorSubject, Observable, forkJoin} from 'rxjs';
import {CartService} from '../service/cart/cart.service';
import {ProductService} from '../service/product/product.service';
import {finalize, map} from 'rxjs/operators';
import {Product} from './product';

export class CartDataSource implements DataSource<CartData> {

  private dataSubject = new BehaviorSubject<CartData[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private cartService: CartService, private productService: ProductService) {}

  connect(collectionViewer: CollectionViewer): Observable<CartData[] | ReadonlyArray<CartData>> {

    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadCartData() {

    this.loadingSubject.next(true);

    const cartMap: Map<string, number> = this.cartService.getCartContent();

    forkJoin(
      Array.from(cartMap, ([key, value]) => {
          return this.productService.getProductById(key).pipe(
            map((prod: Product) => new CartData(prod, value)));
        })
    ).pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(data => this.dataSubject.next(data));

  }


}
