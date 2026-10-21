
import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Dashboard } from './pages/dashboard/dashboard';
import { Clientes } from './pages/clientes/clientes';
import { Empleados } from './pages/empleados/empleados';
import { Productos } from './pages/productos/productos';
import { Reportes } from './pages/reportes/reportes';
import { Usuarios } from './pages/usuarios/usuarios';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'clientes', component: Clientes, canActivate: [authGuard] },
  { path: 'empleados', component: Empleados, canActivate: [authGuard] },
  { path: 'productos', component: Productos, canActivate: [authGuard] },
  { path: 'reportes', component: Reportes, canActivate: [authGuard] },
  { path: 'usuarios', component: Usuarios, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];
