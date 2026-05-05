import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-article-page',
  imports: [],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
})
export class ArticlePage {
  private activeRouter = inject(ActivatedRoute);
  private destroyRef$ = inject(DestroyRef);
  protected articleId: string = '';

  constructor() {}

  ngOnInit() {
    this.activeRouter.params
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((obj) => (this.articleId = obj['id']));
  }
}
