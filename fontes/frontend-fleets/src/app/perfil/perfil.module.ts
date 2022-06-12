import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilService } from './perfil.service';
import { PerfilComponent } from './perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [PerfilComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DividerModule
  ],
  exports: [PerfilComponent],
  providers: [PerfilService, MessageService, ConfirmationService]
})
export class PerfilModule { }
