import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleSrotage } from '../../../services/article/article-srotage';
import { ARTICLE_REPOSITORY_STORAGE } from '../../../tokens/article-repository-storage-token';
@Component({
  selector: 'app-article-page',
  imports: [],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
})
export class ArticlePage {
  private articleStorage = inject(ArticleSrotage);
  private articleRepository = inject(ARTICLE_REPOSITORY_STORAGE);
  private activeRouter = inject(ActivatedRoute);
  private destroyRef$ = inject(DestroyRef);

  protected currentArticle = computed(() => this.articleStorage.articleInfo());
  protected articleId = signal<string>('');

  constructor() {}

  ngOnInit() {
    this.activeRouter.params
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((obj) => this.articleId.set(obj['id']));
    this.articleRepository.getArticle(this.articleId());
  }
}
