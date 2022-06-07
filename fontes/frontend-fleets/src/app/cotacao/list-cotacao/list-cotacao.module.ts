import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCotacaoRoutingModule } from './list-cotacao-routing.module';
import { ListCotacaoComponent } from './list-cotacao.component';
import { CotacaoService } from '../cotacao.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListCotacaoComponent],
  imports: [
    CommonModule,
    ListCotacaoRoutingModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    TableModule
  ],
  exports:[ListCotacaoComponent],
  providers: [CotacaoService]

})
export class ListCotacaoModule { }
