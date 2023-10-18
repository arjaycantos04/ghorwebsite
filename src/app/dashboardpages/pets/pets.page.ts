import { Component, OnInit, HostListener} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/firestore.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage implements OnInit {
  selectedValue: string = 'all';
  isSmallScreen: boolean = false; // Define and initialize the property
  isBigScreen: boolean = false; // Define and initialize the property

  isModalOpen = false;

  public data: Item[] = [];
  public results: Item[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private router: Router
  ) { 
    this.checkScreenSize();
  }

  ngOnInit() {
    this.firestoreService.items$.subscribe((data) => {
      this.data = data;
      this.results = [...this.data];
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
  
  
  

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => {
      const nameMatches = d.name.toLowerCase().indexOf(query) > -1;
      const genderMatches = d.gender.toLowerCase().indexOf(query) > -1;
      const typeMatches = d.category.toLowerCase().indexOf(query) > -1;
      const ageMatches = d.age.toLowerCase().indexOf(query) > -1;
      const breedMatches = d.breed.toLowerCase().indexOf(query) > -1;
      return nameMatches || breedMatches || ageMatches || genderMatches || typeMatches;
    });
  }

  adoptPet(petId: number) {
    this.router.navigate(['/client', petId]);
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768; // Adjust the threshold as needed
    this.isBigScreen = window.innerWidth >= 769; // Adjust the threshold as needed
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

