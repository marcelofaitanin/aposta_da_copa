import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards/guards';

export const routes: Routes = [
  { path: '', redirectTo: 'jogos', pathMatch: 'full' },
  {
    path: 'jogos',
    loadComponent: () => import('./pages/games/games').then((m) => m.Games),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'minhas-apostas',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/my-bets/my-bets').then((m) => m.MyBets),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
  },
  { path: '**', redirectTo: 'jogos' },
];
