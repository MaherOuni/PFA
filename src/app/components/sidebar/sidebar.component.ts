import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;

    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/pos', title: 'Point de vente',  icon: '<lord-icon src="../../../assets/lottie/146-basket-trolley-shopping-card-outline-edited.json" trigger="hover" colors="primary:#d2b48c,secondary:#464f4f" stroke="80" style="width:40px;height:40px"></lord-icon>', class: '' },
    { path: '/product', title: 'Produits',  icon:'<lord-icon src="../../../assets/lottie/107-box-package-open-outline-edited.json" trigger="hover" colors="primary:#464f4f,secondary:#5e72e4" stroke="80" style="width:40px;height:40px"></lord-icon>',class: '' },
    { path: '/categorie', title: 'Categories',  icon:'<lord-icon src="../../../assets/lottie/112-book-morph-outline-edited.json" trigger="hover" colors="primary:#f4a460,secondary:#464f4f" stroke="80" style="width:40px;height:40px"></lord-icon>', class: '' },
    { path: '/client', title: 'Clients',  icon:'<lord-icon src="../../../assets/lottie/269-avatar-female-outline-edited.json" trigger="hover" colors="primary:#464f4f,secondary:#ffd600" stroke="80" style="width:40px;height:40px"></lord-icon>',class: '' },
    { path: '/provider', title: 'Fournisseurs',  icon:'<lord-icon src="../../../assets/lottie/497-truck-delivery-outline-edited.json" trigger="hover" colors="primary:#464f4f,secondary:#f5365c" stroke="80" style="width:40px;height:40px"></lord-icon>', class: '' },
    { path: '/deposit', title: 'Dépôt',  icon:'<lord-icon src="../../../assets/lottie/63-home-outline-edited.json" trigger="hover" colors="primary:#2dce89,secondary:#464f4f" stroke="80" style="width:40px;height:40px"></lord-icon>',class: '' },
    { path: '/sale', title: 'Vents',  icon:'<lord-icon src="../../../assets/lottie/948-stock-share-outline-edited.json" trigger="hover" colors="primary:#121331,secondary:#5e72e4" stroke="80" style="width:40px;height:40px"></lord-icon>', class: '' },
    { path: '/dashboard', title: 'Personnels',  icon:'<lord-icon src="../../../assets/lottie/680-it-developer-outline-edited.json" trigger="hover" colors="primary:#121331,secondary:#5e72e4" stroke="80" style="width:40px;height:40px"></lord-icon>', class: '' },
    { path: '/dashboard', title: 'Revenu',  icon:'<lord-icon src="../../../assets/lottie/153-bar-chart-growth-outline-edited.json" trigger="hover" colors="primary:#121331,secondary:#5e72e4" stroke="80" style="width:40px;height:40px"></lord-icon>', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
