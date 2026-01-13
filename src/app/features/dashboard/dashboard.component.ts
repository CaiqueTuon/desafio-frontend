import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VendasService } from '../../core/services/vendas.service';
import { VendaAgregada } from '../../core/models/venda.model';
import { DetalheComponent } from './detalhe/detalhe.component';

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string[];
  }>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  vendas: VendaAgregada[] = [];
  filtro = '';
  totalGeral = 0;
  maisVendido?: VendaAgregada;
  modalRef?: BsModalRef;
  chartData?: ChartData;

  constructor(
    private vendasService: VendasService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    const csv = localStorage.getItem('lastCSV');
    if (csv) {
      this.processarCSV(csv);
    }
  }

  get vendasFiltradas(): VendaAgregada[] {
    return this.vendas.filter((v) =>
      v.produto.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  downloadCSV(): void {
    const csv = this.exportarCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-vendas.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  onCSVLoaded(csv: string): void {
    this.processarCSV(csv);
  }

  abrirDetalhe(venda: VendaAgregada): void {
    this.modalRef = this.modalService.show(DetalheComponent, {
      class: 'modal-dialog-centered modal-md',
      initialState: { venda },
    });
  }

  private montarGrafico(): void {
    this.chartData = {
      labels: this.vendas.map((v) => v.produto),
      datasets: [
        {
          label: 'Quantidade',
          data: this.vendas.map((v) => v.quantidade),
          backgroundColor: this.vendas.map(() => '#42A5F5'),
        },
      ],
    };
  }

  private processarCSV(csv: string): void {
    try {
      const vendas = this.vendasService.parseCSV(csv);
      this.vendas = this.vendasService.agrupar(vendas);
      this.totalGeral = this.vendasService.calcularTotalGeral(this.vendas);
      this.maisVendido =
        this.vendasService.obterMaisVendido(this.vendas) ?? undefined;
      this.montarGrafico();
      localStorage.setItem('lastCSV', csv);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
    }
  }

  private exportarCSV(): string {
    let csv = 'produto,quantidade,valor_total\n';

    this.vendasFiltradas.forEach((v) => {
      csv += `${v.produto},${v.quantidade},${v.valorTotal.toFixed(2)}\n`;
    });

    csv += `TOTAL,,${this.totalGeral.toFixed(2)}\n`;

    if (this.maisVendido) {
      csv += `MAIS_VENDIDO,${this.maisVendido.produto},${this.maisVendido.quantidade}\n`;
    }

    return csv;
  }
}
