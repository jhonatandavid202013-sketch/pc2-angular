
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  correo = '';
  password = '';
  mensaje = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  iniciarSesion(): void {
    this.mensaje = '';

    if (!this.correo.trim() || !this.password) {
      this.mensaje = 'Ingresa tu correo y contraseña.';
      return;
    }

    const correcto = this.auth.iniciarSesion(
      this.correo.trim(),
      this.password
    );

    if (correcto) {
      this.router.navigate(['/dashboard']);
    } else {
      this.mensaje = 'Correo o contraseña incorrectos.';
    }
  }
}

