import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  selectedSegment: string = 'application';
  selectedValue: string = 'all';

  public data: Item[] = [];
  public results: Item[] = [];
  public pet: Item | null = null;

  constructor(private route: ActivatedRoute, 
              private navCtrl: NavController, 
              private firestoreService: FirestoreService )
              {}

  ngOnInit() {
    console.log('ClientPage ngOnInit');
    this.route.paramMap.subscribe((params) => {
      const petIdString = params.get('id');
      if (petIdString !== null) {
        const petId = +petIdString;
        if (!isNaN(petId)) {
          // Convert the ID to a number or set to null if conversion fails
          this.pet = this.data.find((pet) => pet.id === petId) || null;
        }
      }
    });

    this.firestoreService.items$.subscribe((data) => {
    this.data = data;
    this.results = [...this.data];
      });
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
