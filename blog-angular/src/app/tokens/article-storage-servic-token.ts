import { InjectionToken } from '@angular/core';
import { IArticleStorageService } from '../models/interfaces/article-storage-service.interface';

export const ARTICLE_STORAGE_SERVISE = new InjectionToken<IArticleStorageService>(
  '[ARTICLE_STORAGE_SERVISE]: для получения статей ',
);
