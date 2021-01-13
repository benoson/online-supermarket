import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import CartItem from '../models/CartItem';
import CartItemForDisplay from '../models/CartItemForDisplay';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public customerCurrentCartItems: CartItemForDisplay[];
  public customerCurrentCartItemsChange: Subject<CartItemForDisplay[]> = new Subject<CartItemForDisplay[]>();

  public currentCartCreationDate: string | null;
  public currentCartCreationDateChange: Subject<string | null> = new Subject<string | null>();

  public isShowReceipt: boolean;
  public isShowReceiptChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    
    // listening for changes in the last customer's current cart items, and updating accordingly
    this.customerCurrentCartItemsChange.subscribe( (value: CartItemForDisplay[]) => {
      this.customerCurrentCartItems = value;
    });

    // listening for changes of the 'show cart' indication
    this.isShowReceiptChange.subscribe( (value: boolean) => {
      this.isShowReceipt = value;
    });

    // listening for changes in the customer's cart creation date
    this.currentCartCreationDateChange.subscribe( (value: string | null) => {
      this.currentCartCreationDate = value;
    });
  };


  public openNewCustomerCart = (): Observable<any> => {
    return this.http.post("http://localhost:3001/cart/", {});
  };

  public getCurrentCartItems = (): Observable<CartItemForDisplay[]> => {
    return this.http.get<CartItemForDisplay[]>("http://localhost:3001/cart/currentItems");
  };

  public addItemToCart = (newCartItem: CartItem): Observable<CartItem> => {
    return this.http.post<CartItem>("http://localhost:3001/cart/addItem", newCartItem);
  };

  public updateCartItem = (updatedCartItem: CartItem): Observable<CartItem> => {
    return this.http.patch<CartItem>("http://localhost:3001/cart/updateItem", updatedCartItem);
  };
  
  public removeAllCartItems = (): Observable<number> => {
    return this.http.delete<number>(`http://localhost:3001/cart/`);
  }
  
  public getCustomerCurrentCartCreationDate = (): Observable<string | null> => {
    return this.http.get<string | null>("http://localhost:3001/cart/creationDate");
  };
  
  public removeItemFromCart = (cartItemID: number): Observable<number> => {
    return this.http.delete<number>(`http://localhost:3001/cart/${cartItemID}`);
  }
}
