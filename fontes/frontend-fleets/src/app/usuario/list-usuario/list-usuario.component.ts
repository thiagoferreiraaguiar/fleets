import { Usuario } from 'src/app/model/usuario';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from 'src/app/perfil/perfil-service';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private router: Router
  ) { }

  // campos pesquisa
  nome: string = "";
  email: string = "";
  perfilSelecionado: Perfil = new Perfil();
  ativo: boolean = true;
  labelStatus: string = "";

  //paginacao
  first: number = 0;
  rows: number = 0;

  // paginas
  pageForm: string = "";
  perfis: Perfil[] = [];

  usuarios: Usuario[] = [];

  ngOnInit() {
    this.ativo = true;
    this.labelStatus = "Ativo";
    this.pageForm = "/form-usuario";
    this.first = 0;
    this.rows = 6;

    //preenche combo perfil
    this.perfilService.listarTodos().subscribe((response: Perfil[]) => {
      this.perfis = response;
    });

    // listar todos usuarios
    this.usuarioService.listarTodos().subscribe((response: Usuario[]) => {
      this.usuarios = response;
    });
  }

  public pesquisarUsuario() {
    let idPerfil: number = 0;
    if (this.perfilSelecionado != null) {
      idPerfil = this.perfilSelecionado.id;
    }

    this.usuarioService.pesquisarUsuario(this.nome, this.email, idPerfil, this.ativo).subscribe((response: Usuario[]) => {
      this.usuarios = response;
    });
  }

  public exibirDadosUsuario(event: any) {
    this.router.navigate([this.pageForm + "/" + event.data.id]);
  }

  public onChangeStatus() {
    if (this.ativo == null) {
      this.labelStatus = "Todos";
    } else if (this.ativo) {
      this.labelStatus = "Ativo";
    } else {
      this.labelStatus = "Inativo";
    }
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
    return this.usuarios ? this.first === (this.usuarios.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.usuarios ? this.first === 0 : true;
  }


}
