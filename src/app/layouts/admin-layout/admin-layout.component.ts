import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private auth: AuthenticationService,private router:Router) { }

  ngOnInit() {
    this.auth.jwt = localStorage.getItem("jwt");
    if(this.auth.jwt == undefined){
        this.router.navigate(["/login"])
    }
  }

}
