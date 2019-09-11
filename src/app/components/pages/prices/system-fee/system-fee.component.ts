import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/system/excel.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SystemFeeClass } from '../../../../classes/system/fees.class';
import { FeeModalComponent } from '../../../shared/entry-pages/fee-modal/fee-modal.component';

@Component({
  selector: 'app-system-fee',
  templateUrl: './system-fee.component.html',
  styleUrls: ['./system-fee.component.css']
})
export class SystemFeeComponent implements OnInit {
  CitiesArray: SystemFeeClass[] = [];
  CanEdit: boolean = false;
  loading: boolean = false;

  constructor(private excelV5: ExcelService, public dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  async ngOnInit() {
    const Cities = await this.GetCities();
    if (Cities.length >= 1 && Cities !== null) {
      this.CitiesArray = Cities;
      console.log(this.CitiesArray);
    }
  }

  GetCities(): Promise<SystemFeeClass[]> {
    return new Promise((resolve, reject) => {
      this.excelV5.getObjectFromSystem('admin/system/prices/')
        .subscribe((data) => {
          if (data.status) {
            resolve(data.Cars);
          } else {
            resolve(null);
          }
        });
    });
  }

  OpenPageCities(dataCity?: SystemFeeClass): void {
    const dialog = this.dialog.open(FeeModalComponent, {
      data: dataCity || ''
    });
    // Verificamos cuando cierra
    dialog.afterClosed().subscribe(
      (data) => {
        if (data.role === 'create') {
          this.CitiesArray.push(data.car);
        }
      }
    );
  }
}
