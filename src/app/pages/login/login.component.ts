import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { DemoService } from '../../demo/demo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = '';
  password = '';
  error: string = null;

  constructor(private auth: AuthenticationService,
              private router: Router,
              public demo: DemoService) {}

  ngOnInit() {
    // Already in the demo - from a baked-in DEMO_MODE build, a ?demo=1 link or
    // an earlier visit - so there is nothing to authenticate against. Skip the
    // form. Leaving the demo clears the flag and brings this screen back.
    if (this.demo.active) {
      this.router.navigate(['/dashboard']);
    }
  }

  authenticate() {
    // `login` used to be undefined until the first keystroke, so submitting an
    // empty form threw on `.length` instead of showing the validation message.
    if (!this.login || this.login.length < 3 || !this.password || this.password.length < 4) {
      this.error = 'Identifiant ou mot de passe invalide.';
      return;
    }

    this.error = null;

    const credentials = {
      username: this.login,
      password: this.password
    };

    this.auth.authenticate(credentials).subscribe((response) => {
      this.auth.jwt = response['jwt'];
      localStorage.setItem('jwt', response['jwt']);
      this.router.navigate(['/dashboard']);
    }, err => {
      // A backend that is down gives no err.error.message to read.
      this.error = (err.error && err.error.message)
        || 'Connexion impossible. Verifiez vos identifiants ou reessayez plus tard.';
    });
  }

  /** Turns on demo mode and drops the visitor straight into the dashboard. */
  startDemo() {
    this.demo.enable();
    localStorage.setItem('jwt', 'demo-mode-token');
    this.auth.jwt = 'demo-mode-token';
    this.router.navigate(['/dashboard']);
  }
}
