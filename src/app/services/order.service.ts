import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as moment from "moment";
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, public router: Router) {
  }

  getOrders(){
    return this.http.get('/api/orders')
  }
  createOrder(order:IOrder){
    return this.http.post('/api/orders', order)
  }
  deleteOrder(orderID:number){
    return this.http.delete('/api/orders/' + orderID )
  }
}
