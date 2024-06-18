import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  authService = inject(AuthServiceService)

  @Output() cancel = new EventEmitter<void>()

  onCancel() {
    this.cancel.emit();
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;

    this.authService.forgotPassword(email);

    form.reset();
  }


}
