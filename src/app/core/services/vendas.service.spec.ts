import { VendasService } from './vendas.service';
import { Venda } from '../models/venda.model';

describe('VendasService', () => {
  let service: VendasService;

  beforeEach(() => {
    service = new VendasService();
  });

  it('deve fazer o parse do CSV corretamente', () => {
    const csv = `produto,quantidade,preco_unitario
Camiseta,2,10
Camiseta,1,10`;

    const vendas = service.parseCSV(csv);

    expect(vendas.length).toBe(2);
    expect(vendas[0].produto).toBe('Camiseta');
    expect(vendas[0].quantidade).toBe(2);
  });

  it('deve agrupar corretamente', () => {
    const vendas: Venda[] = [
      { produto: 'A', quantidade: 2, precoUnitario: 10 },
      { produto: 'A', quantidade: 1, precoUnitario: 10 },
      { produto: 'B', quantidade: 1, precoUnitario: 5 }
    ];

    const result = service.agrupar(vendas);

    const a = result.find(v => v.produto === 'A')!;
    const b = result.find(v => v.produto === 'B')!;

    expect(a.quantidade).toBe(3);
    expect(a.valorTotal).toBe(30);

    expect(b.quantidade).toBe(1);
    expect(b.valorTotal).toBe(5);
  });
});
