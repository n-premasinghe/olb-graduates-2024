import { Component, inject, Input, OnInit } from '@angular/core';
import { collection, doc, DocumentData, getDoc, query } from '@angular/fire/firestore';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent{
  authService = inject(AuthServiceService);

  @Input() uid!: string;

  users$ = this.authService.loadUsers() as Observable<DocumentData[]>

  userDB$ = this.users$.pipe(
    map(users => {
      for (const user of users) {
        console.log(user);
        if (user['uid'] === this.uid) {
          console.log(user);
          return user;
        }
      }
      return null;
    }))

  // userDB$ = this.authService.getSelectedUser(this.uid2);


}