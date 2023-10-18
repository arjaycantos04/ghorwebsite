import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc, getDocs, DocumentReference } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

interface Item {
  image: string; // Store the image URL directly
  image2: string | null; // Store the image URL directly
  image3: string | null; // Store the image URL directly
  name: string;
  breed: string;
  age: string;
  gender: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  image: File | null = null;
  image2: File | null = null;
  image3: File | null = null;
  imageURL: string | ArrayBuffer | null = null;
  imageURL2: string | ArrayBuffer | null = null;
  imageURL3: string | ArrayBuffer | null = null;
  name: string = '';
  breed: string = '';
  age: string = '';
  gender: string = '';
  description: string = '';
  category: string = '';
  items: Item[] = [];
  formSubmitted: boolean = false;
  currentStep: number = 1;
  imageUrl: string = '';

  constructor(
    private router: Router,
    private firestore: Firestore,
    private toastController: ToastController,
    private location: Location,
    private storage: AngularFireStorage
  ) {}

  async ngOnInit() {
    await this.fetchItems();
  }

  async fetchItems() {
    const querySnapshot = await getDocs(collection(this.firestore, 'items'));
    this.items = querySnapshot.docs.map((doc) => doc.data() as Item);
  }

  async submitForm(formElement: NgForm) {
    this.formSubmitted = true;

    // Debugging statements for image URLs
    console.log('imageURL:', this.imageURL);
    console.log('imageURL2:', this.imageURL2);
    console.log('imageURL3:', this.imageURL3);

    if (this.isFormValid()) {
      // Upload the images and get their URLs
      const imageUrls = await this.uploadImagesToStorage([
        this.image as File,
        this.image2 as File,
        this.image3 as File
      ]);

      // Create the newItem object with image URLs
      const newItem: Item = {
        image: imageUrls[0],
        image2: imageUrls[1] || null,
        image3: imageUrls[2] || null,
        name: this.name,
        breed: this.breed,
        age: this.age,
        gender: this.gender,
        description: this.description,
        category: this.category,
      };

      try {
        // Add the newItem to the Firestore 'items' collection
        const docRef = await addDoc(collection(this.firestore, 'items'), newItem);
        this.presentToast('Pet added successfully', 'success-toast');
        this.items.push(newItem);

        const imageReferences: any = {
          imageUrls: imageUrls,
          itemId: docRef.id,
        };

        const imageDocRef: DocumentReference = await addDoc(collection(this.firestore, 'imageReferences'), imageReferences);

        this.resetForm();

        this.location.replaceState('/inventory');
        window.location.reload();
      } catch (error) {
        console.log('Error adding item:', error);
      }
    } else {
      this.presentToast('Please fill in all required fields', 'error-toast');
    }
  }

  isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.breed.trim().length > 0 &&
      this.age.trim().length > 0 &&
      this.gender.trim().length > 0 &&
      this.description.trim().length > 0 &&
      this.category.trim().length > 0
    );
  }

  resetForm() {
    this.imageURL = null;
    this.imageURL2 = null;
    this.imageURL3 = null;
    this.name = '';
    this.breed = '';
    this.age = '';
    this.gender = '';
    this.description = '';
    this.category = '';
    this.formSubmitted = false;
  }

  async uploadImagesToStorage(images: File[]): Promise<string[]> {
    const imageUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image) {
        const filePath = `images/${new Date().getTime()}_${image.name}`;
        const fileRef = this.storage.ref(filePath);

        try {
          const uploadTask = await fileRef.put(image);
          const imageUrl = await uploadTask.ref.getDownloadURL();
          if (imageUrl) {
            imageUrls.push(imageUrl);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    }

    return imageUrls;
  }

  handleImageInput(event: any, sectionId: number) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      switch (sectionId) {
        case 1:
          this.imageURL = reader.result as string;
          break;
        case 2:
          this.imageURL2 = reader.result as string;
          break;
        case 3:
          this.imageURL3 = reader.result as string;
          break;
        default:
          break;
      }
    };

    if (file) {
      reader.readAsDataURL(file);
      switch (sectionId) {
        case 1:
          this.image = file;
          break;
        case 2:
          this.image2 = file;
          break;
        case 3:
          this.image3 = file;
          break;
        default:
          break;
      }
    }
  }

  // Example of using an Observable and updating imageUrl
  someFunctionThatReturnsObservable(): Observable<any> {
    const imageUrlObservable: Observable<any> = this.getObservableForImageUrl();

    imageUrlObservable.subscribe((value: any) => {
      this.imageUrl = value.toString();
    });

    return imageUrlObservable;
  }

  private getObservableForImageUrl(): Observable<any> {
    // Simulate fetching the image URL
    return new Observable((observer) => {
      setTimeout(() => {
        const imageUrl = 'https://example.com/image.jpg';
        observer.next(imageUrl);
        observer.complete();
      }, 2000);
    });
  }

  goToInventory() {
    this.router.navigateByUrl('/inventory');
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  async presentToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: cssClass,
    });
    toast.present();
  }

  imageHovered1: boolean = false;
  imageHovered2: boolean = false;
  imageHovered3: boolean = false;

  goToStep(stepNumber: number) {
    this.currentStep = stepNumber;
  }

  removeImage(imageNumber: number) {
    switch (imageNumber) {
      case 1:
        this.imageURL = null;
        this.image = null;
        break;
      case 2:
        this.imageURL2 = null;
        this.image2 = null;
        break;
      case 3:
        this.imageURL3 = null;
        this.image3 = null;
        break;
      default:
        break;
    }
  }

  

  
}
