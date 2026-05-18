import { InjectionToken } from '@angular/core';
import { ICategoryService } from '../models/interfaces/category-interface';

export const CATEGORY_BACK_SERVICE = new InjectionToken<ICategoryService>(
  '[CATEGORY_SERVICE]: ждя подключения сервиса категорий',
);
