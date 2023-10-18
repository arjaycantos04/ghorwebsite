import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordChangeModalPageRoutingModule } from './password-change-modal-routing.module';

import { PasswordChangeModalPage } from './password-change-modal.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordChangeModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PasswordChangeModalPage]
})
export class PasswordChangeModalPageModule {}
