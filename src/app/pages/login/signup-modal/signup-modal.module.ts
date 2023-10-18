import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule instead of FormsModule

import { IonicModule } from '@ionic/angular';

import { SignupModalPageRoutingModule } from './signup-modal-routing.module';

import { SignupModalPage } from './signup-modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, // Use ReactiveFormsModule here
    IonicModule,
    SignupModalPageRoutingModule
  ],
  declarations: [SignupModalPage]
})
export class SignupModalPageModule {}
