import { InjectionToken } from '@angular/core';
import { IArticleRepository } from '../models/interfaces/article-repository-storage';

export const ARTICLE_REPOSITORY_STORAGE = new InjectionToken<IArticleRepository>(
  '[ARTICLE_REPOSITORY_STORAGE]: для получения статьи',
);
