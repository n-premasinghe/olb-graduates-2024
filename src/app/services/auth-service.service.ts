import { Injectable, inject } from '@angular/core';
import { Auth, User, authState, signInWithEmailAndPassword, signInWithPopup, signOut, user, getAuth, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription, map, switchMap, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
    })
  }

  loginPopup() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/', 'home']);
      return credential;
    })
  }

  login() { }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/', 'login'])
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }

}
