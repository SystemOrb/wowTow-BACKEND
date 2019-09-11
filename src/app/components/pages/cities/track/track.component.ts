import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase/firebase.service';
import { MatDialog } from '@angular/material';
import { MapComponent } from '../../../shared/entry-pages/map/map.component';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  HistoryServices: any[] = [];
  constructor(private fb: FirebaseService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.HistoryServices = await this.GetServices();
    console.log(this.HistoryServices);
  }
  GetServices(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.fb.GetTrackFromFirebase().subscribe(
        (data) => {
          resolve(data);
        }
      );
    });
  }
  OpenReference(currentService: any): void {
     const referenceModal = this.dialog.open(MapComponent, {
       data: currentService
     });
  }
}
