import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  @Output() csvLoaded = new EventEmitter<string>();

  error: string;
  fileName: string;

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.fileName = file.name;
    this.error = null;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.error = 'O arquivo deve estar no formato CSV';
      this.fileName = null;
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;
      this.csvLoaded.emit(content);
      localStorage.setItem('lastCSV', content);
    };

    reader.onerror = () => {
      this.error = 'Erro ao ler o arquivo';
      this.fileName = null;
    };

    reader.readAsText(file);
  }
}
