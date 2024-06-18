import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth_page/auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  authService = inject(AuthServiceService);

  title = 'olb-graduates-2024';
}
