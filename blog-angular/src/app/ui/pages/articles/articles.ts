import { ChangeDetectorRef, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';
import { AddArticleForm } from '../../components/add-article-form/add-article-form';
import { FormData } from '../../../models/types/form-data';
import { CreateArticle } from '../../../services/create-article';
import { ArticleComponent } from '../../components/article-component/article-component';
import { ArticlesStorage } from '../../../services/articles-storage';
import { ArticleStorageService } from '../../../services/article-storage-service';
import { FormService } from '../../../services/form-service';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel, Curtain, DialogStat, AddArticleForm, ArticleComponent],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  private articleStorageService = inject(ArticleStorageService);
  private formChild = viewChild<ElementRef>('form');
  private createArticleService = inject(CreateArticle);
  private quantity = 10;

  protected storage = inject(ArticlesStorage);
  protected dialogVisible: boolean = false;
  protected outputArticles: Article[] = [];

  public articles: Article[] = [];
  public editArticleData: FormData | null = null;
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;

  constructor() {}

  public changeVision(event: boolean) {
    this.visionChangedFlag = !event;
  }

  public createNewArticle(data: FormData) {
    console.log('HELLNO');
    const article: Article = this.createArticleService.get(data);
    this.articleStorageService.addArticle(article);
  }

  public removeArticle(id: string) {
    this.articleStorageService.removeArticle(id);
  }

  protected openEditArticleForm(data: FormData) {
    this.editArticleData = data;
    this.formChild()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  protected updateArticle(data: FormData) {
    this.articleStorageService.updateArticle(data);
  }

  ngDoCheck() {
    this.dialogVisible = true;
  }
}
