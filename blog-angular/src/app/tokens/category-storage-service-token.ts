import { InjectionToken } from '@angular/core';
import { ICategoryStorage } from '../models/interfaces/category-interface';

export const CATEGORY_BACK_SERVICE = new InjectionToken<ICategoryStorage>(
  '[CATEGORY_SERVICE]: ждя подключения сервиса категорий',
);
