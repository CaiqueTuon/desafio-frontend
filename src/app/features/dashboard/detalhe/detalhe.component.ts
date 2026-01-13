import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { VendaAgregada } from 'src/app/core/models/venda.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
})
export class DetalheComponent {
  @Input() venda!: VendaAgregada;

  constructor(public bsModalRef: BsModalRef) {}

  fechar(): void {
    this.bsModalRef.hide();
  }
}
