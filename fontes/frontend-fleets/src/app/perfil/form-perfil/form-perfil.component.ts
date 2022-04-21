import { Message } from 'primeng/api/message';
import { PerfilService } from '../perfil-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Perfil } from 'src/app/model/perfil';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  form: FormGroup = new FormGroup({});
  pageForm: string = "/form-perfil";
  pageList: string = "/list-perfil";
  msgs: Message[] = [];
  showMessageError: boolean = false;
  isExclusao: boolean = false;
  disabledButton: boolean = false;
  isAtualizacao: boolean = false;
  id: number = 0;

  ngOnInit() {
    this.createForm();

    // pega o id do perfil 
    this.activatedRoute.params.subscribe(params => {
      this.id = + params['id'];
    });

    // pega os dados do perfil
    if (!isNaN(this.id)) {
      this.perfilService.getPerfil(this.id).subscribe((response: Perfil) => {
        this.popularCamposFormulario(response);
      });
    }
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      sigla: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      descricao: new FormControl('', Validators.required)
    });
  }

  public cadastrarPerfil(): void {
    this.msgs = [];
    this.disabledButton = true;
    this.perfilService.cadastrarPerfil(this.form.value).subscribe((response: Perfil) => {
      if (response != null) {
        this.showMessageError = false;
        this.popularCamposFormulario(response);
        this.messageService.add({ severity: 'success', detail: 'Perfil cadastrado com sucesso!' });
        this.disabledButton = false;
      }
    }, err => {
      this.showMessageError = true;
      this.disabledButton = false;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível cadastrar o perfil.' });
    });
  }

  public excluirPerfil(id: number): void {
    this.msgs = [];
    this.disabledButton = true;
    this.perfilService.excluirPerfil(id).subscribe(() => {
      this.showMessageError = false;
      this.isExclusao = true;
      this.messageService.add({ severity: 'success', detail: 'Perfil excluido com sucesso!' });
    }, err => {
      this.showMessageError = true;
      this.msgs.push({ severity: 'error', detail: 'Não foi possível excluir o perfil.' });
      this.disabledButton = false;
      this.isExclusao = false;
    });
  }

  public redirectPageList() {
    if (this.isExclusao) {
      this.router.navigate([this.pageList]);
    }
  }

  public novoPerfil(): void {
    this.id = 0;
    this.isAtualizacao = false;
    this.form.reset();
    this.router.navigate([this.pageForm]);
  }

  private popularCamposFormulario(perfil: Perfil) {
    this.id = perfil.id;
    this.isAtualizacao = true;

    this.form.setValue({
      id: perfil.id,
      sigla: perfil.sigla,
      descricao: perfil.descricao
    })
  }

}
