import { Perfil } from 'src/app/model/perfil';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public listarTodos(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.url + "/perfis/");
  }

  public pesquisarPerfil(sigla: string, descricao: string): Observable<Perfil[]> {
    const params = new HttpParams()
      .set('sigla', sigla)
      .set('descricao', descricao);

    return this.http.get<Perfil[]>(this.url + '/perfis/pesquisarPerfilUsuario', { params });
  }

  public getPerfilUsuario(idPerfil: number) {
    return this.http.get(this.url + "/perfis/" + idPerfil);
  }

  public cadastrarPerfil(perfil: Perfil) {
    return this.http.post(this.url + "/perfis", perfil);
  }

  public excluirPerfil(idPerfil: number) {
    return this.http.delete(this.url + "/perfis/" + idPerfil);
  }
}
