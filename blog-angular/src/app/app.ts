import { Component, signal } from '@angular/core';
import { Layout } from './ui/components/layout/layout';
import { ARTICLE_STORAGE_SERVISE } from './tokens/article-storage-servic-token';
import { ArticleStorageService } from './services/article-storage-service';
import { ArticlesStorage } from './services/articles-storage';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    ArticlesStorage,
    { provide: ARTICLE_STORAGE_SERVISE, useClass: ArticleStorageService },
  ],
})
export class App {
  protected readonly title = signal('blog-angular');
}
