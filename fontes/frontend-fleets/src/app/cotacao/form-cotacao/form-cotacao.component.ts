import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuarioLogado } from 'src/app/model/usuario-logado';
import { CotacaoService } from '../cotacao.service';

@Component({
  selector: 'app-form-cotacao',
  templateUrl: './form-cotacao.component.html',
  styleUrls: ['./form-cotacao.component.css']
})
export class FormCotacaoComponent implements OnInit {

  constructor(
    private service: CotacaoService,
    private messageService: MessageService
  ) { }

  tipoCadastro: string = "A";
  tipoVeiculo: string = "Novo";
  checked: boolean = true;
  ocultaCadastroAutomatico: boolean = false;
  usuarioLogado: UsuarioLogado = new UsuarioLogado();

  ngOnInit(): void {
    this.usuarioLogado = UsuarioLogado.getInstance();
  }

  onClickTipoCadastro(event: any) {
    if (this.tipoCadastro == 'A') {
      this.ocultaCadastroAutomatico = false;
    } else {
      this.ocultaCadastroAutomatico = true;
    }
  }

  onClickTipoVeiculo(event: any) {
    if (this.checked == true) {
      this.tipoVeiculo = "Novo";
    } else {
      this.tipoVeiculo = "Usado";
    }
  }

  public onUpload(event: any) {
    const file: File = event.target.files[0];
    const idUsuario = this.usuarioLogado.usuario.id;

    this.service.onUpload(file, idUsuario).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'Planilha processada com sucesso!' });
    }, err => {
      this.messageService.add({ severity: 'error', detail: 'Não foi possível processar a planilha.' });
    });
  }

}
