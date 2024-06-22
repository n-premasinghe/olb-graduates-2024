import { Component, Input, inject } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { AsyncPipe } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, NewCommentComponent, AsyncPipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  private modalService = inject(NgbModal);
  authService = inject(AuthServiceService);

  // @Input() uid!: string

  // comments$ = this.authService.loadComments(this.uid) as Observable<DocumentData>

  open() {
    this.modalService.open(NewCommentComponent);
  }

  

}
