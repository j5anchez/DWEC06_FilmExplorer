import { Injectable } from "@angular/core";
import { Usuario } from "../interfaces/usuario.model";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private usuarioSubject: BehaviorSubject<Usuario | null> =
    new BehaviorSubject<Usuario | null>(null);
  constructor() {
    const usuarioString = localStorage.getItem("usuario");
    if (usuarioString) {
      this.usuarioSubject.next(JSON.parse(usuarioString));
    }
  }
  login(usuario: Usuario): void {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }
  logout(): void {
    localStorage.removeItem("usuario");
    this.usuarioSubject.next(null);
  }
  getUsuarioActual(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }
  isLoggedIn(): boolean {
    return this.usuarioSubject.value !== null;
  }
}
