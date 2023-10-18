import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

register();

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  editedPet: any = {};
  petId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private alertController: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.petId = params['id'];
      this.loadPetDetails();
    });
  }

  loadPetDetails() {
    const petRef = doc(this.firestore, 'items', this.petId);
    getDoc(petRef)
      .then((petDoc) => {
        if (petDoc.exists()) {
          this.editedPet = petDoc.data();
        } else {
          console.log('Pet not found');
        }
      })
      .catch((error) => {
        console.error('Error loading pet details:', error);
      });
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

  async presentDeleteConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this pet?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // User clicked "Cancel," do nothing.
          },
        },
        {
          text: 'Yes',
          handler: async () => {
            // User clicked "Yes," perform the delete operation in Firestore.
            try {
              await this.deletePet(); // Delete the pet from Firestore

              // Display a success message
              const successAlert = await this.alertController.create({
                header: 'Success',
                message: 'The pet has been successfully deleted.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      // After clicking OK, use the Router to trigger a page reload in the "inventory" page.
                      this.location.replaceState('/inventory');
                     window.location.reload();
                     
                    
                    },
                  },
                ],
              });
              await successAlert.present();
            } catch (error) {
              console.error('Error deleting pet:', error);
              // Handle any error, e.g., display an error message.
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async deletePet() {
    try {
      await deleteDoc(doc(this.firestore, 'items', this.petId));
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw error;
    }
  }
  navigateToEditPet() {
    // Use the Router to navigate to the "edit-pet" page and provide the pet ID as a parameter
    this.router.navigate(['/edit-pet', this.petId]);
  }
  
}
