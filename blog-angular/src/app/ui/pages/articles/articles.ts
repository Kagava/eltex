import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  viewChild,
} from '@angular/core';
import { Article } from '../../../models/types/articles';
import { AdminPanel } from '../../components/admin-panel/admin-panel';
import { Curtain } from '../../components/curtain/curtain';
import { DialogStat } from '../../components/dialog-stat/dialog-stat';
import { AddArticleForm } from '../../components/add-article-form/add-article-form';
import { articleFormData } from '../../../models/types/form-data';
import { CreateArticle } from '../../../utils/create-article';
import { ArticleComponent } from '../../components/article-component/article-component';
import { ArticlesStorage } from '../../../services/articles-storage';
import { PagginationButton } from '../../components/paggination-button/paggination-button';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from '../../../tokens/article-local-storage-service';

@Component({
  selector: 'app-articles',
  imports: [AdminPanel, Curtain, DialogStat, AddArticleForm, ArticleComponent, PagginationButton],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  private articleStorageService = inject(ARTICLE_LOCAL_STORAGE_SERVICE);
  private formChild = viewChild<ElementRef>('form');
  private quantityArticles = 7;
  private storage = inject(ArticlesStorage);

  protected storageArticles = computed(() => this.storage.articleStorage());
  protected dialogVisible: boolean = false;
  protected outputArticles: Article[] = [];

  public articles: Article[] = [];
  public editArticleData: articleFormData | null = null;
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;
  public isEndOfPage = true;
  public isBeginOfPage = true;

  constructor(private injector: Injector) {
    effect(() => {
      if (this.storage.articleStorage()) {
        this.countButtonFlags(this.storage.articlePage());
      }
    });
  }

  public changeVision(event: boolean) {
    this.visionChangedFlag = !event;
  }

  public createNewArticle(data: articleFormData) {
    const article = CreateArticle.createArticle(data);
    this.articleStorageService.addArticle(article);
  }

  public removeArticle(id: string) {
    this.articleStorageService.removeArticle(id);
  }

  protected openEditArticleForm(data: articleFormData) {
    this.editArticleData = data;
    this.openForm();
  }

  protected updateArticle(data: articleFormData) {
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
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.storage.articleStorage()) {
          const tempMainPage = this.storage.mainPage();
          this.countButtonFlags(tempMainPage);
        }
      });
    });
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

  protected openForm() {
    this.formChild()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
