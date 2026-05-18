import { InjectionToken } from '@angular/core';
import { IEnvironment } from '../models/interfaces/environments-iterface';

export const ENV_CONFIG = new InjectionToken<IEnvironment>(
  '[ENV_CONFIG]: для подключения enviroments',
);
