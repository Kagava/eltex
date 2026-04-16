import { Component, inject } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { ArticlesService } from '../../../services/articles-service';
import { AdminPanel } from '../../components/admin-panel/admin-panel';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  private articleService = inject(ArticlesService);
  protected outputArticles: Article[] = [];
  private quantity = 10;
  constructor() {
    this.outputArticles = this.articleService.get(this.quantity);
  }
}
