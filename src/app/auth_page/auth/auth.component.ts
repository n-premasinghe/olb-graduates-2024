import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule, NgForm } from '@angular/forms';

import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ForgotPasswordComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  authService = inject(AuthServiceService);
  user$ = this.authService.user$;

  isLoginMode = true;
  isForgotPassword = false;

  onForgotPassword(){
    this.isForgotPassword = true;
  }

  onCancelForgotPassword() {
    this.isForgotPassword = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (!form.valid) {
      return;
    }

    if (this.isLoginMode) {
      this.authService.login(email, password);
    } else {
      this.authService.signUpEmail(email, password);
    }

    form.reset();
  }
}
