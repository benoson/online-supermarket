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
    // listening for changes in the store's prodcuts, and updating accordingly
    this.allProductsChange.subscribe((value: Product[]) => {
      this.allProducts = value;
    });
  };

  /**
   * gets all the products from of the store
   */
  public getAllProducts = (): Observable<Product[]> => {
    return this.http.get<Product[]>("http://localhost:3001/products/");
  }

  /**
   * 
   * @param newProduct - adding a product to the store
   */
  public addProduct = (newProduct: Product): Observable<Product> => {
    return this.http.post<Product>(`http://localhost:3001/products`, newProduct);
  }

  /**
   * 
   * @param formData - adding a product image to the store
   */
  public addImage = (formData: FormData): Observable<string> => {
    return this.http.post<string>(`http://localhost:3001/products/images`, formData);
  }

  /**
   * 
   * @param updatedProduct - updates a product in the store
   */
  public updateProduct = (updatedProduct: Product): Observable<Product> => {
    return this.http.patch<Product>(`http://localhost:3001/products/${updatedProduct.ID}`, updatedProduct);
  }
}
