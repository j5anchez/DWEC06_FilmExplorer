import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Usuario } from "../../interfaces/usuario.model";
@Component({
  selector: "NavbarComponent",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.getUsuarioActual().subscribe((usuario: Usuario | null) => {
      this.isLoggedIn = usuario !== null;
      this.username = usuario?.username || null;
    });
  }
  logout(): void {
    this.authService.logout();
  }
  buscarPelicula(texto: string) {
    texto = texto.trim();
    if (texto.length === 0) {
      return;
    }
    this.router.navigate(["/buscar", texto]);
  }
}
// import { Component, OnInit } from "@angular/core";
// import { AuthService } from "../../services/auth.service";

// @Component({
//   selector: "app-navbar",
//   templateUrl: "./navbar.component.html",
//   styleUrls: ["./navbar.component.css"],
// })
// export class NavbarComponent implements OnInit {
//   usuarioLogueado: string | null = null;

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     this.authService.getUsuarioActual().subscribe((usuario) => {
//       this.usuarioLogueado = usuario ? usuario.username : null;
//     });
//   }
// }
