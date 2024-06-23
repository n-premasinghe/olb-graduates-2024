import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { DocumentData } from '@angular/fire/firestore';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: DocumentData;
  @Output() userSelected = new EventEmitter<DocumentData>();

  authService = inject(AuthServiceService);


}
