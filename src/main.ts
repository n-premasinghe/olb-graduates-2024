/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAnHkStZ1XqcKA0Fwp7ZgOBnDiDvPKdyhs",
//   authDomain: "olb-graduates-2024.firebaseapp.com",
//   projectId: "olb-graduates-2024",
//   storageBucket: "olb-graduates-2024.appspot.com",
//   messagingSenderId: "512231971033",
//   appId: "1:512231971033:web:3524cb9bbb4a4a564206c8",
//   measurementId: "G-0B405Y03JE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);