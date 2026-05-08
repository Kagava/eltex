import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';
import { Works } from './works/works';
import { ArticleComponent } from '../../../../components/article-component/article-component';
import { Article } from '../../../../../models/types/articles';
import { AddArticleForm } from '../../../../components/add-article-form/add-article-form';
import { FormData } from '../../../../../models/types/form-data';
import { ArticlesStorage } from '../../../../../services/articles-storage';
import { ARTICLE_STORAGE_SERVISE } from '../../../../../tokens/article-storage-servic-token';
import { PagginationButton } from '../../../../components/paggination-button/paggination-button';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby, Works, ArticleComponent, AddArticleForm, PagginationButton],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  private articleStorageService = inject(ARTICLE_STORAGE_SERVISE);
  private quantityArticles: number = 3;
  private formChild = viewChild<ElementRef>('form');

  private storage = inject(ArticlesStorage);

  protected articlesStorage = this.storage.articleStorage();
  protected outputArticles: Article[] = [];

  public isEndOfPage = true;
  public isBeginOfPage = true;
  public editArticleId: string = '';
  public editArticleData: FormData = { title: '', description: '', category: '' };
  public visionChangedFlag: boolean = true;

  constructor() {}

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

  protected changingPage(direction: boolean) {
    const articles = this.storage.articleStorage().length;
    const currentPage = this.storage.mainPage();
    if (direction) {
      if (currentPage < Math.floor(articles / this.quantityArticles)) {
        this.storage.incrementMainPage();
      }
    } else {
      if (currentPage > 0) {
        this.storage.decrementMainPage();
      }
    }
    this.countButtonFlags(this.storage.mainPage());
  }

  ngOnInit() {
    const tempMainPage = this.storage.mainPage();
    this.countButtonFlags(tempMainPage);
  }

  private countButtonFlags(currentPage: number) {
    const articles = this.storage.articleStorage().length;
    if (currentPage !== 0) {
      this.isBeginOfPage = false;
    } else {
      this.isBeginOfPage = true;
    }
    if (currentPage + 1 === Math.ceil(articles / this.quantityArticles)) {
      this.isEndOfPage = true;
    } else {
      this.isEndOfPage = false;
    }
  }
}
