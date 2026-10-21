
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  cargando = true;
  error = '';

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.cargando = true;
    this.error = '';

    this.http.get<Usuario[]>(this.apiUrl).subscribe({
      next: (datos) => {
        this.usuarios = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios. Verifica tu conexión e inténtalo nuevamente.';
        this.cargando = false;
      }
    });
  }
}
