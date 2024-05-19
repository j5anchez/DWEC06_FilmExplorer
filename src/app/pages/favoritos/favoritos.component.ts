import { FavoritosService } from "./../../services/favoritos.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "favoritosComponent",
  templateUrl: "./favoritos.component.html",
  styleUrls: [],
})
export class FavoritosComponent implements OnInit {
  favoriteMovies: any[] = [];
  currentUser: any; // Usuario actual

  constructor(
    private favoritosService: FavoritosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUsuarioActual().subscribe(
      (user) => {
        this.currentUser = user;
        this.getFavoriteMovies();
      },
      (error) => {
        console.error("Error al obtener el usuario actual:", error);
      }
    );
  }

  getFavoriteMovies(): void {
    this.favoritosService.getFavoriteMovies().subscribe(
      (movies) => {
        this.favoriteMovies = movies;
      },
      (error) => {
        console.error("Error al obtener las películas favoritas:", error);
      }
    );
  }
  deleteFromFavorites(movieId: number): void {
    this.favoritosService.deleteMovie(movieId).subscribe(
      () => {
        console.log(`Movie with ID ${movieId} deleted successfully`);
        this.getFavoriteMovies();
      },
      (error) => {
        console.error("Error deleting movie:", error);
      }
    );
  }
  editComment(movie: any): void {
    const newComment = prompt("Editar comentario:", movie.comentario);
    if (newComment !== null) {
      movie.comentario = newComment;
      this.favoritosService.updateMovie(movie).subscribe(
        () => {
          console.log("Comentario actualizado exitosamente");
        },
        (error) => {
          console.error("Error al actualizar comentario:", error);
        }
      );
    }
  }
}
