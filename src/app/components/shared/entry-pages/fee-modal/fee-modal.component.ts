import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ExcelService } from 'src/app/services/system/excel.service';
import { SystemFeeClass } from '../../../../classes/system/fees.class';
import { NgForm } from '@angular/forms';
import { DutyVehicleTypeClass } from '../../../../classes/system/vehicles.class';
import { ListExtraMileCityClass } from '../../../../classes/system/extraMiles.city.class';

@Component({
  selector: 'app-fee-modal',
  templateUrl: './fee-modal.component.html',
  styleUrls: ['./fee-modal.component.css']
})
export class FeeModalComponent implements OnInit {
  ObjectCity: SystemFeeClass | any = '';
  CanEdit: boolean = false;
  loading: boolean = false;
  LoadList: boolean = false;
  _idCity: string = '';
  ArrayVehicles: DutyVehicleTypeClass[] | any = ''; // Arreglo de vehiculos registrados en el sistema
  ArrayListAdded: any[] = []; // Se ira guardando las millas extras por vehiculo en una ciudad especifica
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['vehicle_type', 'service_type', 'Rate', 'extra_mile', 'action'];

  constructor(public dialogRef: MatDialogRef<FeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private excelV5: ExcelService,
    private snackBar: MatSnackBar) {
      if (this.data && this.data !== '') {
        this.ObjectCity = this.data;
        this.CanEdit = true;
        this.LoadList = true;
        this._idCity = this.ObjectCity._id;
        console.log(this.ObjectCity);
      }
    }

  async ngOnInit() {
    // Carga los vehiculos que estan registrados
    const vehicles = await this.LoadVehiclesOnSystem();
    if (vehicles !== null) {
      this.ArrayVehicles = vehicles;
    }
    setTimeout( async () => {
      // Cargar la lista actual
      if (await this.GetCurrentList() !== null) {
        this.ArrayListAdded = await this.GetCurrentList(); // El arreglo del componente, no se muestra en el front sino para refresh
        console.log(this.ArrayListAdded);
        this.dataSource.data = await this.GetCurrentList(); // La tabla que se muestra en el front
      }
    }, 2000);
  }

  SendForm(valueCity: NgForm) {
    if (valueCity.invalid) {
      throw new Error('Invalid');
    }
    this.loading = true;
    const CityFee = new SystemFeeClass(Number(valueCity.value.dispatch_service), valueCity.value.max_miles,
      valueCity.value.wootow_fee, valueCity.value.charge_nigth, valueCity.value.city, this._idCity || '');
      if (this.CanEdit) { // Actualizar los parametros de una ciudad
        this.excelV5.UpdateObjectToSystem('admin/system/prices', CityFee, this._idCity)
          .subscribe((update) => {
            if (update.status) {
              this.ObjectCity = update.Update;
              this.loading = false;
              this.snackBar.open('City config updated', null, {duration: 4000});
              return;
            }
          });
      } else {
        // Si se crea desde 0, es necesario hacer mas pasos, ya que necesitamos poder cargar lista de vehiculos
        this.excelV5.CreateObjectToSystem('admin/system/prices', CityFee)
          .subscribe((data) => {
            if (data.status) {
              this.ObjectCity = data.carType;
              this._idCity = data.carType._id; // Cargamos el ID que nos devolvio el server
              this.CanEdit = true; // Puede editar
              this.loading = false; // Se cierra el laoder
              this.LoadList = true; // Ahora puede cargar listas para añadir extra miles por vehiculo
              this.snackBar.open('City config added', null, {duration: 4000});
              return;
            }
          });
      }
  }
 /*
 Carga la información de los vehiculos
 */
 LoadVehiclesOnSystem(): Promise<DutyVehicleTypeClass[]> {
   return new Promise((resolve, reject) => {
     this.excelV5.getObjectFromSystem('admin/cars/prices')
      .subscribe((vehicles) => {
        if (vehicles.status) {
          resolve(vehicles.Cars);
        } else {
          resolve(null);
        }
      });
   });
 }
 AddToListForm(valueList: NgForm): void {
   if (valueList.invalid) {
     return;
   }
   this.loading = true;
   const ListItem = new ListExtraMileCityClass(valueList.value.car_type, Number(valueList.value.extra_miles), this._idCity);
   this.excelV5.CreateObjectToSystem(`admin/system/prices/miles/${this._idCity}/${valueList.value.car_type}`, ListItem)
    .subscribe((list) => {
      if (list.status) {
        // Para hacer el refresh a tiempo real debemos saber que valor colocó el usuario
        for (const iterator of this.ArrayVehicles) {
          if (iterator._id === list.cityMileTax.car_type) {
            this.ArrayListAdded.push({
              car_type: iterator,
              city: this._idCity,
              extra_miles: Number(valueList.value.extra_miles),
              _id: list.cityMileTax._id,
              __v: list.cityMileTax.__v
            });
          }
           this.dataSource.data = this.ArrayListAdded;
        }
        this.snackBar.open('Extra miles fee added to a list of this city', null, {duration: 4000});
        this.loading = false;
      }
    });
 }
 // Para obtener la tarifa actual de cada vehiculo en esa ciudad que ya ha sido cargada
 GetCurrentList(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.excelV5.getObjectFromSystem(`admin/system/prices/miles/${this._idCity}`)
        .subscribe((ArrayList) => {
          if (ArrayList.status) {
            resolve(ArrayList.list);
          } else {
            resolve(null);
          }
        });
    });
 }
 // Eliminar
 DeleteFee(object: any, index: number): void {
   this.excelV5.DeleteObjectToSystem(`admin/system/prices/miles`, null, object._id)
    .subscribe((data) => {
      if (data.status) {
        this.ArrayListAdded.splice(index, 1);
        this.dataSource.data = this.ArrayListAdded;
        this.snackBar.open('Item remove for this list', null, {duration: 4000});
        return;
      }
    });
 }
}
