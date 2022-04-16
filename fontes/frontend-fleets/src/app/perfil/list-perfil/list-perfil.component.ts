import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/model/perfil';
import { Util } from 'src/app/util/util';
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

  sigla: string= "";
  descricao: string= "";

  pageForm: string= "";
  perfils: Perfil[] = [];

  // paginacao
  util: Util = new Util();
  qtdRows: number = 0;
  textPaginacao: string = "";

  ngOnInit() {
    this.pageForm = "/form-perfil";
    this.qtdRows = 10;
    this.util = new Util();

    // listar todos perfils
    this.perfilService.listarTodos().subscribe((response: Perfil[]) => {
      this.perfils = response;
      this.textPaginacao = this.util.showLabelPaginate(0, this.perfils.length, this.qtdRows);
    });
  }

  public pesquisarPerfil() {
    this.perfilService.pesquisarPerfil(this.sigla, this.descricao).subscribe((response: Perfil[]) => {
      this.perfils = response;
      this.textPaginacao = this.util.showLabelPaginate(0, this.perfils.length, this.qtdRows);
    });
  }

  public exibirDadosPerfil(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.idPerfil]);
  }

  public paginate(event: any) {
    this.textPaginacao = this.util.showLabelPaginate(event.first, this.perfils.length, this.qtdRows);
  }

}
