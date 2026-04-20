import { Component, inject } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';
import { Works } from './works/works';
import { ArticleComponent } from '../../../../components/article-component/article-component';
import { RouterLink } from '@angular/router';
import { ArticlesService } from '../../../../../services/articles-service';
import { Article } from '../../../../../models/types/articles';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby, Works, ArticleComponent, RouterLink],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  protected articleService = inject(ArticlesService);
  private quantityArticles: number = 3;
  protected outputArticles: Article[] = [];
  constructor() {
    this.outputArticles = this.articleService.get(this.quantityArticles);
  }
  public removeArticle(id: string) {
    console.log('have to delete', id);
    const currentArticlesArray = this.outputArticles;
    for (let i = 0; i < currentArticlesArray.length; i += 1) {
      if (currentArticlesArray[i].id === id) {
        this.outputArticles.splice(i, 1);
      }
    }
  }
}
