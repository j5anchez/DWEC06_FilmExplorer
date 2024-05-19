import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class FavoritosService {
  favoriteMovies: any[] = [];
  private apiUrl = "http://localhost:3000/peliculas";
  constructor(private http: HttpClient) {}
  getFavoriteMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);
  }
  deleteMovie(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/${movieId}`;
    return this.http.delete<any>(url);
  }
  updateMovie(movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${movie.id}`, movie);
  }
  updateUser(user: any): Observable<any> {
    const userToUpdate = {
      username: user.username,
      password: user.password,
      id: user.id,
      favoritos: user.favoritos,
    };
    return this.http.put<any>(
      `${this.apiUrl}/usuarios/${user.id}`,
      userToUpdate
    );
  }
}
