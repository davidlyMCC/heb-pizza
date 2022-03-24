import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IOrder } from 'src/app/models/order.model';

export interface DialogData {
    order: IOrder;
  }

@Component({
    selector: 'create-order-dialog',
    styleUrls: ['create-order.dialog.scss'],
    templateUrl: 'create-order.dialog.html',
  })
  export class CreateOrderDialog {

    pizzaForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<CreateOrderDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private formBuilder: FormBuilder,
    ) {

      this.pizzaForm = this.formBuilder.group({
        Table_No: ['', [Validators.required]],
        Crust: ['', [Validators.required]],
        Flavor: ['', [Validators.required]],
        Size: ['', [Validators.required]],
      })
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    submitForm(): void{
      if (this.pizzaForm.valid){
        this.dialogRef.close(this.pizzaForm.value)
      } else {
        this.pizzaForm.markAllAsTouched()
      }
    }
  }