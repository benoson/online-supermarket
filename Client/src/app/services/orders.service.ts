import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { };

  public getTotalOrdersAmount = (): Observable<number> => {
    return this.http.get<number>("http://localhost:3001/orders/totalAmount");
  };
}
