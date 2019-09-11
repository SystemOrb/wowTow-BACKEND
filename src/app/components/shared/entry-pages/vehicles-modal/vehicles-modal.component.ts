import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DutyVehicleTypeClass } from 'src/app/classes/system/vehicles.class';
import { NgForm } from '@angular/forms';
import { ExcelService } from '../../../../services/system/excel.service';

@Component({
  selector: 'app-vehicles-modal',
  templateUrl: './vehicles-modal.component.html',
  styleUrls: ['./vehicles-modal.component.css']
})
export class VehiclesModalComponent implements OnInit {
  ObjectVehicle: DutyVehicleTypeClass | any = '';
  CanEdit: boolean = false;
  loading: boolean = false;
  constructor(public dialogRef: MatDialogRef<VehiclesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private excelV5: ExcelService) {
      if (this.data && this.data !== '') {
        this.ObjectVehicle = this.data;
        this.CanEdit = true;
        console.log(this.ObjectVehicle);
      }
    }

  ngOnInit() {
  }

  SendForm(value: NgForm): void {
    if (value.invalid) {
      return;
    }
    this.loading = true;
    const Vehicle = new DutyVehicleTypeClass(value.value.car_type, value.value.car_truck,
    value.value.truck_price, this.ObjectVehicle._id || '');
    if (this.CanEdit) { // Verificamos si esta editando o creando
      this.excelV5.UpdateObjectToSystem('admin/cars/prices', Vehicle, this.ObjectVehicle._id)
        .subscribe((update) => {
          if (update.status) {
            this.loading = false;
            this.dialogRef.close({
              role: 'update',
              car: update.Update
            });
          } else {
            alert('Cannot update this object, Try again later');
            return;
          }
        });
    } else {
      // Creamos
      this.excelV5.CreateObjectToSystem('admin/cars/prices', Vehicle)
        .subscribe((create) => {
          if (create.status) {
            this.loading = false;
            this.dialogRef.close({
              role: 'create',
              car: create.carType
            });
          } else {
            alert('Cannot update this object, Try again later');
            return;
          }
        });
    }
  }

}
