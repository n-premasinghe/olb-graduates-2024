import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'olb-graduates-2024',
        appId: '1:512231971033:web:3524cb9bbb4a4a564206c8',
        databaseURL: 'https://olb-graduates-2024-default-rtdb.firebaseio.com',
        storageBucket: 'olb-graduates-2024.appspot.com',
        apiKey: 'AIzaSyAnHkStZ1XqcKA0Fwp7ZgOBnDiDvPKdyhs',
        authDomain: 'olb-graduates-2024.firebaseapp.com',
        messagingSenderId: '512231971033',
        measurementId: 'G-0B405Y03JE',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
