
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const auth = inject(Auth);
  const router = inject(Router);

  // Durante el prerenderizado, no comprobar la sesión.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // En el navegador, proteger las páginas privadas.
  if (auth.obtenerSesion()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
