import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: DocumentData;

}
