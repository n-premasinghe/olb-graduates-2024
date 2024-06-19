import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { HeaderComponent } from '../../header/header.component';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthServiceService);
  user$ = this.authService.user$;
}
