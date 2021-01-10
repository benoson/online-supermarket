import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Product from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public allProducts: Product[];
  // creating a Subject (subscription-enabler) for this property changes
  public allProductsChange: Subject<Product[]> = new Subject<Product[]>();
  

  constructor(private http: HttpClient) {
    // listening for changes in the prodcuts, and updating accordingly
    this.allProductsChange.subscribe( (value: Product[]) => {
      this.allProducts = value;
    });
  };

  public getAllProducts = (): Observable<Product[]> => {
    return this.http.get<Product[]>("http://localhost:3001/products/");
  }
}
