import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EditItemPage } from './edit-item/edit-item.page';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { NotificationsComponent } from '../../notifications/notifications.component';




@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage {
  items: any[] = [];
  displayedItems: any[] = [];
  searchTerm: string = '';
  filterGender: string = '';
  filterCategory: string = '';
  filterAge: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  catCount: number = 0;
  dogCount: number = 0;
  notificationsCount: number = 2;

  constructor(
    private router: Router,
    private firestore: Firestore,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,// Inject ActionSheetController
    private popoverController: PopoverController,
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
    this.filterItems();
  }
  navigateToEditItem(itemId: string) {
    this.navCtrl.navigateForward(`/inventory/${itemId}`);
  }
  
  filterItems() {
    this.displayedItems = this.items.filter((item) => {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseBreed = item.breed.toLowerCase();

      const isNameMatch = lowerCaseName.includes(lowerCaseSearchTerm);
      const isBreedMatch = lowerCaseBreed.includes(lowerCaseSearchTerm);
      const isGenderMatch = this.filterGender === '' || item.gender === this.filterGender;
      const isCategoryMatch = this.filterCategory === '' || item.category === this.filterCategory;
      const isAgeMatch = this.filterAge === '' || item.age === this.filterAge;

      return (isNameMatch || isBreedMatch) && isGenderMatch && isCategoryMatch && isAgeMatch;
    });
  }

  updateCounts() {
    this.catCount = this.items.filter((item) => item.category === 'Cat').length;
    this.dogCount = this.items.filter((item) => item.category === 'Dog').length;
  }

  goToAddPet() {
    this.router.navigateByUrl('/add-pet');
  }

  editItem(item: any) {
    this.navCtrl.navigateForward(`/edit-item/${item.id}`, { state: { itemData: item } });
  }

  async deleteItem(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this pet?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Deletion canceled.');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.confirmDelete(item);
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmDelete(item: any) {
    if (item && item.id) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        const itemId = item.id;
        try {
          await deleteDoc(doc(this.firestore, 'items', itemId));
          console.log('Pet deleted successfully');
          this.items.splice(index, 1);
          this.updateCounts();
          this.filterItems();
          console.log('Items after deletion:', this.items);
          this.presentToast('Pet deleted successfully');
        } catch (error) {
          console.log('Error deleting item:', error);
        }
      } else {
        console.log('Item index not found');
      }
    } else {
      console.log('Invalid item or missing ID');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterItems();
  }


  


  

  goToEditPetPage(petId: string) {
    // Navigate to the EditItemPage with the pet's ID as a parameter
    this.router.navigate(['/edit-item', petId]);
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
