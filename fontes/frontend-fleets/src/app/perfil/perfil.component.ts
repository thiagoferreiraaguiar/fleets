import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  // campos pesquisa
  filtro: string = "";
  perfils: Perfil[] = [];

  //formulario
  form: FormGroup = new FormGroup({});
  isAtualizacao: boolean = false;
  showModal: boolean = false;
  textoButton: string = "";

  //paginacao
  first: number = 0;
  rows: number = 6;

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
    this.textoButton = "Atualizar";
    this.showModal = true;

    this.form.setValue({
      id: perfil.id,
      sigla: perfil.sigla,
      descricao: perfil.descricao
    })
  }

  public novo(): void {
    this.textoButton = "Cadastrar";
    this.isAtualizacao = true;
    this.showModal = true;
    this.form.reset();
  }

  public cadastrar(): void {
    this.perfilService.cadastrarPerfil(this.form.value).subscribe((response: Perfil) => {
        this.showModal = false;
        this.pesquisar();
        this.messageService.add({ severity: 'success', detail: 'Perfil cadastrado com sucesso!' });
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
