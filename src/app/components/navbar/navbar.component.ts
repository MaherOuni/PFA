import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { DemoService } from '../../demo/demo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public listTitles: any[];
  public location: Location;

  constructor(location: Location,
              private auth: AuthenticationService,
              private demo: DemoService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  /** Name shown on the account chip. */
  get userName(): string {
    return this.demo.active ? 'Mohamed Salah' : 'Mon compte';
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
        titlee = titlee.slice(1);
    }

    // The path can carry a query string (a shared ?demo=1 link, for one), so
    // match on the path alone or the title falls back to 'Tableau de bord'.
    const path = titlee.split('?')[0];

    for (let item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === path) {
            return this.listTitles[item].title;
        }
    }
    return 'Tableau de bord';
  }

  logout() {
    localStorage.removeItem('jwt');
    this.auth.jwt = undefined;
  }
}
