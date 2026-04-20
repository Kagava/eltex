import { Component, input, output } from '@angular/core';
import { Article } from '../../../models/types/articles';
@Component({
  selector: 'app-article-component',
  imports: [],
  templateUrl: './article-component.html',
  styleUrl: './article-component.scss',
})
export class ArticleComponent {
  public articleArray = input<Article[]>();
  public articleToDelete = output<string>();
  removeArticle(id: string) {
    this.articleToDelete.emit(id);
  }
}
