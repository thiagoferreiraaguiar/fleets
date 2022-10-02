import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from '../model/cotacao';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public listarTodos(): Observable<Cotacao[]> {
    return this.http.get<Cotacao[]>(this.url + "/cotacoes/");
  }

  public getCotacao(idCotacao: number): Observable<Cotacao> {
    return this.http.get<Cotacao>(this.url + "/cotacoes/" + idCotacao);
  }

  public pesquisarCotacao(parametro: string): Observable<Cotacao[]> {
    const params = new HttpParams()
      .set('parametro', parametro);

    return this.http.get<Cotacao[]>(this.url + '/cotacoes/filter', { params });
  }

  public cadastrarCotacao(cotacao: Cotacao): Observable<Cotacao> {
    return this.http.post<Cotacao>(this.url + "/cotacoes", cotacao);
  }

  public excluirCotacao(idCotacao: number) {
    return this.http.delete(this.url + "/cotacoes/" + idCotacao);
  }

  public onUpload(file: File, idUsuario: number) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<number>(this.url + "/upload-arquivo/" + idUsuario, formData);
  }

}
