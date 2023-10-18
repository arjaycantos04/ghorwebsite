import { Component } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  catCount: number = 0;
  dogCount: number = 0;
  notificationsCount: number = 2;
  items: any[] = [];
  selectedOption: string = ''; // Holds the selected option
  showMenu: boolean = false;

  constructor(
    private firestore: Firestore,
    private menuCtrl: MenuController,
    private actionSheetController: ActionSheetController,// Inject ActionSheetController
    private popoverController: PopoverController,
    private navCtrl: NavController,
  ) {
    this.fetchItems();
  }

  async fetchItems() {
    const querySnapshot = await getDocs(collection(this.firestore, 'items'));
    this.items = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });

    this.updateCounts();
  }

  updateCounts() {
    this.catCount = this.items.filter((item) => item.category === 'Cat').length;
    this.dogCount = this.items.filter((item) => item.category === 'Dog').length;
    // Implement your logic to update catCount and dogCount based on the 'items' data
  }

  // Function to open the select when the button is clicked
  openSelect() {
    const select: any = document.querySelector('ion-select');
    select.open();
  }

  // Function to handle option selection
  onOptionChange() {
    console.log('Selected option:', this.selectedOption);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
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
