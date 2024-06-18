import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription, map, switchMap, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  private provider = new GoogleAuthProvider();

  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
    });
  }

  signUpEmail(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed up
        const user = userCredential.user;
        this.router.navigate(['/', 'home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loginPopup() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/', 'home']);
      return credential;
    });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;
        this.router.navigate(['/', 'home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/', 'login']);
        console.log('signed out');
      })
      .catch((error) => {
        console.log('sign out error: ' + error);
      });
  }

  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email)
    .then(() => {
      this.router.navigate(['/', 'login']);
      console.log('Password Reset Sent!');
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
