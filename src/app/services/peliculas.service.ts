import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Global } from "../conf/global";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { CarteleraResponse, Movie } from "../interfaces/cartelera";
import { MovieResponse } from "../interfaces/movie";
import { CreditsReponse, Cast } from "../interfaces/credits";
@Injectable({
  providedIn: "root",
})
export class PeliculasService {
  private carteleraPage = 1;
  public cargando: boolean = false;
  constructor(private http: HttpClient) {}
  get params() {
    return {
      api_key: Global.urlKey,
      language: Global.urlLgn,
      page: this.carteleraPage.toString(),
    };
  }
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${Global.urlApi}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: "1", query: texto };
    return this.http
      .get<CarteleraResponse>(`${Global.urlApi}/search/movie`, {
        params,
      })
      .pipe(map((resp) => resp.results));
  }
  getPeliculaDetalle(id: string) {
    return this.http
      .get<MovieResponse>(`${Global.urlApi}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }
  getCast(id: string): Observable<Cast[]> {
    return this.http
      .get<CreditsReponse>(`${Global.urlApi}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }
}
