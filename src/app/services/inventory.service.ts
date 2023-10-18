import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://api.example.com/inventory';

  constructor(private http: HttpClient) { }

  getInventory() {
    return this.http.get(this.apiUrl);
  }

  addPet(pet: any) {
    return this.http.post(this.apiUrl, pet);
  }

  deletePet(petId: string) {
    return this.http.delete(`${this.apiUrl}/${petId}`);
  }
}

