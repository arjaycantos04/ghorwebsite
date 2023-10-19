import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isSmallScreen: boolean = false; // Define and initialize the property
  isBigScreen: boolean = false; // Define and initialize the property
  selectedOption: string = ''; // Initialize with an empty string
  redirectTo: string = ''; // New variable to hold the selected option for redirection
  isOptionSelected: boolean = false;
  constructor(
    private modalController: ModalController,
    private menuController: MenuController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private location: Location,
    private actionSheetController: ActionSheetController,// Inject ActionSheetController
    private popoverController: PopoverController,
  ) {
    this.checkScreenSize();
  }

  ngOnInit() {
  }

 

  openMenu() {
    this.menuController.enable(true, 'menuId'); // Replace 'menuId' with the ID of your menu
    this.menuController.open('menuId'); // Replace 'menuId' with the ID of your menu
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; // Adjust the threshold as needed
    this.isBigScreen = window.innerWidth >= 769; // Adjust the threshold as needed
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

  navigateToSelectedOption() {
    if (this.selectedOption === 'pet') {
      this.router.navigate(['/pets']);
    } else if (this.selectedOption === 'donate') {
      // Handle navigation for the "donate" option if needed
    }
  }

  

  redirectToOption() {
    this.selectedOption 
    if (this.selectedOption === 'pet') {
      this.router.navigate(['/pets']);
    }
  }



  onSelectChange(event: CustomEvent<string>) {
    if (event.detail) {
      this.isOptionSelected = false;
    } else {
      this.isOptionSelected = false;
    }
  }
  
  
  
  
  
  
  

  logout() {
    // Perform any necessary logout logic here, e.g., clearing user data, sign out, etc.
  
    // Navigate to the login page
    this.navCtrl.navigateRoot('/home'); // Replace '/login' with the actual route to your login page
  }
}
