import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';
import { AddArticleForm } from '../../components/add-article-form/add-article-form';
import { FormData } from '../../../models/types/form-data';
import { CreateArticle } from '../../../services/create-article';
import { ArticleComponent } from '../../components/article-component/article-component';
import { ArticlesStorage } from '../../../services/articles-storage';
import { PagginationButton } from '../../components/paggination-button/paggination-button';
import { ARTICLE_STORAGE_SERVISE } from '../../../tokens/article-storage-servic-token';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel, Curtain, DialogStat, AddArticleForm, ArticleComponent, PagginationButton],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  private articleStorageService = inject(ARTICLE_STORAGE_SERVISE);
  private formChild = viewChild<ElementRef>('form');
  private createArticleService = inject(CreateArticle);
  private quantityArticles = 7;

  protected storage = inject(ArticlesStorage);
  protected dialogVisible: boolean = false;
  protected outputArticles: Article[] = [];

  public articles: Article[] = [];
  public editArticleData: FormData | null = null;
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;
  public isEndOfPage = true;
  public isBeginOfPage = true;

  constructor() {
    effect(() => {
      if (this.storage.articleStorage()) {
        this.countButtonFlags(this.storage.articlePage());
      }
    });
  }

  public changeVision(event: boolean) {
    this.visionChangedFlag = !event;
  }

  public createNewArticle(data: FormData) {
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

  protected changingPage(direction: boolean) {
    const articles = this.storage.articleStorage().length;
    const currentPage = this.storage.articlePage();
    if (direction) {
      if (currentPage < Math.floor(articles / this.quantityArticles)) {
        this.storage.incrementArticlePage();
      }
    } else {
      if (currentPage > 0) {
        this.storage.decrementArticlePage();
      }
    }
    this.countButtonFlags(this.storage.articlePage());
  }

  ngOnInit() {
    const tempArticlePage = this.storage.articlePage();
    this.countButtonFlags(tempArticlePage);
  }

  private countButtonFlags(currentPage: number) {
    const articles = this.storage.articleStorage().length;
    if (currentPage !== 0) {
      this.isBeginOfPage = false;
    } else {
      this.isBeginOfPage = true;
    }
    console.log(currentPage, Math.ceil(articles / this.quantityArticles));
    if (currentPage + 1 === Math.ceil(articles / this.quantityArticles)) {
      this.isEndOfPage = true;
    } else {
      this.isEndOfPage = false;
    }
  }
}
