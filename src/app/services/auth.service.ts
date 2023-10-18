import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from 'firebase/auth'; // Import the User type

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null;

  constructor(private afs: AngularFireAuth) {
    this.user = null;
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await this.afs.signInWithPopup(provider);
    } catch (error) {
      throw error;
    }
  }

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const users = await this.afs.fetchSignInMethodsForEmail(email);
      return users.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await this.afs.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async signUpWithEmailAndPassword(email: string, password: string) {
    try {
      await this.afs.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }
}
