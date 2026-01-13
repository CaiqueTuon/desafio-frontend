export class Venda {
  produto: string;
  quantidade: number;
  precoUnitario: number;

  constructor(produto: string, quantidade: number, precoUnitario: number) {
    this.produto = produto;
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }
}

export class VendaAgregada {
  produto: string;
  quantidade: number;
  valorTotal: number;

  constructor(produto: string, quantidade: number, valorTotal: number) {
    this.produto = produto;
    this.quantidade = quantidade;
    this.valorTotal = valorTotal;
  }
}
