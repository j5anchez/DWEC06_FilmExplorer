import { Component } from "@angular/core";
import { Usuario } from "../interfaces/usuario.model";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: [],
})
export class RegistroComponent {
  usuario: Usuario = { username: "", password: "", id: 0, favoritos: [] };
  registroExitoso: boolean = false;
  errorRegistro: string | null = null;
  constructor(private apiService: ApiService, private router: Router) {}
  onSubmit(): void {
    this.apiService.verificarUsuarioExiste(this.usuario.username).subscribe(
      (existe) => {
        if (existe) {
          this.errorRegistro = "El usuario ya existe";
          this.usuario = { username: "", password: "", id: 0, favoritos: [] };
        } else {
          this.apiService.registrarUsuario(this.usuario).subscribe(
            () => {
              console.log("Usuario registrado exitosamente");
              this.registroExitoso = true;
              setTimeout(() => {
                this.router.navigate(["/login"]);
              }, 5000);
            },
            (error) => {
              console.error("Error al registrar usuario:", error);
            }
          );
        }
      },
      (error) => {
        console.error("Error al verificar si el usuario existe:", error);
        this.errorRegistro = "Error al verificar si el usuario existe";
      }
    );
  }
}
