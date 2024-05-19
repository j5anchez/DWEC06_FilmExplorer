import { NgModule } from "@angular/core";
// Rutas
import { RouterModule, Routes } from "@angular/router";
// Componentes
import { HomeComponent } from "../pages/home/home.component";
import { BuscarComponent } from "../pages/buscar/buscar.component";
import { PeliculaComponent } from "../pages/pelicula/pelicula.component";
import { FavoritosComponent } from "../pages/favoritos/favoritos.component";
import { LoginComponent } from '../login/login.component'; // Suponiendo que tienes un componente de login
import { RegistroComponent } from '../registro/registro.component'; // Suponiendo que tienes un componente de registro

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pelicula/:id", component: PeliculaComponent },
  { path: "buscar/:texto", component: BuscarComponent },
  { path: "favoritos", component: FavoritosComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
