import { Component, inject, input } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { ArticlesService } from '../../../services/articles-service';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';
import { AddArticleForm } from '../../components/add-article-form/add-article-form';
import { FormData } from '../../../models/types/form-data';
import { CreateArticle } from '../../../services/create-article';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel, Curtain, DialogStat, AddArticleForm],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  private createArticleService = inject(CreateArticle);
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  private articleService = inject(ArticlesService);
  protected outputArticles: Article[] = [];
  private quantity = 10;
  constructor() {
    this.outputArticles = this.articleService.get(this.quantity);
  }

  public changeVision(event: boolean) {
    this.visionChangedFlag = event;
  }

  public openForm(event: boolean) {
    this.openFormFlag = event;
  }

  public createNewArticle(data: FormData) {
    this.createArticleService.set(data);
    this.outputArticles.unshift(this.createArticleService.get());
  }
}
