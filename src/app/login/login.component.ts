import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  usuario: Usuario = { username: '', password: '', id: 0, favoritos: [] };
  errorLogin: string | null = null;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  onSubmit(): void {
   this.apiService.verificarCredenciales(this.usuario).subscribe(
      (usuarioValido) => {
        if (usuarioValido) {
          this.authService.login(this.usuario);
          this.router.navigate(['/home']);
        } else {
          console.error('Credenciales inválidas');
          this.errorLogin = 'Credenciales incorrectas';
          this.usuario = { username: '', password: '', id: 0, favoritos: [] };
        }
      },
      error => {
        console.error('Error al verificar credenciales:', error);
        this.errorLogin = 'Error al verificar credenciales';
      }
    );
  }
}



