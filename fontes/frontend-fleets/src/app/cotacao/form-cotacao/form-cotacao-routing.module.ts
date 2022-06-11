import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCotacaoComponent } from './form-cotacao.component';

const routes: Routes = [
  { path: '', component: FormCotacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormCotacaoRoutingModule { }
