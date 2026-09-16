import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { DemoService } from '../../demo/demo.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private auth: AuthenticationService,
              private router: Router,
              private demo: DemoService) { }

  ngOnInit() {
    // Demo mode has no backend to issue a real token. Keep the guard below
    // intact for the real deployment, but satisfy it with a placeholder so the
    // admin pages stay reachable instead of bouncing to the login screen.
    if (this.demo.active) {
      this.auth.jwt = localStorage.getItem('jwt') || 'demo-mode-token';
      return;
    }

    this.auth.jwt = localStorage.getItem('jwt');
    if (this.auth.jwt == undefined) {
      this.router.navigate(['/login']);
    }
  }

}
