import { Component, signal } from '@angular/core';
import { Layout } from './ui/components/layout/layout';
import { ArticleStorage } from './services/article/article-srotage';
import { ArticleFacade } from './services/article/article-facade';
import { ArticlesStorage } from './services/articles-storage';
import { ArticleLocalStorageService } from './services/article-local-storage-service';
import { ARTICLE_FACADE } from './tokens/article-facade-token';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from './tokens/article-local-storage-service';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    ArticleStorage,
    ArticlesStorage,
    { provide: ARTICLE_FACADE, useClass: ArticleFacade },
    { provide: ARTICLE_LOCAL_STORAGE_SERVICE, useClass: ArticleLocalStorageService },
  ],
})
export class App {
  protected readonly title = signal('blog-angular');
}
