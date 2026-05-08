import { Component, computed, inject, input } from '@angular/core';
import { Comment } from '../../../../models/types/articles';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArticleSrotage } from '../../../../services/article/article-srotage';
import { ARTICLE_REPOSITORY_STORAGE } from '../../../../tokens/article-repository-storage-token';
@Component({
  selector: 'app-comment-component',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './comment-component.html',
  styleUrl: './comment-component.scss',
})
export class CommentComponent {
  private articleStorage = inject(ArticleSrotage);
  private articleRepository = inject(ARTICLE_REPOSITORY_STORAGE);
  protected currentArticle = computed(() => this.articleStorage.articleInfo());
  public comments = computed(() => this.currentArticle()?.comments);

  protected commentRatingDown(id: number) {
    this.articleRepository.updateArticleComments(id, -1);
  }
  protected commentRatingUp(id: number) {
    this.articleRepository.updateArticleComments(id, 1);
  }
}
