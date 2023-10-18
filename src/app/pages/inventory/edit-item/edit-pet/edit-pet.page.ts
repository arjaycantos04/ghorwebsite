import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.page.html',
  styleUrls: ['./edit-pet.page.scss'],
})
export class EditPetPage implements OnInit {
  editedPet: any = {};
  petId: string = '';
  @ViewChild('imageInput1') imageInput1: ElementRef;
  @ViewChild('imageInput2') imageInput2: ElementRef;
  @ViewChild('imageInput3') imageInput3: ElementRef;

  constructor(private route: ActivatedRoute, private firestore: Firestore, private storage: AngularFireStorage, ) {this.imageInput1 = new ElementRef(null);
    this.imageInput2 = new ElementRef(null);
    this.imageInput3 = new ElementRef(null);}

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

  saveChanges() {
    const petRef = doc(this.firestore, 'items', this.petId);

    // Update the pet document with the edited data
    setDoc(petRef, this.editedPet, { merge: true })
      .then(() => {
        console.log('Changes saved successfully');
        // Optionally, you can navigate back to the pet details page
        // Navigate back or perform any other necessary actions
      })
      .catch((error) => {
        console.error('Error saving changes:', error);
      });
  }

  async handleImageInput(event: any, sectionId: number) {
    const file = event.target.files[0];

    if (file) {
      // Generate a unique name for the image (e.g., using a timestamp)
      const fileName = `${Date.now()}_${file.name}`;

      // Reference to the storage path where the new image will be uploaded
      const storageRef = this.storage.ref(`pet-images/${fileName}`);

      try {
        // Upload the new image to Firebase Storage
        const uploadTask = await storageRef.put(file);

        // Get the download URL for the uploaded image
        const downloadURL = await uploadTask.ref.getDownloadURL();

        // Update the specific `editedPet` property based on the sectionId
        switch (sectionId) {
          case 1:
            this.editedPet.image = downloadURL; // Update the 'image' property
            break;
          case 2:
            this.editedPet.image2 = downloadURL; // Update the 'image2' property
            break;
          case 3:
            this.editedPet.image3 = downloadURL; // Update the 'image3' property
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  removeImage(imageNumber: number) {
    switch (imageNumber) {
      case 1:
        this.editedPet.image = null; // Clear the 'image' property
        break;
      case 2:
        this.editedPet.image2 = null; // Clear the 'image2' property
        break;
      case 3:
        this.editedPet.image3 = null; // Clear the 'image3' property
        break;
      default:
        break;
    }
  }

  // Rest of your component code...

  


  
  
  
  
  
  
  imageHovered1: boolean = false;
  imageHovered2: boolean = false;
  imageHovered3: boolean = false;


  imageUploaded1: boolean = false;
imageUploaded2: boolean = false;
imageUploaded3: boolean = false;

}
