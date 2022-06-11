import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-cotacao',
  templateUrl: './form-cotacao.component.html',
  styleUrls: ['./form-cotacao.component.css']
})
export class FormCotacaoComponent implements OnInit {

  constructor() { }

  uploadedFiles: any[] = [];
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

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

}
