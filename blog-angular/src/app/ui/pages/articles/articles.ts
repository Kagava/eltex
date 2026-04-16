import { Component, inject, input } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { ArticlesService } from '../../../services/articles-service';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel, Curtain, DialogStat],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  public visionChangedFlag: boolean = true;
  private articleService = inject(ArticlesService);
  protected outputArticles: Article[] = [];
  private quantity = 10;
  constructor() {
    this.outputArticles = this.articleService.get(this.quantity);
  }

  public changeVision(event: boolean) {
    this.visionChangedFlag = event;
  }
}
