import { Component, computed, inject, input, output } from '@angular/core';
import { Article } from '../../../models/types/articles';
import { RouterLink, Router } from '@angular/router';
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
  private router = inject(Router);

  protected storage = inject(ArticlesStorage);
  protected mainPage = computed(() => this.storage.mainPage() * 3);
  protected articlePage = computed(() => this.storage.articlePage() * 7);

  public articleArray = input<Article[]>();
  public articleToDelete = output<string>();
  public articlePageFlag = input<boolean>();
  public isEditFormOpenFlag = output<FormData>();

  removeArticle(e: MouseEvent, id: string) {
    e.stopPropagation();
    this.formService.formClose();
    this.articleToDelete.emit(id);
  }
  protected openEditForm(e: MouseEvent, data: FormData) {
    e.stopPropagation();
    this.formService.formEdit();
    this.formService.formOpen();
    this.isEditFormOpenFlag.emit({ ...data });
  }
  protected onArticleClick(id: string) {
    // this.router.navigateByUrl(`articles/${id}`);
  }
}
