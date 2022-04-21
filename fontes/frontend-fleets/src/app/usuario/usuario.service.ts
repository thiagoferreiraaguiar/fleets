import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + "/usuarios/");
  }

  public pesquisarUsuario(nome: string, email: string, idPerfilUsuario: number, ativo: any): Observable<Usuario[]> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('email', email)
      .set('idPerfilUsuario', idPerfilUsuario.toString())
      .set('ativo', (ativo == null ? '' : (ativo ? 'true' : 'false')));

    return this.http.get<Usuario[]>(this.url + '/usuarios/pesquisarUsuario', { params });
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
