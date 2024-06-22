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
  getAdditionalUserInfo,
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
  where,
  getDocs,
  doc,
} from '@angular/fire/firestore';

import { AsyncPipe } from '@angular/common';

type gradUser = {
  name: string | null;
  uid: string | null;
  profilePicUrl: string | null;
  gradQuote: string | null;
};

type Comment = {
  uid: string;
  name: string | null;
  message: string;
};

import { Router } from '@angular/router';
import {
  Subscription,
  map,
  switchMap,
  filter,
  Observable,
  flatMap,
  mergeMap,
} from 'rxjs';

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
      const userInfo = getAdditionalUserInfo(result);

      console.log(userInfo?.isNewUser);

      // this.addUser(user.displayName, user.uid, user.photoURL);

      if (userInfo?.isNewUser) {
        this.router.navigate(['/', 'update-profile']);
      } else {
        this.router.navigate(['/', 'home']);
      }

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

  // getSelectedUser(uid: string): Observable<DocumentData | null> {

  //   const users$ = this.loadUsers() as Observable<DocumentData[]>;

  //   return users$.pipe(
  //     map(users => {
  //       for (const user of users) {
  //         console.log(user);
  //         if (user['uid'] === uid) {
  //           console.log(user);
  //           return user;
  //         }
  //       }
  //       return null;
  //     })
  //   )

  // };

  // Excess info functions
  addDisplayName(name: string, gradQuote: string) {
    updateProfile(this.currentUser!, {
      displayName: name,
    }).then(() => {
      this.addUser(
        this.currentUser!.displayName,
        this.currentUser!.uid,
        null,
        gradQuote
      );
    });
    this.router.navigate(['/', 'home']);
  }

  // update users in firestore
  // updateUser = async (
  //   userName: string | null,
  //   uid: string | null,
  //   imageUrl: string | null,
  //   gradQuote: string | null
  // ): Promise<void | DocumentReference<DocumentData>> => {

  //   if (!userName && !imageUrl && !gradQuote) {
  //     console.log('addUser called without name, pfp, or quote');
  //     return;
  //   }

  //   if (this.currentUser === null) {
  //     console.log('add user requires user');
  //     return;
  //   }

  //   const user: gradUser = {
  //     name: this.currentUser.displayName,
  //     profilePicUrl: this.currentUser.photoURL,
  //     uid: this.currentUser.uid,
  //     gradQuote: gradQuote,
  //   };

  //   userName && (user.name = userName);
  //   uid && (user.uid = uid);
  //   imageUrl && (user.profilePicUrl = imageUrl);
  //   gradQuote && (user.gradQuote = gradQuote);

  //   try {
  //     const newUserRef = await setDoc(doc(this.firestore, 'users', uid!), user);
  //     return newUserRef;
  //   } catch (error) {
  //     console.error('Error writing user to Firestore', error);
  //     return;
  //   }
  // };

  // add users to firestore
  addUser = async (
    userName: string | null,
    uid: string | null,
    imageUrl: string | null,
    gradQuote: string | null
  ): Promise<void | DocumentReference<DocumentData>> => {
    const users$ = this.loadUsers() as Observable<DocumentData[]>;

    if (!userName && !imageUrl && !gradQuote) {
      console.log('addUser called without name, pfp, or quote');
      return;
    }

    if (this.currentUser === null) {
      console.log('add user requires user');
      return;
    }

    if (this.currentUser.uid != uid) {
      return;
    }

    const user: gradUser = {
      name: this.currentUser.displayName,
      profilePicUrl: this.currentUser.photoURL,
      uid: this.currentUser.uid,
      gradQuote: gradQuote,
    };

    userName && (user.name = userName);
    uid && (user.uid = uid);
    imageUrl && (user.profilePicUrl = imageUrl);
    gradQuote && (user.gradQuote = gradQuote);

    try {
      const newUserRef = await setDoc(doc(this.firestore, 'users', uid!), user);
      return newUserRef;
    } catch (error) {
      console.error('Error writing user to Firestore', error);
      return;
    }
  };

  // Load users
  loadUsers = () => {
    const usersQuery = query(collection(this.firestore, 'users'));

    return collectionData(usersQuery);
  };

  addComment = async (message: string, uid: string, name: string | null, visibility: string) => {

    const comment: Comment = {
      message: message,
      uid: this.currentUser!.uid,
      name: name,
    }

    try {
      const commentRef = await setDoc(doc(this.firestore, 'users', uid, 'comments', visibility), comment);
      return commentRef
    } catch (error) {
      console.error('error adding comment', error);
    }
  };

  loadComments = (uid: string) => {
    const commentQuery = query(collection(this.firestore, 'users', uid, 'comments'));

    return collectionData(query);
  }



}
