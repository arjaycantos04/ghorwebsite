import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.page.html',
  styleUrls: ['./adoption.page.scss'],
})
export class AdoptionPage implements OnInit {
  applications: any[] = [
    {
      petName: 'Snoopy',
      adopterName: 'Criza Taa',
      imageUrl: 'path/to/snoopy-image.jpg',
    },
    {
      petName: 'Snoopy',
      adopterName: 'Criza Taa',
      imageUrl: 'path/to/snoopy-image.jpg',
    },
    {
      petName: 'Snoopy',
      adopterName: 'Criza Taa',
      imageUrl: 'path/to/snoopy-image.jpg',
    },
    {
      petName: 'Snoopy',
      adopterName: 'Criza Taa',
      imageUrl: 'path/to/snoopy-image.jpg',
    },
    {
      petName: 'Snoopy',
      adopterName: 'Criza Taa',
      imageUrl: 'path/to/snoopy-image.jpg',
    },
    {
      petName: 'Snoopy',
      adopterName: 'Criza Taa',
      imageUrl: 'path/to/snoopy-image.jpg',
    },
    // Add more application objects here as needed
  ];
  notificationsCount: number = 2;

  constructor(private actionSheetController: ActionSheetController,// Inject ActionSheetController
  private popoverController: PopoverController,
  private navCtrl: NavController,) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Logout',
          icon: 'log-out',
          role: 'logout',
          handler: () => {
            // Handle the "Logout" option click
            this.logout(); // Call the logout method to perform the logout logic and navigate to the login page
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Handle the "Cancel" button click (if needed)
            console.log('Cancelled');
          },
        },
      ],
    });
    await actionSheet.present();
  }
  openNotifications() {
    // You can implement your notification logic here
    // For example, display a list of notifications in a popover or modal
    console.log('Notification icon clicked');
    console.log(this.notificationsCount);
  }
  async openNotificationPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: NotificationsComponent,
      event: ev, // Use the click event to position the popover
    });
    return await popover.present();
  }

  logout() {
    // Perform any necessary logout logic here, e.g., clearing user data, sign out, etc.
  
    // Navigate to the login page
    this.navCtrl.navigateRoot('/login'); // Replace '/login' with the actual route to your login page
  }

 
}

