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
  updateCurrentUser,
  updateProfile,
} from '@angular/fire/auth';

import {
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  deleteDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  DocumentData,
  FieldValue,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';

type gradUser = {
  name: string | null;
  uid: string | null;
  profilePicUrl: string | null;
};

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

  firestore: Firestore = inject(Firestore);
  // storage: Storage = inject(Storage);

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
    });
  }

  // Authentication Functions
  signUpEmail(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed up
        const user = userCredential.user;
        if (!user.displayName) {
          this.router.navigate(['/', 'update-profile']);
        } else {
          this.router.navigate(['/', 'home']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loginPopup() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      // add user to db
      this.addUser(user.displayName, user.uid, user.photoURL);

      this.router.navigate(['/', 'home']);
      return credential;
    });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // signed in
        const user = userCredential.user;

        // usersList = query(collection(this.firestore, 'users'), )

        if (!user.displayName) {
          this.router.navigate(['/', 'update-profile']);
        } else {
          this.router.navigate(['/', 'home']);
        }
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

  // Excess info functions
  addDisplayName(name: string) {
    updateProfile(this.currentUser!, {
      displayName: name,
    }).then(() => {
      this.addUser(this.currentUser!.displayName, this.currentUser!.uid, null)
      this.router.navigate(['/', 'home']);
    });
  }

  // add users to firestore
  addUser = async (
    userName: string | null,
    uid: string | null,
    imageUrl: string | null
  ): Promise<void | DocumentReference<DocumentData>> => {
    if (!userName && !imageUrl) {
      console.log('addUser called without name or pfp');
      return;
    }

    if (this.currentUser === null) {
      console.log('add user requires user');
      return;
    }

    const user: gradUser = {
      name: this.currentUser.displayName,
      profilePicUrl: this.currentUser.photoURL,
      uid: this.currentUser.uid,
    };

    userName && (user.name = userName);
    uid && (user.uid = uid);
    imageUrl && (user.profilePicUrl = imageUrl);

    try {
      const newUserRef = await addDoc(
        collection(this.firestore, 'users'),
        user
      );
      return newUserRef;
    } catch (error) {
      console.error('Error writing user to Firestore', error);
      return;
    }
  };

  // Load users
  loadUsers = () => {
    const usersQuery = query(collection(this.firestore, 'users'))

    return collectionData(usersQuery);
  }


}
