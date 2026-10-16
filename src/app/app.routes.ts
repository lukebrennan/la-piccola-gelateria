import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'gelato',
    loadComponent: () => import('./pages/gelato/gelato').then((m) => m.Gelato),
  },
  {
    path: 'our-story',
    loadComponent: () => import('./pages/our-story/our-story').then((m) => m.OurStory),
  },
  {
    path: 'ingredients',
    loadComponent: () => import('./pages/ingredients/ingredients').then((m) => m.Ingredients),
  },
  {
    path: 'visit-amalfi',
    loadComponent: () => import('./pages/visit/visit').then((m) => m.Visit),
  },
  {
    path: 'journal',
    loadComponent: () => import('./pages/journal/journal').then((m) => m.Journal),
  },
  {
    path: 'journal/:slug',
    loadComponent: () => import('./pages/journal/article').then((m) => m.ArticlePage),
  },
  {
    path: 'credits',
    loadComponent: () => import('./pages/credits/credits').then((m) => m.Credits),
  },
  {
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
