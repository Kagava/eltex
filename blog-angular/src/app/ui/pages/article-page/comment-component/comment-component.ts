import { Component, input } from '@angular/core';
import { Comment } from '../../../../models/types/articles';
@Component({
  selector: 'app-comment-component',
  imports: [],
  templateUrl: './comment-component.html',
  styleUrl: './comment-component.scss',
})
export class CommentComponent {
  public comments = input<Comment[]>();
}
