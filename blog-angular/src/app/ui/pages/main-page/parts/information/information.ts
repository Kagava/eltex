import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';
import { Works } from './works/works';
import { ArticleComponent } from '../../../../components/article-component/article-component';
import { Article } from '../../../../../models/types/articles';
import { AddArticleForm } from '../../../../components/add-article-form/add-article-form';
import { FormData } from '../../../../../models/types/form-data';
import { ArticlesStorage } from '../../../../../services/articles-storage';
import { ArticleStorageService } from '../../../../../services/article-storage-service';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby, Works, ArticleComponent, AddArticleForm],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  private articleStorageService = inject(ArticleStorageService);
  private quantityArticles: number = 3;
  private formChild = viewChild<ElementRef>('form');

  protected storage = inject(ArticlesStorage);
  protected outputArticles: Article[] = [];

  public editArticleId: string = '';
  public editArticleData: FormData = { title: '', description: '', category: '' };
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;

  constructor() {}

  public removeArticle(id: string) {
    this.articleStorageService.removeArticle(id);
  }

  protected editArticle(data: FormData) {
    this.editFormFlag = true;
    this.openFormFlag = true;
    this.editArticleData = data;
    this.formChild()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  protected editLivingArticle(data: FormData) {
    for (let article of this.outputArticles) {
      if (article.id === data.id) {
        article.category = data.category;
        article.title = data.title;
        article.description = data.description;
      }
    }
    this.openFormFlag = false;
  }

  protected closeForm(flag: boolean) {
    if (flag) {
      this.openFormFlag = false;
    }
  }
}
