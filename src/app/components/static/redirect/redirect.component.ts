import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styles: []
})
export class RedirectComponent implements OnInit {
// Archivo que se encarga de hacer redirecciones de componentes
  constructor(private _to: ActivatedRoute, private _router: Router) {
    setTimeout(() => {
      this._to.params.subscribe((route: Params): void => {
        this._router.navigate([`/admin/${route['toUrl']}/${route['id']}`]);
      });
    }, 200);
  }

  ngOnInit() {
  }

}
