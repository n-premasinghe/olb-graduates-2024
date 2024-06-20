import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  authService = inject(AuthServiceService)
  onSubmit(form: NgForm) {
    const displayName = form.value.displayName;
    const gradQuote = form.value.gradQuote;

    if (!form.valid) {
      return
    }

    this.authService.addDisplayName(displayName, gradQuote);

    // this.authService.addUser()

  }

}
