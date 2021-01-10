import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import CartItem from '../models/CartItem';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public customerCurrentCartItems: CartItem[] | null;
  public customerCurrentCartItemsChange: Subject<CartItem[] | null> = new Subject<CartItem[] | null>();

  public currentCartCreationDate: string | null;
  public currentCartCreationDateChange: Subject<string | null> = new Subject<string | null>();

  constructor(private http: HttpClient) {
    
    // listening for changes in the last customer's current cart items, and updating accordingly
    this.customerCurrentCartItemsChange.subscribe( (value: CartItem[] | null) => {
      this.customerCurrentCartItems = value;
    });

    // listening for changes in the customer's open cart date
    this.currentCartCreationDateChange.subscribe( (value: string | null) => {
      this.currentCartCreationDate = value;
    });
  };

  public getCurrentCartItems = (): Observable<CartItem[] | null> => {
    return this.http.get<CartItem[] | null>("http://localhost:3001/cart/currentItems");
  };

  public getCustomerCurrentCartCreationDate = (): Observable<string | null> => {
    return this.http.get<string | null>("http://localhost:3001/cart/openDate");
  };
}
