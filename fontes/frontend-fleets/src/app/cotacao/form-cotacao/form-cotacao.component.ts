import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cotacao } from 'src/app/model/cotacao';
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
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  tipoCadastro: string = "A";
  tipoVeiculo: string = "Novo";
  checked: boolean = true;
  ocultaCadastroAutomatico: boolean = false;
  usuarioLogado: UsuarioLogado = new UsuarioLogado();
  ocultaProgressBar: boolean = true;
  idCotacao: number = 0;
  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.createForm();

    // pega o id da cotacao 
    this.activatedRoute.params.subscribe(params => {
      this.idCotacao = + params['id'];
    });

    // pega os dados do usuario
    if (this.idCotacao > 0) {
      this.service.getCotacao(this.idCotacao).subscribe((response: Cotacao) => {
        this.popularCamposFormulario(response);
      });
    }

    this.usuarioLogado = UsuarioLogado.getInstance();
    this.ocultaProgressBar = true;
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
    this.ocultaProgressBar = false;
    const file: File = event.target.files[0];
    const idUsuario = this.usuarioLogado.usuario.id;

    this.service.onUpload(file, idUsuario).subscribe((response: number) => {
      console.log(response);
      this.ocultaProgressBar = true;
      this.messageService.add({ severity: 'success', detail: 'Planilha processada com sucesso!' });
    }, err => {
      this.ocultaProgressBar = true;
      this.messageService.add({ severity: 'error', detail: 'Não foi possível processar a planilha.' });
    });
  }

  private createForm() {
    this.form = new FormGroup({
      id: new FormControl(),
      tipoCadastro: new FormControl(),
      vigenciaInicial: new FormControl(),
      vigenciaFinal: new FormControl(),
      placa: new FormControl(),
      chassi: new FormControl(),
      codigoFipe: new FormControl(),
      marca: new FormControl(),
      modelo: new FormControl(),
      anoFabricacao: new FormControl(),
      anoModelo: new FormControl(),
      combustivel: new FormControl(),
      classeBonus: new FormControl(),
      uf: new FormControl(),
      cidade: new FormControl(),
      cobertura: new FormControl(),
      vinteQuatroHoras: new FormControl(),
      carroReserva: new FormControl(),
      coberturaVidros: new FormControl(),
      tipoFranquia: new FormControl(),
      valorFranquiaInformada: new FormControl(),
      comissao: new FormControl(),
      premioTerceiros: new FormControl(),
      lmiCasco: new FormControl(),
      lmiAcessorios: new FormControl(),
      lmiEquipamentos: new FormControl(),
      lmiBlindagem: new FormControl(),
      lmiKitGas: new FormControl(),
      lmiAparelhosPort: new FormControl(),
      lmiAppMorte: new FormControl(),
      lmiDanosMorais: new FormControl(),
      lmiRctrDanosMoraisTerceiros: new FormControl(),
      rctrClaus: new FormControl(),
    });
  }

  private popularCamposFormulario(cotacao: Cotacao) {
    this.tipoCadastro == 'M';
    this.ocultaCadastroAutomatico = true;

    this.form.setValue({
      id: cotacao.id,
      tipoCadastro: 'M',
      vigenciaInicial: cotacao.vigenciaInicial.substring(0,10),
      vigenciaFinal: cotacao.vigenciaFinal.substring(0,10),
      placa: cotacao.placa,
      chassi: cotacao.chassi,
      codigoFipe: cotacao.codigoFipe,
      marca: cotacao.marca,
      modelo: cotacao.modelo,
      anoFabricacao: cotacao.anoFabricacao,
      anoModelo: cotacao.anoModelo,
      combustivel: cotacao.combustivel,
      classeBonus: cotacao.classeBonus,
      uf: cotacao.uf,
      cidade: cotacao.cidade,
      cobertura: cotacao.cobertura,
      vinteQuatroHoras: cotacao.vinteQuatroHoras,
      carroReserva: cotacao.carroReserva,
      coberturaVidros: cotacao.coberturaVidros,
      tipoFranquia: cotacao.tipoFranquia,
      valorFranquiaInformada: cotacao.valorFranquiaInformada,
      comissao: cotacao.comissao,
      premioTerceiros: (cotacao.premioInformadoRctrDanosMoraisTerceiros != null ? cotacao.premioInformadoRctrDanosMoraisTerceiros : 0 ),
      lmiCasco: cotacao.lmiCasco,
      lmiAcessorios: cotacao.lmiAcessorios,
      lmiEquipamentos: cotacao.lmiEquipamentos,
      lmiBlindagem: cotacao.lmiBlindagem,
      lmiKitGas: cotacao.lmiKitGas,
      lmiAparelhosPort: cotacao.lmiAparelhosPort,
      lmiAppMorte: cotacao.lmiAppMorte,
      lmiDanosMorais: cotacao.lmiDanosMorais,
      lmiRctrDanosMoraisTerceiros: cotacao.lmiRctrDanosMoraisTerceiros,
      rctrClaus: cotacao.rctrClaus
    });
  }

}
