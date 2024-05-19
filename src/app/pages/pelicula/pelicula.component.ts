import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { PeliculasService } from "../../services/peliculas.service";
import { MovieResponse } from "../../interfaces/movie";
import { Cast } from "../../interfaces/credits";
import { combineLatest } from "rxjs";
import { FavoritosService } from "../../services/favoritos.service";
import { AuthService } from "../../services/auth.service";
@Component({
  selector: "PeliculaComponent",
  templateUrl: "./pelicula.component.html",
  styleUrls: [],
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieResponse;
  public cast: Cast[] = [];
  public movie: any;
  isLoggedIn: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router,
    private favoritosService: FavoritosService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService.getUsuarioActual().subscribe((usuario) => {
      this.isLoggedIn = usuario !== null;
    });
    const { id } = this.activatedRoute.snapshot.params;
    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id),
    ]).subscribe(([pelicula, cast]) => {
      if (!pelicula) {
        this.router.navigateByUrl("/home");
        return;
      }
      this.pelicula = pelicula;
      this.cast = cast.filter((actor) => actor.profile_path !== null);
      console.log("Pelicula:", pelicula);
      this.movie = {
        id: pelicula.id ?? "",
        title: pelicula.title ?? "",
        comentario: "",
        poster_path: pelicula.poster_path ?? "",
      };
    });
  }
  onRegresar() {
    this.location.back();
  }
  addToFavorites() {
    this.favoritosService.addMovie(this.movie).subscribe(
      (response) => {
        console.log("Película agregada correctamente:", response);
      },
      (error) => {
        console.error("Error al agregar la película:", error);
      }
    );
  }
  verFavoritos() {
    console.log("Navigating to favorites");
    this.router.navigate(["/favoritos"]);
  }
}
