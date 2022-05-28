import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from '../perfil-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-perfil',
  templateUrl: './list-perfil.component.html',
  styleUrls: ['./list-perfil.component.css']
})
export class ListPerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  // campos pesquisa
  filtro: string = "";

  //formulario
  form: FormGroup = new FormGroup({});
  isAtualizacao: boolean = false;

  // paginas
  pageForm: string = "/form-perfil";
  pageList: string = "/list-perfil";

  //paginacao
  first: number = 0;
  rows: number = 6;

  perfils: Perfil[] = [];
  showModal: boolean = false;

  ngOnInit() {
    // criar formulario
    this.createForm();

    // listar todos perfils
    this.perfilService.listarTodos().subscribe((response: Perfil[]) => {
      this.perfils = response;
    });
  }

  public pesquisar() {
    this.perfilService.pesquisarPerfil(this.filtro).subscribe((response: Perfil[]) => {
      this.perfils = response;
    });
  }

  public exibirDados(perfil: Perfil) {
    this.isAtualizacao = true;
    this.showModal = true;
    this.form.setValue({
      id: perfil.id,
      sigla: perfil.sigla,
      descricao: perfil.descricao
    })
  }

  public novo(): void {
    this.isAtualizacao = true;
    this.showModal = true;
    this.form.reset();
  }

  public cadastrar(): void {
    this.perfilService.cadastrarPerfil(this.form.value).subscribe((response: Perfil) => {
      if (response != null) {
        this.showModal = false;
        this.pesquisar();
        this.messageService.add({ severity: 'success', detail: 'Perfil cadastrado com sucesso!' });
      }
    }, err => {
      this.messageService.add({ severity: 'error', detail: 'Não foi possível cadastrar o perfil.' });
    });
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
          this.pesquisar();
        }, err => {
          this.messageService.add({ severity: 'error', detail: 'Não foi possível excluir o perfil.' });
        });
      }
    });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      sigla: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      descricao: new FormControl('', Validators.required)
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
