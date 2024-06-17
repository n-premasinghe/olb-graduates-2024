import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoginMode = true;
  
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authService = inject(AuthServiceService);
  user$ = this.authService.user$;
}
