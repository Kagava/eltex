import { Component, signal } from '@angular/core';
import { Layout } from './ui/components/layout/layout';
import { ArticleSrotage } from './services/article/article-srotage';
import { ArticleRepositoryStorage } from './services/article/article-repository-storage';
import { ArticlesStorage } from './services/articles-storage';
import { ArticleStorageService } from './services/article-storage-service';
import { ARTICLE_REPOSITORY_STORAGE } from './tokens/article-repository-storage-token';
import { ARTICLE_STORAGE_SERVISE } from './tokens/article-storage-servic-token';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    ArticleSrotage,
    ArticlesStorage,
    { provide: ARTICLE_REPOSITORY_STORAGE, useClass: ArticleRepositoryStorage },
    { provide: ARTICLE_STORAGE_SERVISE, useClass: ArticleStorageService },
  ],
})
export class App {
  protected readonly title = signal('blog-angular');
}
