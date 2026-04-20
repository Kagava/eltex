import { Component, input, output } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-article-component',
  imports: [RouterLink],
  templateUrl: './article-component.html',
  styleUrl: './article-component.scss',
})
export class ArticleComponent {
  public articleArray = input<Article[]>();
  public articleToDelete = output<string>();
  public articlePage = input<boolean>();
  removeArticle(id: string) {
    this.articleToDelete.emit(id);
  }
}
