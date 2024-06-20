import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { HeaderComponent } from '../../header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthServiceService);
  user$ = this.authService.user$;
  users$ = this.authService.loadUsers() as Observable<DocumentData[]>;

  

  // users = this.authService.

}
