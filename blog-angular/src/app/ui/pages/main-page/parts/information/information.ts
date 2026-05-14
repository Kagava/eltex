import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';
import { Works } from './works/works';
import { ArticleComponent } from '../../../../components/article-component/article-component';
import { Article } from '../../../../../models/types/articles';
import { AddArticleForm } from '../../../../components/add-article-form/add-article-form';
import { articleFormData } from '../../../../../models/types/form-data';
import { ArticlesStorage } from '../../../../../services/articles-storage';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from '../../../../../tokens/article-local-storage-service';
import { PagginationButton } from '../../../../components/paggination-button/paggination-button';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby, Works, ArticleComponent, AddArticleForm, PagginationButton],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  private articleStorageService = inject(ARTICLE_LOCAL_STORAGE_SERVICE);
  private quantityArticles: number = 3;
  private formChild = viewChild<ElementRef>('form');

  private storage = inject(ArticlesStorage);

  protected articlesStorage = computed(() => this.storage.articleStorage());
  protected outputArticles: Article[] = [];

  public isEndOfPage = true;
  public isBeginOfPage = true;
  public editArticleId: string = '';
  public editArticleData: articleFormData = { title: '', description: '', category: '' };
  public visionChangedFlag: boolean = true;

  constructor() {}

  public removeArticle(id: string) {
    this.articleStorageService.removeArticle(id);
  }

  protected openEditArticleForm(data: articleFormData) {
    this.editArticleData = data;
    this.formChild()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  protected updateArticle(data: articleFormData) {
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
