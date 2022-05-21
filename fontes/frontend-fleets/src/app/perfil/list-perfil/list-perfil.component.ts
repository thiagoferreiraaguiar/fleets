import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from '../perfil-service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['./list-perfil.component.css']
})
export class ListPerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  // campos pesquisa
  sigla: string = "";
  descricao: string = "";

  // paginas
  pageForm: string = "/form-perfil";
  pageList: string = "/list-perfil";

  //paginacao
  first: number = 0;
  rows: number = 6;

  perfils: Perfil[] = [];

  ngOnInit() {
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

  public excluir(id: number, descricao: string) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o perfil <b>' + descricao + '</b> ?',
      header: 'Exclusão',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: "Não",
      accept: () => {
        this.perfilService.excluirPerfil(id).subscribe(() => {
          this.messageService.add({ severity: 'success', detail: 'Perfil excluido com sucesso!' });
          this.pesquisarPerfil();
        }, err => {
          this.messageService.add({ severity: 'error', detail: 'Não foi possível excluir o perfil.' });
        });
      }
    });
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
