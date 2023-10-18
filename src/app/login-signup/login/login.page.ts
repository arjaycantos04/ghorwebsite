import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PasswordChangeModalPage } from './password-change-modal/password-change-modal.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  emailInvalid: boolean = false;
  passwordInvalid: boolean = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Check if the page needs to be reloaded (only once)
    const shouldReload = sessionStorage.getItem('reloadLoginPage');
    if (!shouldReload) {
      sessionStorage.setItem('reloadLoginPage', 'true'); // Set the flag
      window.location.reload(); // Reload the page
    }
  }

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );

      if (userCredential.user) {
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      console.error('Authentication failed', error);
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        this.passwordInvalid = true;
        this.presentToast('Invalid password');
      } else if (error.code === 'auth/invalid-email') {
        this.emailInvalid = true;
        this.presentToast('Invalid email');
      }
    }
  }

  async forgotPassword() {
    const modal = await this.modalController.create({
      component: PasswordChangeModalPage,
    });
    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Adjust the duration as needed
      position: 'bottom', // You can change the position to 'top', 'middle', or 'bottom'
      color: 'danger', // You can customize the color
    });
    toast.present();
  }
}
