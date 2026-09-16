import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { DemoBadgeComponent } from './demo-badge/demo-badge.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LottieAnimationViewModule } from 'ng-lottie';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    LottieAnimationViewModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DemoBadgeComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DemoBadgeComponent
  ]
})
export class ComponentsModule { }
