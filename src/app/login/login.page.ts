import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { SignupModalPage } from './signup-modal/signup-modal.page';


@Component({
  selector: 'login-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  // loginForm: FormGroup=new FormGroup({
  //   email: new FormControl('', [Validators])
  // });

  constructor(
    private authService: AuthService,
    private angularFire: AngularFireAuth,
    private router: Router,
    private modalController: ModalController
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => {
      console.log(res.user);
      this.router.navigateByUrl('dashboard');
    }).catch((error: any) => {
      console.log(error);
    })
  }

  async openSignUpModal() {
    const modal = await this.modalController.create({
      component: SignupModalPage,
    });
    return await modal.present();
  }



  
  // loginWithEmailAndPassword(){
  //   console.log(this.loginForm.value)
  //   const userData = Object.assign(this.loginForm.value, {email: this.loginForm.value.username});
  //   // console.log(userData);
  //   this.authService.signWithEmailAndPassword(userData).then((res: any) => {
  //     console.log(res.user);
  //     this.router.navigateByUrl('dashboard');
  //   }).catch((error: any) => {
  //     console.log(error);
  //   })
  // }
}
