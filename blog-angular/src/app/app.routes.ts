import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // loadComponent: () => import('./ui/components/layout/layout').then((c) => c.Layout),
    children: [
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        loadComponent: () => import('./ui/pages/main-page/main-page').then((c) => c.MainPage),
        title: 'Обо мне',
      },
      {
        path: 'articles',
        loadComponent: () => import('./ui/pages/articles/articles').then((c) => c.Articles),
        title: 'Блог',
      },
      {
        path: 'articles/:id',
        loadComponent: () =>
          import('./ui/pages/article-page/article-page').then((c) => c.ArticlePage),
      },
    ],
  },
];
