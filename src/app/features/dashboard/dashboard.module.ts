import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

import { ModalModule } from 'ngx-bootstrap/modal';

import { DashboardComponent } from './dashboard.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { UploadComponent } from './upload/upload.component';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';

import { CurrencyBrPipe } from '../../shared/pipes/currency-br.pipe';

@NgModule({
  declarations: [
    CurrencyBrPipe,
    DashboardComponent,
    DetalheComponent,
    UploadComponent,
    PageHeaderComponent,
  ],
  imports: [
    ButtonModule,
    CardModule,
    ChartModule,
    CommonModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    InputTextModule,
    ModalModule.forRoot(),
    TableModule,
    TagModule,
    ToolbarModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
