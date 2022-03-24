import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IOrder } from 'src/app/models/order.model';

export interface DialogData {
    order: IOrder;
  }

@Component({
    selector: 'delete-order-dialog',
    templateUrl: 'delete-order.dialog.html',
  })
  export class DeleteOrderDialog {
    constructor(
      public dialogRef: MatDialogRef<DeleteOrderDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
    
    onYesClick(): void{
      this.dialogRef.close(true)
    }
  }