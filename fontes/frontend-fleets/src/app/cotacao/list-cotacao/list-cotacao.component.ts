import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cotacao } from 'src/app/model/cotacao';
import { CotacaoService } from '../cotacao.service';

@Component({
  selector: 'app-list-cotacao',
  templateUrl: './list-cotacao.component.html',
  styleUrls: ['./list-cotacao.component.css']
})
export class ListCotacaoComponent implements OnInit {

  constructor(
    private service: CotacaoService,
    private router: Router
  ) { }

  // campos pesquisa
  filtro: string = "";
  cotacaoes: Cotacao[] = [];

  //paginacao
  first: number = 0;
  rows: number = 6;

  pageForm: string = "/form-cotacao";

  ngOnInit(): void {

    // listar todos perfils
    this.service.listarTodos().subscribe((response: Cotacao[]) => {
      this.cotacaoes = response;
    });
  }

  public pesquisar() {
    this.service.pesquisarCotacao(this.filtro).subscribe((response: Cotacao[]) => {
      this.cotacaoes = response;
    });
  }

  public novo(): void {
  }

  public exibirDados(id: number): void {
    this.router.navigate([this.pageForm + "/" + id]);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.cotacaoes ? this.first === (this.cotacaoes.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.cotacaoes ? this.first === 0 : true;
  }

}
