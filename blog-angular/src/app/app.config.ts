import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        // Настоятельно рекомендуется: автоматически восстанавливает позицию скролла
        // при навигации "Назад/Вперёд" браузера
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
