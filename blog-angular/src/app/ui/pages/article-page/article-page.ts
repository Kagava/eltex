import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleStorage } from '../../../services/article/article-srotage';
import { ARTICLE_FACADE } from '../../../tokens/article-facade-token';
import { CommentComponent } from './comment-component/comment-component';
import { Title } from '@angular/platform-browser';
import { GraphqlService } from '../../../services/graphql-service';

@Component({
  selector: 'app-article-page',
  imports: [CommentComponent],
  templateUrl: './article-page.html',
  styleUrl: './article-page.scss',
  providers: [GraphqlService],
})
export class ArticlePage {
  private articleStorage = inject(ArticleStorage);
  private articleRepository = inject(ARTICLE_FACADE);
  private activeRouter = inject(ActivatedRoute);
  private destroyRef$ = inject(DestroyRef);
  private graphqlService = inject(GraphqlService);

  protected currentArticle = computed(() => this.articleStorage.articleInfo());
  protected articleId = signal<string>('');

  constructor(private title: Title) {}

  ngOnInit() {
    const newTitle = this.articleStorage.articleInfo()?.title;
    if (newTitle) {
      this.title.setTitle(newTitle);
    }
    this.activeRouter.params
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe((obj) => this.articleId.set(obj['id']));
    // this.articleRepository.getArticle(this.articleId());
    this.graphqlService.getArticle(this.articleId()).subscribe(console.log);
  }

  protected ratingDown() {
    const tempArticle = this.currentArticle();
    if (tempArticle !== null) {
      this.articleRepository.updateArticle(-1);
    }
  }

  protected ratingUp() {
    const tempArticle = this.currentArticle();
    if (tempArticle !== null) {
      this.articleRepository.updateArticle(1);
    }
  }
}
