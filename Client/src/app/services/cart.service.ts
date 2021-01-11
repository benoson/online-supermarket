import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import CartItem from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public customerCurrentCartItems: CartItem[];
  public customerCurrentCartItemsChange: Subject<CartItem[]> = new Subject<CartItem[]>();

  public currentCartCreationDate: string | null;
  public currentCartCreationDateChange: Subject<string | null> = new Subject<string | null>();

  constructor(private http: HttpClient) {
    
    // listening for changes in the last customer's current cart items, and updating accordingly
    this.customerCurrentCartItemsChange.subscribe( (value: CartItem[]) => {
      this.customerCurrentCartItems = value;
    });

    // listening for changes in the customer's cart creation date
    this.currentCartCreationDateChange.subscribe( (value: string | null) => {
      this.currentCartCreationDate = value;
    });
  };

  public getCurrentCartItems = (): Observable<CartItem[]> => {
    return this.http.get<CartItem[]>("http://localhost:3001/cart/currentItems");
  };

  public addItemToCart = (newCartItem: CartItem): Observable<CartItem> => {
    return this.http.post<CartItem>("http://localhost:3001/cart/addItem", newCartItem);
  };

  public updateCartItem = (updatedCartItem: CartItem): Observable<CartItem> => {
    return this.http.patch<CartItem>("http://localhost:3001/cart/updateItem", updatedCartItem);
  };

  public getCustomerCurrentCartCreationDate = (): Observable<string | null> => {
    return this.http.get<string | null>("http://localhost:3001/cart/creationDate");
  };
}
