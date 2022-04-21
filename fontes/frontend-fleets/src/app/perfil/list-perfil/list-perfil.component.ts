import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from '../perfil-service';

@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['./list-perfil.component.css']
})
export class ListPerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) { }

  // campos pesquisa
  sigla: string = "";
  descricao: string = "";

  // paginas
  pageForm: string = "";

  //paginacao
  first: number = 0;
  rows: number = 0;

  perfils: Perfil[] = [];

  ngOnInit() {
    this.pageForm = "/form-perfil";
    this.first = 0;
    this.rows = 6;

    // listar todos perfils
    this.perfilService.listarTodos().subscribe((response: Perfil[]) => {
      this.perfils = response;
    });
  }

  public pesquisarPerfil() {
    this.perfilService.pesquisarPerfil(this.sigla, this.descricao).subscribe((response: Perfil[]) => {
      this.perfils = response;
    });
  }

  public exibirDadosPerfil(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.id]);
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
    return this.perfils ? this.first === (this.perfils.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.perfils ? this.first === 0 : true;
  }

}
