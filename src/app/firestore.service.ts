import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private itemsCollection: AngularFirestoreCollection<any>;
  items$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items'); // Replace 'items' with your Firestore collection name.
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      map((actions) => actions.map((a) => ({ id: a.payload.doc.id, ...a.payload.doc.data() })))
    );
  }

  getPetById(petId: number): Observable<any> {
    return this.afs.collection('pets').doc(petId.toString()).valueChanges().pipe(
      catchError((error) => {
        console.error('Error retrieving pet data:', error);
        return of(null); // Return a default value or handle the error as needed
      })
    );
  }

  addItemWithId(item: any, id: string): Promise<void> {
    return this.itemsCollection.doc(id).set(item);
  }

  // Add more methods here to handle CRUD operations like adding, updating, or deleting data from Firestore.
}
