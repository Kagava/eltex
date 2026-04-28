import { ChangeDetectorRef, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';
import { AddArticleForm } from '../../components/add-article-form/add-article-form';
import { FormData, FormDataString } from '../../../models/types/form-data';
import { CreateArticle } from '../../../services/create-article';
import { ArticleComponent } from '../../components/article-component/article-component';
import { ArticlesStorage } from '../../../services/articles-storage';
import { ArticleStorageService } from '../../../services/article-storage-service';

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
  public editArticleId: string = '';
  public editArticleData: FormData = { title: '', description: '', category: '' };
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;

  constructor() {}

  public changeVision(event: boolean) {
    this.visionChangedFlag = !event;
  }

  public openForm(event: boolean) {
    console.log(this.articles);
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
    this.articleStorageService.removeArticle(id);
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

  ngDoCheck() {
    this.dialogVisible = true;
  }
}
