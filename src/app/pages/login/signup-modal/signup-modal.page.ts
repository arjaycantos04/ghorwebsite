import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup-modal',
  templateUrl: 'signup-modal.page.html',
  styleUrls: ['signup-modal.page.scss'],
})
export class SignupModalPage {
  signupForm: FormGroup;
  passwordsDoNotMatch: boolean = false;

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    private afFirestore: AngularFirestore,
  ) {
    this.signupForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: [''],
      },
      {
        validators: this.passwordMatchValidator, // Specify the custom validator
      }
    );
  }

  // Define the custom password match validator
  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  };
 


  async closeModal() {
    await this.modalController.dismiss();
  }

  async signup() {
    const { email, password, firstName, lastName } = this.signupForm.value;
    try {
      if (firstName) {
        const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

        if (credential && credential.user) {
          console.log('Successfully signed up:', credential.user);

          const userId = credential.user.uid;

          if (userId) {
            await this.afFirestore.collection('users').doc(userId).set({
              firstName: firstName,
              lastName: lastName,
              email: email,
              // Add more user data fields as needed
            });

            await this.modalController.dismiss();
            this.presentSuccessToast('Sign-up successful!');
          } else {
            console.error('User ID is undefined.');
          }
        } else {
          console.error('User credential is undefined.');
        }
      } else {
        console.error('First Name is not provided.');
        this.presentErrorToast('Please provide your First Name.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      this.presentErrorToast('An error occurred during sign-up.');
    }
  }

  async openLoginPage() {
    await this.navCtrl.navigateRoot('/login');
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async presentErrorToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }


 
}

