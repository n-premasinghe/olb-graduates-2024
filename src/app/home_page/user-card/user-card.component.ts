import { Component, Input, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: DocumentData
  authService = inject(AuthServiceService);


}
