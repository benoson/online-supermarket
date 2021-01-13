import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import Order from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public customerLastOrderDate: string | null;
  public customerLastOrderDateChange: Subject<string | null> = new Subject<string | null>();

  constructor(private http: HttpClient) {

    // listening for changes in the last customer order update, and updating accordingly
    this.customerLastOrderDateChange.subscribe( (value: string | null) => {
      this.customerLastOrderDate = value;
    });
  };

  public addNewOrder = (newOrder: Order): Observable<Order> => {
    return this.http.post<Order>("http://localhost:3001/orders", newOrder);
  }

  public getTotalOrdersAmount = (): Observable<number> => {
    return this.http.get<number>("http://localhost:3001/orders/totalAmount");
  };

  public getLastOrderDateByCustomer = (): Observable<string | null> => {
    return this.http.get<string | null>("http://localhost:3001/orders/lastOrderDate");
  };
}
