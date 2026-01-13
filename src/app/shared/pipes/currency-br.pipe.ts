import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBR'
})
export class CurrencyBrPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return 'R$ 0,00';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
