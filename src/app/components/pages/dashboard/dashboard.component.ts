import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/auth/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private _auth: AdminService) {
   }

  ngOnInit() {
  }

}
