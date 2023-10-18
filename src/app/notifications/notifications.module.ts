import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NotificationsComponent } from './notifications.component'; // Replace with your actual notification component

@NgModule({
  declarations: [
    NotificationsComponent, // Add your notification component here
  ],
  imports: [
    CommonModule,
    IonicModule, // You can include IonicModule if needed for Ionic components
    // Import other modules and dependencies as needed
  ],
  exports: [
    NotificationsComponent, // If you want to export the component, include it here
  ],
})
export class NotificationsModule {}
