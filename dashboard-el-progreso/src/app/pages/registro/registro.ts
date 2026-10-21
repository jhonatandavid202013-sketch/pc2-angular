
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  nombre = '';
  correo = '';
  password = '';
  confirmarPassword = '';
  mensaje = '';
  error = false;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  registrar(): void {
    this.mensaje = '';

    if (
      !this.nombre.trim() ||
      !this.correo.trim() ||
      !this.password ||
      !this.confirmarPassword
    ) {
      this.mensaje = 'Completa todos los campos.';
      this.error = true;
      return;
    }

    if (this.password !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden.';
      this.error = true;
      return;
    }

    const registrado = this.auth.registrar({
      nombre: this.nombre.trim(),
      correo: this.correo.trim(),
      password: this.password
    });

    if (!registrado) {
      this.mensaje = 'Este correo ya está registrado.';
      this.error = true;
      return;
    }

    this.mensaje = 'Registro exitoso. Ya puedes iniciar sesión.';
    this.error = false;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
