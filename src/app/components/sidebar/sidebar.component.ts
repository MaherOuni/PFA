import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    /** Path to the lord-icon animation played on hover. */
    icon: string;
    /** lord-icon colour pair, in its own `primary:#hex,secondary:#hex` form. */
    colors: string;
    class: string;
}

// The icon and colour now live here rather than being repeated as a wall of
// *ngIf-ed <lord-icon> tags in the template, and the navbar reuses the same
// list to resolve the current page title.
const ICON = (name: string) => `assets/lottie/${name}`;

// Slate + brand tan, matching the tokens in assets/scss/theme/_tokens.scss.
const ICON_COLORS = 'primary:#464f4f,secondary:#b37f33';

export const ROUTES: RouteInfo[] = [
    {
      path: '/pos',
      title: 'Point de vente',
      icon: ICON('146-basket-trolley-shopping-card-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/product',
      title: 'Produits',
      icon: ICON('107-box-package-open-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/categorie',
      title: 'Categories',
      icon: ICON('112-book-morph-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/client',
      title: 'Clients',
      icon: ICON('269-avatar-female-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/provider',
      title: 'Fournisseurs',
      icon: ICON('497-truck-delivery-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/deposit',
      title: 'Depots',
      icon: ICON('63-home-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/sale',
      title: 'Ventes',
      icon: ICON('948-stock-share-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/stuff',
      title: 'Personnel',
      icon: ICON('680-it-developer-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
    {
      path: '/dashboard',
      title: 'Revenus',
      icon: ICON('153-bar-chart-growth-outline-edited.json'),
      colors: ICON_COLORS,
      class: ''
    },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public version = '1.2.0';

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(() => {
      this.isCollapsed = true;
   });
  }
}
