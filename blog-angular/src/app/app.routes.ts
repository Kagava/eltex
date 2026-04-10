import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('./ui/components/layout/layout').then((c) => c.Layout),
    children: [
      {
        path: 'main',
        loadComponent: () => import('./ui/pages/main-page/main-page').then((c) => c.MainPage),
      },
      {
        path: 'articles',
        loadComponent: () => import('./ui/pages/articles/articles').then((c) => c.Articles),
      },
    ],
  },
];
