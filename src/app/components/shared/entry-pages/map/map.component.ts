import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  ObjectService: any; // Para mostrar parametros en la vista
  StaticMap: string = ''; // Mapa Estatico para hacer referencia al servicio
  constructor(public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ObjectService = this.data;
    }

  async ngOnInit() {
    this.StaticMap = await this.SetterStaticMap(this.data);
    console.log(this.StaticMap);
  }
  // Función que construye el mapa estático
  SetterStaticMap(iterator: any): Promise<string> {
    return new Promise((resolve, reject) => {
      let srcMap = `https://api.mapbox.com/styles/v1/mapbox/light-v9/static/pin-m-marker+ffff00`;
                srcMap += `(${iterator.places.origin.center[0]},${iterator.places.origin.center[1]})`;
                srcMap += `,pin-m-marker+285A98(${iterator.places.destiny.center[0]},${iterator.places.destiny.center[1]})`;
                srcMap += `/${iterator.places.origin.center[0]},${iterator.places.origin.center[1]},13,46,44/1200x400@2x`;
                srcMap += `?access_token=${environment.mapbox.token}`;
      resolve(srcMap);
    });
  }
}
