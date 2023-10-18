// login.page.ts

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { SignupModalPage } from './signup-modal/signup-modal.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'login-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user: {
    email: string;
    password: string;
  } = { email: '', password: '' };

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      if (!this.user.email) {
        this.showToast('Email is required.', 'danger');
        return;
      }
  
      const userExists = await this.authService.checkUserExists(this.user.email);
  
      if (userExists) {
        await this.authService.signInWithEmailAndPassword(this.user.email, this.user.password);
        // Redirect the user after successful login (you can add your logic here)
        this.showToast('Logged in successfully!', 'success');
      } else {
        this.showToast('User not found. Please check your email.', 'danger');
      }
    } catch (error) {
      console.error('Login error:', error);
      this.showToast('An error occurred during login.', 'danger');
    }
  }
  
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      color: color, // You can set the color (e.g., 'danger' for red, 'success' for green)
    });
    toast.present();
  }

  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      // Handle successful Google sign-in
      // You can navigate or perform actions after successful sign-in.
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Handle Google sign-in errors
      // You can display an error message to the user.
    }
  }

  async openSignUpModal() {
    await this.modalController.dismiss(); // Close the sign-up modal
    const modal = await this.modalController.create({
      component: SignupModalPage,
      
    });
    return await modal.present();
    
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
