import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { LoginPage } from '../login.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-modal.page.html',
  styleUrls: ['./signup-modal.page.scss'],
})
export class SignupModalPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  async signup() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Password and confirm password do not match.');
      return;
    }

    // Your signup logic here
    // This is where you would typically send the data to a server for registration.

    // Example: Navigating to another page (e.g., Home page) after successful signup
    this.navCtrl.navigateForward('/home');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  async openLoginPage() {
    const modal = await this.modalController.create({
      component: LoginPage,
    });
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
