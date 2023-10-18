import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: 'password-change-modal.page.html',
  styleUrls: ['password-change-modal.page.scss'],
})
export class PasswordChangeModalPage {
  changePasswordForm: FormGroup;
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  emailTouched: boolean = false;

  constructor(
    private modalController: ModalController,
    private afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)],]
    });
  }

  async sendVerificationCode() {
    if (this.changePasswordForm.get('email')?.valid) {
      try {
        await this.afAuth.sendPasswordResetEmail(this.changePasswordForm.get('email')?.value);
        const toast = await this.toastController.create({
          message: 'Verification link sent to your email',
          duration: 3000,
          color: 'primary',
        });
        toast.present();
        this.dismissModal();
      } catch (error) {
        console.error('Failed to send verification link', error);
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Invalid email. Please enter a valid email address.',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }
  }

  async changePassword() {
    if (this.changePasswordForm.valid) {
      const { email, verificationCode, newPassword } = this.changePasswordForm.value;
      try {
        await this.afAuth.verifyPasswordResetCode(verificationCode);
        await this.afAuth.confirmPasswordReset(verificationCode, newPassword);
        const toast = await this.toastController.create({
          message: 'Password changed successfully',
          duration: 3000,
        });
        toast.present();
        this.dismissModal();
      } catch (error) {
        console.error('Password change failed', error);
      }
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

 
    isEmailInvalid() {
      return (
        this.changePasswordForm.get('email')?.invalid &&
        this.changePasswordForm.get('email')?.touched &&
        !this.emailTouched
      );
  }
}
