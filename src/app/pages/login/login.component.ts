import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  login=undefined;
  password=undefined;
  constructor(private auth:AuthenticationService, private router: Router,) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  authenticate(){
   let credentials = {
      "username" : this.login,
      "password" : this.password
    }

    this.auth.authenticate(credentials).subscribe((response) => {
      this.auth.jwt=response['jwt'];
        localStorage.setItem("jwt",response['jwt'])
      this.router.navigate(["/dashboard"])
    });


  }
}
