import { Component, OnInit, HostListener} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/firestore.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';

import { PetDetailsPage } from './pet-details/pet-details.page';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage implements OnInit {
  selectedValue: string = 'all';
  isSmallScreen: boolean = false; // Define and initialize the property
  isBigScreen: boolean = false; // Define and initialize the property
  selectedOption: string = ''; // Initialize with an empty string
  redirectTo: string = ''; // New variable to hold the selected option for redirection
  isOptionSelected: boolean = false;
  isModalOpen = false;
  displayedItems: any[] = [];
  searchTerm: string = '';
  filterGender: string = '';
  filterCategory: string = '';
  filterAge: string = '';
  items: any[] = [];

  public data: Item[] = [];
  public results: Item[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private actionSheetController: ActionSheetController,// Inject ActionSheetController
    private popoverController: PopoverController,
  ) { 
    this.checkScreenSize();
  }

  ngOnInit() {
    this.firestoreService.items$.subscribe((data) => {
      this.data = data;
      this.results = [...this.data];
      this.filterItems();
    });
  }
  
  adoptClicked(pet: Item) {
    if (pet) {
      console.log('Adopt button clicked', pet);
      const dataToPass = {
        id: pet.id,
        category: pet.category,
        name: pet.name,
        gender: pet.gender,
        age: pet.age,
        breed: pet.breed,
        image: pet.image,
        description: pet.description,
      };
      console.log('Data to pass to client page:', dataToPass);
      this.modalController.dismiss().then(() => {
        this.navCtrl.navigateForward('./client', { state: { pet: dataToPass } });
        this.router.navigate(['./client',  pet.id ]);
      });
    } else {
      console.error('No pet selected for adoption.');
    }
  }
  
  
  

  // handleInput(event: any) {
  //   const query = event.target.value.toLowerCase();
  //   this.results = this.data.filter((d) => {
  //     const nameMatches = d.name.toLowerCase().indexOf(query) > -1;
  //     const genderMatches = d.gender.toLowerCase().indexOf(query) > -1;
  //     const typeMatches = d.category.toLowerCase().indexOf(query) > -1;
  //     const ageMatches = d.age.toLowerCase().indexOf(query) > -1;
  //     const breedMatches = d.breed.toLowerCase().indexOf(query) > -1;
  //     return nameMatches || breedMatches || ageMatches || genderMatches || typeMatches;
  //   });
  // }

  // adoptPet(petId: number) {
  //   this.router.navigate(['/client', petId]);
  // }



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

  filterItems() {
    this.results = this.data.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseBreed = item.breed.toLowerCase();
  
      const isNameMatch = lowerCaseName.includes(this.searchTerm.toLowerCase());
      const isBreedMatch = lowerCaseBreed.includes(this.searchTerm.toLowerCase());
      const isGenderMatch = this.filterGender === '' || item.gender === this.filterGender;
      const isCategoryMatch = this.filterCategory === '' || item.category === this.filterCategory;
      const isAgeMatch = this.filterAge === '' || item.age === this.filterAge;
  
      return (isNameMatch || isBreedMatch) && isGenderMatch && isCategoryMatch && isAgeMatch;
    });
  }

  async openPetDetailsModal(petId: number) {
    
    console.log('Modal opening with petId:', petId); // Add this line
    const modal = await this.modalController.create({
      component: PetDetailsPage,
      componentProps: {
        petId: petId
      }
    });
    return await modal.present();
  }
  
  
  
  
  
  
  clearSearch() {
    this.searchTerm = '';
    this.filterItems();
  }
  
  
  
  
  

  logout() {
    // Perform any necessary logout logic here, e.g., clearing user data, sign out, etc.
  
    // Navigate to the login page
    this.navCtrl.navigateRoot('/home'); // Replace '/login' with the actual route to your login page
  }
}

export interface Item {
  id: number;
  category: string;
  name: string;
  gender: string;
  age: string;
  breed: string;
  image: string;
  description: string;
}

