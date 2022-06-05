import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCotacaoRoutingModule } from './list-cotacao-routing.module';
import { ListCotacaoComponent } from './list-cotacao.component';
import { CotacaoService } from '../cotacao.service';


@NgModule({
  declarations: [ListCotacaoComponent],
  imports: [
    CommonModule,
    ListCotacaoRoutingModule
  ],
  exports:[ListCotacaoComponent],
  providers: [CotacaoService]

})
export class ListCotacaoModule { }
