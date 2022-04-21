import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuarioComponent } from './list-usuario.component';
import { UsuarioService } from '../usuario.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ListUsuarioRoutingModule } from './list-usuario-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';



@NgModule({
  declarations: [ListUsuarioComponent],
  imports: [
    CommonModule,
    ListUsuarioRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    DropdownModule,
    TriStateCheckboxModule
  ],
  exports: [ListUsuarioComponent],
  providers: [UsuarioService]
})
export class ListUsuarioModule { }
