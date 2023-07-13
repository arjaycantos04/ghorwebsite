import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  constructor(
    private authService: AuthService,
    private angularFire: AngularFireAuth,
    private router: Router
  ) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => {
      console.log(res.user);
      this.router.navigateByUrl('dashboard');
    }).catch((error: any) => {
      console.log(error);
    })
  }
}
