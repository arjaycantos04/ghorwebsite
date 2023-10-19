import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs'; // Removed 'of' import
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/firestore.service';

register();

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.page.html',
  styleUrls: ['./pet-details.page.scss'],
})
export class PetDetailsPage implements OnInit {
  editedPet: any = {};
  petId: number = 0;
  subscription: Subscription | undefined;
  

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private location: Location,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.petId = +params['id'] || 0;
      console.log('petId:', this.petId); // Add this line for debugging
      this.loadPetDetails();
    });
  }

 loadPetDetails() {
  console.log('petId:', this.petId); // Add this line for debugging

  const petObservable: Observable<any> = this.firestoreService.getPetById(this.petId);

  petObservable.subscribe(
    (petData: any) => {
      console.log('Retrieved pet data:', petData);
      if (petData) {
        this.editedPet = petData;
      } else {
        console.log('Pet not found');
      }
    },
    (error: any) => {
      console.error('Error loading pet details:', error);
    }
  );
}





  ionViewDidEnter() {
    const swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Other Swiper options
    });
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
  
}
