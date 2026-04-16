import { Component, input } from '@angular/core';

@Component({
  selector: 'app-add-article-form',
  imports: [],
  templateUrl: './add-article-form.html',
  styleUrl: './add-article-form.scss',
})
export class AddArticleForm {
  public toggleForm = input<boolean>();
}
