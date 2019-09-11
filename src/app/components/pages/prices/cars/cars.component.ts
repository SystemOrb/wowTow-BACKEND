import { Component, OnInit } from '@angular/core';
import { DutyVehicleTypeClass } from 'src/app/classes/system/vehicles.class';
import { ExcelService } from '../../../../services/system/excel.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { VehiclesModalComponent } from '../../../shared/entry-pages/vehicles-modal/vehicles-modal.component';
declare const swal: any;

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  CarsSystemArray: DutyVehicleTypeClass[] = [];
  constructor(private excelV5: ExcelService, public dialog: MatDialog,
              private snackbar: MatSnackBar) { }

  async ngOnInit() {
    const Cars = await this.GetSystemCars();
    if (Cars.length >= 1 && Cars !== null) {
      this.CarsSystemArray = Cars;
      console.log(this.CarsSystemArray);
    }
  }

  GetSystemCars(): Promise<DutyVehicleTypeClass[]> {
    return new Promise((resolve, reject) => {
      this.excelV5.getObjectFromSystem('admin/cars/prices/')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.Cars);
          } else {
            resolve(null);
          }
        });
    });
  }

  OpenPageVehicles(dataVehicle?: DutyVehicleTypeClass): void {
    const dialog = this.dialog.open(VehiclesModalComponent, {
      data: dataVehicle || ''
    });
    // Verificamos cuando cierra
    dialog.afterClosed().subscribe(
      (data) => {
        if (data.role === 'create') {
          this.CarsSystemArray.push(data.car);
        }
      }
    );
  }
  DeleteItem(ItemCar: DutyVehicleTypeClass, i: number) {
    console.log(i);
    swal({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      buttons: true,
      dangerMode: false,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.excelV5.DeleteObjectToSystem('admin/cars/prices', null, ItemCar._id)
          .subscribe((data) => {
            if (data.status) {
              this.CarsSystemArray.splice(i);
              this.snackbar.open('Item removed successfully', null, {duration: 3000});
              return;
            }
          });
      }
    });
  }
}
