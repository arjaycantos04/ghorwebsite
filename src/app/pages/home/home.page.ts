import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';




register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isSmallScreen: boolean = false; // Define and initialize the property
  isBigScreen: boolean = false; // Define and initialize the property
  constructor(
    private modalController: ModalController,
    private menuController: MenuController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private location: Location,
  ) {
    this.checkScreenSize();
  }

  ngOnInit() {
  }

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: {},
    });
    await modal.present();
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

  openDonatePage() {
    // Navigate to the donate page programmatically
    this.router.navigate(['/donate']);
  }
}
