import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { ArticlesService } from '../../../services/articles-service';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';
import { AddArticleForm } from '../../components/add-article-form/add-article-form';
import { FormData, FormDataString } from '../../../models/types/form-data';
import { CreateArticle } from '../../../services/create-article';
import { ArticleComponent } from '../../components/article-component/article-component';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel, Curtain, DialogStat, AddArticleForm, ArticleComponent],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  private formChild = viewChild<ElementRef>('form');
  private createArticleService = inject(CreateArticle);
  private articleService = inject(ArticlesService);
  private quantity = 10;

  protected dialogVisible: boolean = false;
  protected outputArticles: Article[] = [];

  public editArticleId: string = '';
  public editArticleData: FormData = { title: '', description: '', category: '' };
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;

  constructor() {
    this.outputArticles = this.articleService.get(this.quantity);
  }

  public changeVision(event: boolean) {
    this.visionChangedFlag = !event;
  }

  public openForm(event: boolean) {
    this.editArticleId = '';
    this.editArticleData = { title: '', description: '', category: '' };
    this.editFormFlag = false;
    this.openFormFlag = event;
  }

  public createNewArticle(data: FormData) {
    this.createArticleService.set(data);
    this.outputArticles.unshift(this.createArticleService.get());
  }

  public removeArticle(id: string) {
    const currentArticlesArray = this.outputArticles;
    for (let i = 0; i < currentArticlesArray.length; i += 1) {
      if (currentArticlesArray[i].id === id) {
        this.outputArticles.splice(i, 1);
      }
    }
  }

  protected editArticle(data: FormDataString) {
    this.editFormFlag = true;
    this.openFormFlag = true;
    this.editArticleData = data.data;
    this.editArticleId = data.id;
    this.formChild()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  protected editLivingArticle(data: FormDataString) {
    for (let article of this.outputArticles) {
      if (article.id === data.id) {
        article.category = data.data.category;
        article.title = data.data.title;
        article.description = data.data.description;
      }
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.dialogVisible = true;
    }, 0);
  }
}
