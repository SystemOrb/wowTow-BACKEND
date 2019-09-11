import { Component } from '@angular/core';
import 'hammerjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // En el componente principal inyectamos el servicio de firebase, para que sea un servicio universal
  // y de esa forma solo se hace una unica petición
  constructor() {
  }

}
