import { InjectionToken } from '@angular/core';
import { IArticleFacade } from '../models/interfaces/article-facade';

export const ARTICLE_FACADE = new InjectionToken<IArticleFacade>(
  '[ARTICLE_FACADE]: для получения статьи',
);
