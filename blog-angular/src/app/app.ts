import { Component, signal } from '@angular/core';
import { Layout } from './ui/components/layout/layout';
import { ArticleStorage } from './services/article/article-srotage';
import { ArticleRepositoryStorage } from './services/article/article-repository-storage';
import { ArticlesStorage } from './services/articles-storage';
import { ArticleStorageService } from './services/article-local-storage-service';
import { ARTICLE_REPOSITORY_STORAGE } from './tokens/article-repository-storage-token';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from './tokens/article-local-storage-service';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    ArticleStorage,
    ArticlesStorage,
    { provide: ARTICLE_REPOSITORY_STORAGE, useClass: ArticleRepositoryStorage },
    { provide: ARTICLE_LOCAL_STORAGE_SERVICE, useClass: ArticleStorageService },
  ],
})
export class App {
  protected readonly title = signal('blog-angular');
}
