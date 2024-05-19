import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../interfaces/usuario.model";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:3000/usuarios";

  constructor(private http: HttpClient) {}
  verificarUsuarioExiste(username: string): Observable<boolean> {
    return this.http
      .get<Usuario[]>(`${this.apiUrl}?username=${username}`)
      .pipe(map((usuarios) => usuarios.length > 0));
  }
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }
  verificarCredenciales(usuario: Usuario): Observable<boolean> {
    return this.http
      .get<Usuario[]>(
        `${this.apiUrl}?username=${usuario.username}&password=${usuario.password}`
      )
      .pipe(map((usuarios) => usuarios.length > 0));
  }
}
