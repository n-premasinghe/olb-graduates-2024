import { Component, Input, OnInit, inject, input } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { AsyncPipe } from '@angular/common';
import { AuthServiceService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';
import { DocumentData, collection, collectionData, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentComponent, NewCommentComponent, AsyncPipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  private modalService = inject(NgbModal);
  authService = inject(AuthServiceService);

  @Input({ required: true }) uid!: string;
  commentsPublic$!: Observable<DocumentData[]>;
  commentsClassOnly$!: Observable<DocumentData[]>;
  commentsPrivate$!: Observable<DocumentData[]>;

  ngOnInit(): void {
    this.commentsPublic$ = this.authService.loadComments(this.uid, 'public');
    this.commentsClassOnly$ = this.authService.loadComments(this.uid, 'classOnly');
    this.commentsPrivate$ = this.authService.loadComments(this.uid, 'private');
    // console.log(this.commentsPublic$);
  }


  open() {
    const modalRef = this.modalService.open(NewCommentComponent);
    modalRef.componentInstance.uid = this.uid;
  }

  

}
