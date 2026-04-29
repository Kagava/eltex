import { Component, inject, input, output } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { RouterLink } from '@angular/router';
import { FormData } from '../../../models/types/form-data';
import { FormService } from '../../../services/form-service';

@Component({
  selector: 'app-article-component',
  imports: [RouterLink],
  templateUrl: './article-component.html',
  styleUrl: './article-component.scss',
})
export class ArticleComponent {
  private formService = inject(FormService);

  public articleArray = input<Article[]>();
  public articleToDelete = output<string>();
  public articlePage = input<boolean>();
  public isEditFormOpenFlag = output<FormData>();

  removeArticle(id: string) {
    this.articleToDelete.emit(id);
  }
  protected openEditForm(data: FormData) {
    console.log(data);
    this.formService.formEdit();
    this.formService.formOpen();
    this.isEditFormOpenFlag.emit({ ...data });
  }
}
