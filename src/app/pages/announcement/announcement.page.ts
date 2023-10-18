import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  Firestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from '@angular/fire/firestore';
import { AnnouncementDetailsModalPage } from './announcement-details-modal/announcement-details-modal.page';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

interface Announcement {
  id?: string; // Optional id property
  dateTime: string;
  title: string;
  content: string;
 
}

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.page.html',
  styleUrls: ['./announcement.page.scss'],
})
export class AnnouncementPage implements OnInit {
  announcements: Announcement[] = [];
  showCreateAnnouncement = false;
  newAnnouncement: Announcement = { title: '', content: '', dateTime: '' };
  selectedAnnouncement: Announcement | null = null;
  searchTerm: string = '';
  filteredAnnouncements: Announcement[] = [];
  notificationsCount: number = 2;

  constructor(
    private modalController: ModalController,
    private firestore: Firestore,
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,// Inject ActionSheetController
    private popoverController: PopoverController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  async loadAnnouncements() {
    const querySnapshot = await getDocs(collection(this.firestore, 'announcements'));
    this.announcements = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data } as Announcement;
    });
  }

  showDetails(announcement: Announcement) {
    this.selectedAnnouncement = announcement;
    this.presentModal();
  }

  async presentPublishConfirmation(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header: 'Publish Confirmation',
        message: 'Are you sure you want to publish this announcement?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Publish canceled');
              resolve(false);
            },
          },
          {
            text: 'Publish',
            handler: () => {
              console.log('Publish confirmed');
              resolve(true);
            },
          },
        ],
      });
  
      await alert.present();
    });
  }
  
  
  async createAnnouncement() {
    const confirmation = await this.presentPublishConfirmation();
    if (this.newAnnouncement.title.trim() === '' || this.newAnnouncement.content.trim() === '') {
      // Show a warning message
      const warningAlert = await this.alertCtrl.create({
        header: 'Reminder',
        message: 'Please fill in the Announcement Title or Summary.',
        buttons: ['OK'],
      });
      await warningAlert.present();
      return; // Exit the function without adding the announcement.
    }
  
    if (confirmation) {
      this.newAnnouncement.dateTime = new Date().toLocaleString();
  
      try {
        const docRef = await addDoc(
          collection(this.firestore, 'announcements'),
          this.newAnnouncement
        );
        this.newAnnouncement = { title: '', content: '', dateTime: '' };
        this.showCreateAnnouncement = false;
        console.log('Announcement added with ID: ', docRef.id);
        this.loadAnnouncements();
      } catch (error) {
        console.error('Error adding announcement:', error);
      }
    }
  }
  
  
  

  async deleteAnnouncement(announcement: Announcement) {
    try {
      if (announcement.id) {
        const announcementRef = doc(
          this.firestore,
          'announcements',
          announcement.id
        );
        await deleteDoc(announcementRef);

        const index = this.announcements.findIndex((a) => a.id === announcement.id);
        if (index !== -1) {
          this.announcements.splice(index, 1);
        }
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  }

  toggleCreateAnnouncement() {
    this.showCreateAnnouncement = !this.showCreateAnnouncement;
  }

  saveAnnouncement() {
    // Your saveAnnouncement logic here
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AnnouncementDetailsModalPage, // Updated component name
      componentProps: { announcement: this.selectedAnnouncement },
    });
    return await modal.present();
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterItems();
  }

  filterItems() {
    const lowerSearchTerm = this.searchTerm.toLowerCase();

    this.filteredAnnouncements = this.announcements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(lowerSearchTerm);
    });
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
