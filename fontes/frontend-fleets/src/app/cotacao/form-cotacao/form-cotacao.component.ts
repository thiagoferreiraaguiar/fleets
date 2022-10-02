import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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

  ngOnInit(): void {
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

    this.service.onUpload(file).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'Planilha processada com sucesso!' });
    }, err => {
      this.messageService.add({ severity: 'error', detail: 'Não foi possível processar a planilha.' });
    });
  }

}
