import { InjectionToken } from '@angular/core';
import { IBackHelper } from '../models/interfaces/back-helper-interface';

export const BACK_HELPER = new InjectionToken<IBackHelper>('[BACK_HELPER]: для помощи');
