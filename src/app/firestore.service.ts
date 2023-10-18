import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  getPetById(petId: number): import("./client/client.page").Item | null {
    throw new Error('Method not implemented.');
  }
  private itemsCollection: AngularFirestoreCollection<any>;
  items$: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items'); // Replace 'pets' with your Firestore collection name.
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      map((actions) => actions.map((a) => ({ id: a.payload.doc.id, ...a.payload.doc.data() })))
    );
  }

  addItemWithId(item: any, id: string): Promise<void> {
    return this.itemsCollection.doc(id).set(item);
  }
  // Add more methods here to handle CRUD operations like adding, updating, or deleting data from Firestore.
}
