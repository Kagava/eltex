import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleStorage } from '../../../../services/article/article-srotage';
import { ARTICLE_REPOSITORY_STORAGE } from '../../../../tokens/article-repository-storage-token';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-comment-component',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './comment-component.html',
  styleUrl: './comment-component.scss',
})
export class CommentComponent {
  private fb = inject(NonNullableFormBuilder);
  private articleStorage = inject(ArticleStorage);
  private articleRepository = inject(ARTICLE_REPOSITORY_STORAGE);
  protected currentArticle = computed(() => this.articleStorage.articleInfo());
  public comments = computed(() => this.currentArticle()?.comments);

  public form = this.fb.group({
    name: ['', Validators.required],
    comment: ['', Validators.required],
  });

  protected commentRatingDown(id: number) {
    this.articleRepository.updateArticleComments(id, -1);
  }
  protected commentRatingUp(id: number) {
    this.articleRepository.updateArticleComments(id, 1);
  }

  protected submitForm() {
    this.articleRepository.addComment(this.form.getRawValue());
    this.form.reset();
  }

  protected hasError(controlName: string) {
    const control = this.form.get(controlName);
    const isValid = control?.invalid && control.touched;
    return Boolean(isValid);
  }

  protected getControlErrors(controlName: string) {
    const control = this.form.get(controlName);
    const errors: Record<string, unknown> | null = control?.errors ?? null;
    if (errors) {
      const errorsArray: string[] = [];
      Object.entries(errors).forEach(([errorType, errorValue]) => {
        errorsArray.push(this.errorMassege(errorType, errorValue));
      });
      return errorsArray;
    }
    return [];
  }
  private errorMassege(errorType: string, errorValue: unknown) {
    switch (errorType) {
      case 'required':
        return 'Поле обязательно для заполнения';
      case 'minlength':
        const { requiredLength, actualLength } = errorValue as {
          requiredLength: number;
          actualLength: number;
        };
        return `Нужно еще ${requiredLength - actualLength} символов`;
      default:
        return 'Ошибка заполнение поля';
    }
  }
}
