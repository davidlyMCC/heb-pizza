import { Component, OnInit } from '@angular/core';
import { IOrder } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderDialog } from './dialog/delete-order.dialog';
import { CreateOrderDialog } from './dialog/create-order.dialog';
import { AlertService } from '../alerts/alert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lastReponse : IOrder[];
  displayedColumns: string[] = ['orderId', 'tableNo', 'crust', 'flavor', 'size', 'timestamp', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(public orderService: OrderService, public dialog: MatDialog, public alertService: AlertService) { 
    this.lastReponse = [];
  }


  ngOnInit(): void {
    this.refreshList()
  }

  refreshList(){
    this.orderService.getOrders().subscribe( (response) => {
        this.updateList(response as IOrder[])
    })
  }

  updateList(response:IOrder[]){
    console.log("updating pizzas", response)
    this.lastReponse = response
    this.dataSource.data = response;
  }

  clickedOrder(order:IOrder){
    console.log(order)
  }

  applyFilter(event:any){
    this.dataSource.filter = event.target.value;
  }

  createDialog(){
    const dialogRef = this.dialog.open(CreateOrderDialog, {
      width: '500px',
      data: {order: null},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
      console.log("creating order", result)
      if(result)
      this.orderService.createOrder(result).subscribe( (response:any) => {
        this.refreshList();
        this.alertService.success('Order ' + response.Order_ID +' created');
      })
    });
  }

  deleteDialog(order:any): void {
    const dialogRef = this.dialog.open(DeleteOrderDialog, {
      width: '250px',
      data: {order: order},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
      console.log("deleting order", order, result)
      if(result)
      this.orderService.deleteOrder(order.Order_ID).subscribe( (response) => {
        this.updateList(this.lastReponse.filter(o => o.Order_ID != order.Order_ID))
        this.alertService.success('Order ' + order.Order_ID +' deleted');
      })
    });
  }

}