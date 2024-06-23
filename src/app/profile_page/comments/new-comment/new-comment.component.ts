import { Component, Input, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss'
})
export class NewCommentComponent {
  activeModal = inject(NgbActiveModal);
  authService = inject(AuthServiceService);
  @Input() uid!: string;

  onSubmit(form: NgForm) {
    const visibility = form.value.visibility;
    const message = form.value.comment;

    // console.log(visibility);

    if (!form.valid) {
      return;
    }

    this.authService.addComment(message, this.uid, this.authService.currentUser!.displayName, visibility);

  }

}
