import { InjectionToken } from '@angular/core';
import { IArticleLocalStorageService } from '../models/interfaces/article-local-storage-service.interface';

export const ARTICLE_LOCAL_STORAGE_SERVICE = new InjectionToken<IArticleLocalStorageService>(
  '[ARTICLE_LOCAL_STORAGE_SERVICE]: для получения статей ',
);
