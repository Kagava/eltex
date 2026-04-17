import { Component, inject, output } from '@angular/core';
import { ArticlesService } from '../../../../../../services/articles-service';
import { Article } from '../../../../../../models/types/articles';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles',
  imports: [RouterLink],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  protected articleService = inject(ArticlesService);
  private quantityArticles: number = 3;
  protected outputArticles: Article[] = [];
  constructor() {
    this.outputArticles = this.articleService.get(this.quantityArticles);
    console.log(this.outputArticles);
    for (let article of this.outputArticles) {
      console.log(article.id);
    }
  }
}
