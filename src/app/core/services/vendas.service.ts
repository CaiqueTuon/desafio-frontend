import { Injectable } from '@angular/core';
import { Venda, VendaAgregada } from '../models/venda.model';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  parseCSV(csv: string): Venda[] {
    const linhas = csv.trim().split('\n');

    if (linhas.length < 2) {
      throw new Error('CSV vazio ou inválido');
    }

    const header = linhas.shift()?.trim();
    if (header !== 'produto,quantidade,preco_unitario') {
      throw new Error(
        'Cabeçalho inválido. Esperado: produto,quantidade,preco_unitario'
      );
    }

    const vendas: Venda[] = linhas.map((linha, index) => {
      const colunas = linha.split(',');

      if (colunas.length !== 3) {
        throw new Error(`Linha ${index + 2} inválida`);
      }

      const produto = colunas[0].trim();
      const quantidade = Number(colunas[1]);
      const precoUnitario = Number(colunas[2]);

      if (!produto || isNaN(quantidade) || isNaN(precoUnitario)) {
        throw new Error(`Dados inválidos na linha ${index + 2}`);
      }

      return { produto, quantidade, precoUnitario };
    });

    return vendas;
  }

  agrupar(vendas: Venda[]): VendaAgregada[] {
    const mapa = new Map<string, VendaAgregada>();

    vendas.forEach((venda) => {
      if (!mapa.has(venda.produto)) {
        mapa.set(venda.produto, {
          produto: venda.produto,
          quantidade: 0,
          valorTotal: 0,
        });
      }

      const item = mapa.get(venda.produto)!;
      item.quantidade += venda.quantidade;
      item.valorTotal += venda.quantidade * venda.precoUnitario;
    });

    return Array.from(mapa.values());
  }

  calcularTotalGeral(lista: VendaAgregada[]): number {
    return lista.reduce((soma, item) => soma + item.valorTotal, 0);
  }

  obterMaisVendido(lista: VendaAgregada[]): VendaAgregada | null {
    if (!lista.length) return null;

    return lista.reduce((maisVendido, atual) =>
      atual.quantidade > maisVendido.quantidade ? atual : maisVendido
    );
  }
}
