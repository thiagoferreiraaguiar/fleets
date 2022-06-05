import { Usuario } from 'src/app/model/usuario';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from 'src/app/perfil/perfil.service';
import { UsuarioService } from './usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  // campos pesquisa
  filtro: string = "";
  usuarios: Usuario[] = [];
  perfis: Perfil[] = [];

  //formulario
  form: FormGroup = new FormGroup({});
  isAtualizacao: boolean = false;
  showModal: boolean = false;
  textoButton: string = "";
  perfilSelecionado: Perfil = new Perfil();

  //paginacao
  first: number = 0;
  rows: number = 6;

  ngOnInit() {
    // criar formulario
    this.createForm();

    //preenche combo perfil
    this.perfilService.listarTodos().subscribe((response: Perfil[]) => {
      this.perfis = response;
    });

    // listar todos usuarios
    this.usuarioService.listarTodos().subscribe((response: Usuario[]) => {
      this.usuarios = response;
    });
  }

  public pesquisar() {
    this.usuarioService.pesquisarUsuario(this.filtro).subscribe((response: Usuario[]) => {
      this.usuarios = response;
    });
  }

  public exibirDados(usuario: Usuario) {
    console.log(usuario);
    
    this.isAtualizacao = true;
    this.textoButton = "Atualizar";
    this.showModal = true;

    this.form.setValue({
      id: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil,
      cpf: usuario.cpf,
      email: usuario.email,
      senha: '',
      confirmaSenha: '',
      ativo: usuario.ativo
    });
  }

  public novo(): void {
    this.textoButton = "Cadastrar";
    this.isAtualizacao = true;
    this.showModal = true;
    this.form.reset();
  }

  public cadastrar(): void {
    this.usuarioService.cadastrarUsuario(this.form.value).subscribe((response: Usuario) => {
        this.showModal = false;
        this.pesquisar();
        this.messageService.add({ severity: 'success', detail: 'Usuário cadastrado com sucesso!' });
    }, err => {
      this.messageService.add({ severity: 'error', detail: 'Não foi possível cadastrar o usuário.' });
    });
  }

  public excluir(id: number, nome: string): void {
    this.confirmationService.confirm({
      message: 'Deseja excluir o usuário <b>' + nome + '</b> ?',
      header: 'Exclusão',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: "Não",
      accept: () => {
        this.usuarioService.excluirUsuario(id).subscribe(() => {
          this.messageService.add({ severity: 'success', detail: 'Usuário excluído com sucesso!' });
          this.pesquisar();
        }, err => {
          this.messageService.add({ severity: 'error', detail: 'Não foi possível excluir o usuário.' });
        });
      }
    });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      ativo: new FormControl(true),
      senha: new FormControl('', [Validators.minLength(4), Validators.maxLength(10)]),
      confirmaSenha: new FormControl('', [Validators.minLength(4), Validators.maxLength(10)]),
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
    return this.usuarios ? this.first === (this.usuarios.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.usuarios ? this.first === 0 : true;
  }

}
