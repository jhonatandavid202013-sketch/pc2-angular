
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  nombre = 'Usuario';
  correo = '';

  constructor(private auth: Auth) {
    const sesion = this.auth.obtenerSesion();

    if (sesion) {
      this.nombre = sesion.nombre;
      this.correo = sesion.correo;
    }
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
  }
}
