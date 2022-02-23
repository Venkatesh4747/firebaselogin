import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth
  ) { }

  async register({email, password}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user
    } catch(e) {
      return null
    }
  }
  async login({email, password}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user
    } catch(e) {
      return null
    }
  }

  logout() {
    return signOut(this.auth);
  }
}
