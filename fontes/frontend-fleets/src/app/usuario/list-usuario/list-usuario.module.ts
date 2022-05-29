import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuarioComponent } from './list-usuario.component';
import { UsuarioService } from '../usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ListUsuarioRoutingModule } from './list-usuario-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [ListUsuarioComponent],
  imports: [
    CommonModule,
    ListUsuarioRoutingModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    TriStateCheckboxModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    InputMaskModule,
    CalendarModule,
    CheckboxModule
  ],
  exports: [ListUsuarioComponent],
  providers: [UsuarioService, MessageService, ConfirmationService]
})
export class ListUsuarioModule { }
