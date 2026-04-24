import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Career } from './career/career';
import { Hobby } from './hobby/hobby';
import { Works } from './works/works';
import { ArticleComponent } from '../../../../components/article-component/article-component';
import { ArticlesService } from '../../../../../services/articles-service';
import { Article } from '../../../../../models/types/articles';
import { AddArticleForm } from '../../../../components/add-article-form/add-article-form';
import { FormData, FormDataString } from '../../../../../models/types/form-data';

@Component({
  selector: 'app-information',
  imports: [Career, Hobby, Works, ArticleComponent, AddArticleForm],
  templateUrl: './information.html',
  styleUrl: './information.scss',
})
export class Information {
  private quantityArticles: number = 3;
  private formChild = viewChild<ElementRef>('form');

  protected articleService = inject(ArticlesService);
  protected outputArticles: Article[] = [];

  public editArticleId: string = '';
  public editArticleData: FormData = { title: '', description: '', category: '' };
  public visionChangedFlag: boolean = true;
  public openFormFlag: boolean = false;
  public editFormFlag: boolean = false;

  constructor() {
    this.outputArticles = this.articleService.get(this.quantityArticles);
  }

  public removeArticle(id: string) {
    const currentArticlesArray = this.outputArticles;
    for (let i = 0; i < currentArticlesArray.length; i += 1) {
      if (currentArticlesArray[i].id === id) {
        this.outputArticles.splice(i, 1);
      }
    }
  }

  public openForm(event: boolean) {
    this.editArticleId = '';
    this.editArticleData = { title: '', description: '', category: '' };
    this.editFormFlag = false;
    this.openFormFlag = event;
  }

  protected editArticle(data: FormDataString) {
    console.log('EDITING');
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
}
