import { Component, computed, inject, input, output } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { RouterLink } from '@angular/router';
import { FormData } from '../../../models/types/form-data';
import { FormService } from '../../../services/form-service';
import { ArticlesStorage } from '../../../services/articles-storage';

@Component({
  selector: 'app-article-component',
  imports: [RouterLink],
  templateUrl: './article-component.html',
  styleUrl: './article-component.scss',
})
export class ArticleComponent {
  private formService = inject(FormService);

  protected storage = inject(ArticlesStorage);
  protected mainPage = computed(() => this.storage.mainPage() * 3);

  public articleArray = input<Article[]>();
  public articleToDelete = output<string>();
  public articlePage = input<boolean>();
  public isEditFormOpenFlag = output<FormData>();

  removeArticle(id: string) {
    this.formService.formClose();
    this.articleToDelete.emit(id);
  }
  protected openEditForm(data: FormData) {
    console.log(data);
    this.formService.formEdit();
    this.formService.formOpen();
    this.isEditFormOpenFlag.emit({ ...data });
  }
}
