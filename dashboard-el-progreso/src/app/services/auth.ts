
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface Usuario {
  nombre: string;
  correo: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly usuariosKey = 'elProgresoUsuarios';
  private readonly sesionKey = 'elProgresoSesion';

  constructor(private router: Router) {}

  private get esNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  registrar(usuario: Usuario): boolean {
    if (!this.esNavegador) return false;

    const usuarios = this.obtenerUsuarios();
    const existe = usuarios.some(
      u => u.correo.toLowerCase() === usuario.correo.toLowerCase()
    );

    if (existe) return false;

    usuarios.push(usuario);
    localStorage.setItem(this.usuariosKey, JSON.stringify(usuarios));
    return true;
  }

  iniciarSesion(correo: string, password: string): boolean {
    if (!this.esNavegador) return false;

    const usuario = this.obtenerUsuarios().find(
      u => u.correo.toLowerCase() === correo.toLowerCase()
        && u.password === password
    );

    if (!usuario) return false;

    sessionStorage.setItem(
      this.sesionKey,
      JSON.stringify({
        nombre: usuario.nombre,
        correo: usuario.correo
      })
    );

    return true;
  }

  obtenerSesion(): { nombre: string; correo: string } | null {
    if (!this.esNavegador) return null;

    const sesion = sessionStorage.getItem(this.sesionKey);
    return sesion ? JSON.parse(sesion) : null;
  }

  cerrarSesion(): void {
    if (this.esNavegador) {
      sessionStorage.removeItem(this.sesionKey);
    }

    this.router.navigate(['/login']);
  }

  private obtenerUsuarios(): Usuario[] {
    if (!this.esNavegador) return [];

    return JSON.parse(
      localStorage.getItem(this.usuariosKey) || '[]'
    );
  }
}
