import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemoService } from '../../demo/demo.service';

/**
 * The "Mode demo" pill in the top bar.
 *
 * Renders nothing outside demo mode, so it can sit unconditionally in the
 * navbar template. It is the only place that tells a visitor the data is not
 * real, and the only way to reset or leave the demo from inside the app.
 */
@Component({
  selector: 'app-demo-badge',
  templateUrl: './demo-badge.component.html',
  styleUrls: ['./demo-badge.component.scss']
})
export class DemoBadgeComponent {

  constructor(public demo: DemoService, private router: Router) { }

  /** Re-seeds the catalogue, discarding anything added during the visit. */
  reset(): void {
    this.demo.reset();
    // Pages read their rows in ngOnInit, so re-enter the current route to
    // make the refreshed data show up without a full page reload.
    const url = this.router.url;
    this.router.navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => this.router.navigateByUrl(url));
  }

  /** Leaves the demo and returns to the real login screen. */
  exit(): void {
    this.demo.disable();
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
