import { FormsModule } from '@angular/forms';
import { PerfilService } from '../perfil-service';
import { ListPerfilComponent } from './list-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPerfilRoutingModule } from './list-perfil-routing.module';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ListPerfilComponent],
  imports: [
    CommonModule,
    ListPerfilRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    TableModule
  ],
  exports: [ListPerfilComponent],
  providers: [PerfilService, MessageService, ConfirmationService]
})
export class ListPerfilModule { }
