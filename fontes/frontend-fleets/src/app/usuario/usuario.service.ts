import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = "https://api.fleetsseguros.cf";

  constructor(private http: HttpClient) { }

  public listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + "/usuarios/");
  }

  public pesquisarUsuario(parametro: string): Observable<Usuario[]> {
    const params = new HttpParams()
      .set('parametro', parametro);

    return this.http.get<Usuario[]>(this.url + '/usuarios/filter', { params });
  }

  public getUsuario(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.url + "/usuarios/" + idUsuario);
  }

  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + "/usuarios", usuario);
  }

  public excluirUsuario(idUsuario: number) {
    return this.http.delete(this.url + "/usuarios/" + idUsuario);
  }

}
