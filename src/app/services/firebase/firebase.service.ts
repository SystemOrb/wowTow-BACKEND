import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  TrackServices: any[] = null; // Arreglo de todos los servicios de firebase
  constructor(private db: AngularFireDatabase, private snackBar: MatSnackBar) {
    if (this.TrackServices && (this.TrackServices !== null)) {
      // Ya esta seteado el arreglo de servicios
      return;
    } else {
      // Al inicializar el servicio traemos de una vez los servicios
      this.GetTrackFromFirebase().subscribe(
        (services) => {
          this.TrackServices = services;
        }
      );
    }
  }

 // Trae todos los servicios de firebase ordenados por fecha
  GetTrackFromFirebase() {
      return this.db.list('services', ref => ref.orderByChild('charge/created'))
        .valueChanges().pipe(
          map((objectPost: any) => {
            return objectPost;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
        );
  }

}
