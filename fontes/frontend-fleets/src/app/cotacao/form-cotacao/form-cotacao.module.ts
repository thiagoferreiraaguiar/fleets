import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormCotacaoRoutingModule } from './form-cotacao-routing.module';
import { FormCotacaoComponent } from './form-cotacao.component';
import { CotacaoService } from '../cotacao.service';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [FormCotacaoComponent],
  imports: [
    CommonModule,
    FormCotacaoRoutingModule,
    PanelModule,
    FileUploadModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    ProgressBarModule
  ],
  exports: [FormCotacaoComponent],
  providers: [CotacaoService, MessageService]
})
export class FormCotacaoModule { }
