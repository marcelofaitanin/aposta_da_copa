import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Permite a rota apenas para usuários autenticados. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  router.navigate(['/login']);
  return false;
};

/** Permite a rota apenas para administradores. */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isAdmin()) return true;
  router.navigate(['/jogos']);
  return false;
};
