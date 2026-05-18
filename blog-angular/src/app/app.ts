import { Component, signal } from '@angular/core';
import { Layout } from './ui/components/layout/layout';
import { ArticleStorage } from './services/article/article-srotage';
import { ArticleFacade } from './services/article/article-facade';
import { ArticlesStorage } from './services/articles-storage';
import { ArticleLocalStorageService } from './services/article-local-storage-service';
import { ArticleBackStorageService } from './services/article-back-storage-service';
import { ARTICLE_FACADE } from './tokens/article-facade-token';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from './tokens/article-local-storage-service';
import { environment } from '../environments/environment';
import { ArticleFacadeBack } from './services/article/article-facade-back';
import { ENV_CONFIG } from './tokens/enviroments-token';
import { CategoryStorage } from './services/category-storage';
import { CATEGORY_BACK_SERVICE } from './tokens/category-storage-service-token';
import { CategoryBackService } from './services/category-back-service';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [
    ArticleStorage,
    ArticlesStorage,
    CategoryStorage,
    {
      provide: ARTICLE_FACADE,
      useClass: environment.useLcService ? ArticleFacade : ArticleFacadeBack,
    },
    {
      provide: ARTICLE_LOCAL_STORAGE_SERVICE,
      useClass: environment.useLcService ? ArticleLocalStorageService : ArticleBackStorageService,
    },
    {
      provide: ENV_CONFIG,
      useValue: environment,
    },
    {
      provide: CATEGORY_BACK_SERVICE,
      useClass: CategoryBackService,
    },
  ],
})
export class App {
  protected readonly title = signal('blog-angular');
}
