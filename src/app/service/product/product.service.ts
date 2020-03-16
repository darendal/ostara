import { Injectable } from '@angular/core';
import {Product} from '../../models/product';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly path = environment.products_path;

  constructor(private readonly firebase: AngularFirestore) { }

  getProducts(count: number = 3): Observable<Product[]> {

    return this.firebase.collection<Product>(this.path, ref => ref.where('stock', '>', 0).limit(count)).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getAllProducts(): Observable<Product[]> {
    return this.firebase.collection<Product>(this.path, ref => ref.where('stock', '>', 0)).snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getProductById(id: string): Observable<Product> {

    return this.firebase.doc<Product>(this.path + '/' + id).get()
      .pipe(
        map(a => {
          const data = a.data() as Product;
          return { id, ...data };
        })
      );

  }
}
