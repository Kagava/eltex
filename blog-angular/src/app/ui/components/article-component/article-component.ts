import { Component, input, output } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { RouterLink } from '@angular/router';
import { FormData, FormDataString } from '../../../models/types/form-data';

@Component({
  selector: 'app-article-component',
  imports: [RouterLink],
  templateUrl: './article-component.html',
  styleUrl: './article-component.scss',
})
export class ArticleComponent {
  public articleArray = input<Article[]>();
  public articleToDelete = output<string>();
  public articlePage = input<boolean>();
  public isEditFormOpenFlag = output<FormDataString>();

  removeArticle(id: string) {
    this.articleToDelete.emit(id);
  }
  protected openEditForm(data: FormData, id: string) {
    this.isEditFormOpenFlag.emit({ data, id });
  }
}
