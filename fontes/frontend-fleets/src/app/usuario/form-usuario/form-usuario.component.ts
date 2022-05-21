import { PerfilService } from 'src/app/perfil/perfil-service';
import { Perfil } from 'src/app/model/perfil';
import { Usuario } from 'src/app/model/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Message } from 'primeng/api/message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  pageForm: string = "/form-usuario";
  pageList: string = "/list-usuario";
  msgs: Message[] = [];
  showMessageError: boolean = false;
  isExclusao: boolean = false;
  disabledButton: boolean = false;
  isAtualizacao: boolean = false;
  id: number = 0;
  perfis: Perfil[] = [];
  labelStatus: string = "Ativo";
  perfilSelecionado: Perfil = new Perfil();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private perfilService: PerfilService
  ) { }

  ngOnInit() {
    this.createForm();

    // pega o id do usuario 
    this.activatedRoute.params.subscribe(params => {
      this.id = + params['id'];
    });

    // pega os dados do usuario
    if (!isNaN(this.id)) {
      this.usuarioService.getUsuario(this.id).subscribe((response: Usuario) => {
        this.popularCamposFormulario(response);
      });
    }

    //preenche combo perfil
    this.perfilService.listarTodos().subscribe((response: Perfil[]) => {
      this.perfis = response;
    });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      cpf: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', Validators.required),
      ativo: new FormControl(true),
      senha: new FormControl('',[Validators.minLength(4), Validators.maxLength(10)]),
      confirmaSenha: new FormControl('',[Validators.minLength(4), Validators.maxLength(10)]),
    });
  }

  public redirectPageList() {
    if (this.isExclusao) {
      this.router.navigate([this.pageList]);
    }
  }

  public cadastrarUsuario(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.usuarioService.cadastrarUsuario(this.form.value).subscribe((response: Usuario) => {
      if (response != null) {
        this.showMessageError = false;
        this.popularCamposFormulario(response);
        this.messageService.add({ severity: 'success', detail: 'Usuário cadastrado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível cadastrar o usuário.' });
    });
  }

  public excluirUsuario(idUsuario: number): void {
    this.msgs = [];
    this.disabledButton = true;
    this.usuarioService.excluirUsuario(idUsuario).subscribe(() => {
      this.showMessageError = false;
      this.isExclusao = true;
      this.messageService.add({ severity: 'success', detail: 'Usuário excluido com sucesso!' });
    }, err => {
      this.showMessageError = true;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível excluir o usuário.' });
      this.disabledButton = false;
      this.isExclusao = false;
    });
  }

  public novoUsuario(): void {
    this.id = 0;
    this.isAtualizacao = false;
    this.form.reset();
    this.router.navigate([this.pageForm]);
  }

  private popularCamposFormulario(usuario: Usuario) {
    this.id = usuario.id;
    this.isAtualizacao = true;

    this.form.setValue({
      id: usuario.id,
      nome: usuario.nome,
      perfil: usuario.perfil,
      cpf: usuario.cpf,
      dataNascimento: usuario.dataNascimento,
      email: usuario.email,
      senha: '',
      confirmaSenha: '',
      ativo: usuario.ativo
    });

    this.onChangeStatus();
  }

  public onChangeStatus() {
    if (this.form.value.ativo) {
      this.labelStatus = "Ativo";
    } else {
      this.labelStatus = "Inativo";
    }
  }

}
