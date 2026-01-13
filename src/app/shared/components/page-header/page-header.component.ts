import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <header>
      <h1>{{title}}</h1>
      <p *ngIf="subtitle">{{subtitle}}</p>
    </header>
  `,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle?: string;
}
