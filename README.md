# Desafio Front-end – Dashboard de Vendas - Angular 13

## Descrição

O **Dashboard de Vendas** é um projeto em Angular 13 que permite importar arquivos CSV de vendas, agregá-los por produto e gerar um **relatório interativo** com:

- Tabela de vendas agregadas
- Gráfico de barras por quantidade
- Cards de métricas (Total Geral e Produto Mais Vendido)
- Modal de detalhes do produto
- Exportação de agregados para CSV
- Layout responsivo usando PrimeNG e ngx-bootstrap

Ele segue boas práticas de Angular e é ideal para fins de portfólio ou prova de conceito para sistemas de BI.

---

## Demonstração

![Dashboard GIF](docs/dashboard-demo.gif)

---

## Tecnologias

| Tecnologia              | Versão      |
| ----------------------- | ----------- |
| Angular                 | 13.x        |
| PrimeNG                 | 13.0.0-rc.2 |
| ngx-bootstrap           | 6.2.0       |
| TypeScript              | 4.x         |
| HTML5 / CSS             | -           |
| APIs nativas do browser | FileReader  |

---

## Funcionalidades

| Funcionalidade                         | Status |
| -------------------------------------- | ------ |
| Upload de CSV com validação            | ✔️     |
| Parsing manual do CSV                  | ✔️     |
| Agregação de produtos                  | ✔️     |
| Filtro por produto                     | ✔️     |
| Cards de métricas                      | ✔️     |
| Gráfico de barras                      | ✔️     |
| Modal com detalhes                     | ✔️     |
| Exportar agregados para CSV            | ✔️     |
| Paginação e ordenação na tabela        | ✔️     |
| Formatação monetária pt-BR             | ✔️     |
| Persistência opcional via localStorage | ✔️     |
| Testes unitários básicos               | ✔️     |

---

## Instalação

**Passo 1 - Requisitos**

Antes de começar, você precisa ter instalado:

- **Node.js** (recomendado v16.x LTS)

  Baixe aqui: https://nodejs.org

  Verifique a versão:

  ```bash
  node -v
  ```

- **NPM** (geralmente já vem com o Node.js)

  Verifique a versão:

  ```bash
  npm -v
  ```

- **Angular CLI** versão 13

  Instale globalmente:

  ```bash
  npm install -g @angular/cli@13
  ```

  Verifique a versão:

  ```bash
  ng version
  ```

**Passo 2 - Clonar o repositório**

Abra um terminal ou prompt de comando e execute:

```bash
git clone https://github.com/CaiqueTuon/desafio-frontend.git
cd desafio-frontend
```

Isso vai baixar todo o código do projeto para a sua máquina.

**Passo 3 - Instalar dependências**

Dentro da pasta do projeto, execute:

```bash
npm install
```

Isso vai instalar todas as bibliotecas necessárias, incluindo Angular, PrimeNG, ngx-bootstrap, e dependências de build.

Certifique-se de que o package.json tem as versões corretas:

- Angular 13.x
- PrimeNG 13.0.0-rc.2
- ngx-bootstrap 6.2.0

**Passo 4 - Iniciar o servidor de desenvolvimento**

Para rodar o projeto localmente:

```bash
ng serve
```

O Angular CLI vai compilar o projeto e iniciar um servidor local.

O terminal mostrará algo como:

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

**Passo 5 - Abrir no navegador**

Abra o navegador de sua preferência e acesse:

```
http://localhost:4200
```

O dashboard será carregado com a tela inicial.

Você pode importar o CSV de exemplo para testar todas as funcionalidades.

---

## Como Usar

1. Clique em **"Importar CSV"** e selecione um arquivo `.csv` no formato:

```csv
produto,quantidade,preco_unitario
Camiseta,3,49.90
Calça,2,99.90
Camiseta,1,49.90
Tênis,1,199.90
```

2. O dashboard atualizará automaticamente com:

   - **Total Geral**
   - **Produto mais vendido**
   - Tabela agregada com filtros e ordenação
   - Gráfico de barras

3. Clique no ícone 👁 na tabela para abrir o modal de detalhes do produto.

4. Clique em **"Exportar CSV"** para baixar os agregados (produto, quantidade, valor total, total geral, produto mais vendido).

---

## Acessibilidade (ARIA) — instruções rápidas

Resumo: adicione atributos ARIA em todos os elementos interativos e que convey informação visualmente (botões, inputs, ícones, tabelas, modais, gráficos, links de download). Use textos claros e em pt-BR.

Checklist mínima:

- [ ] botões e ícones: aria-label (ex.: abrir modal, exportar CSV, ordenar)
- [ ] inputs (upload, busca, filtros): aria-label ou aria-labelledby
- [ ] tabelas: role="table", <thead> com <th scope="col"> e aria-sort quando aplicar ordenação
- [ ] modais: role="dialog", aria-modal="true", aria-labelledby (id do título), aria-describedby (id do conteúdo)
- [ ] gráficos: role="img" + aria-label ou aria-labelledby com resumo textual do gráfico
- [ ] elementos decorativos: aria-hidden="true"
- [ ] links de download: aria-label com indicação do conteúdo (ex.: "Exportar agregados para CSV")
- [ ] paginação/controles: aria-labels descritivos (ex.: "Próxima página", "Página 2")

Exemplos (usar nos templates Angular .html):

- Upload CSV

```html
<!-- filepath: c:\Users\tuonc\Documents\Desafio\desafio-frontend\README.md -->
<input type="file" accept=".csv" (change)="onFileSelected($event)" aria-label="Importar arquivo CSV de vendas" />
```

- Botão importar / exportar

```html
<!-- filepath: c:\Users\tuonc\Documents\Desafio\desafio-frontend\README.md -->
<button (click)="openImportModal()" aria-label="Abrir diálogo para importar CSV">Importar CSV</button>

<button (click)="exportAggregates()" aria-label="Exportar agregados para CSV">Exportar CSV</button>
```

- Ícone de visualizar detalhes na tabela

```html
<!-- filepath: c:\Users\tuonc\Documents\Desafio\desafio-frontend\README.md -->
<button class="icon-btn" (click)="openProductModal(produto)" aria-label="Ver detalhes do produto {{produto.nome}}">
  <i class="pi pi-eye" aria-hidden="true"></i>
</button>
```

- Tabela agregada (cabecalhos e ordenação)

```html
<!-- filepath: c:\Users\tuonc\Documents\Desafio\desafio-frontend\README.md -->
<table role="table" aria-label="Tabela de vendas agregadas por produto">
  <thead>
    <tr>
      <th scope="col">Produto</th>
      <th scope="col" aria-sort="none">Quantidade</th>
      <th scope="col">Valor total</th>
    </tr>
  </thead>
  <!-- ... -->
</table>
```

- Modal de produto

```html
<!-- filepath: c:\Users\tuonc\Documents\Desafio\desafio-frontend\README.md -->
<div role="dialog" aria-modal="true" aria-labelledby="produtoModalTitulo" aria-describedby="produtoModalDescricao">
  <h2 id="produtoModalTitulo">Detalhes — {{produto.nome}}</h2>
  <div id="produtoModalDescricao">
    <!-- conteúdo descritivo do produto -->
  </div>
</div>
```

- Gráfico de barras

```html
<!-- filepath: c:\Users\tuonc\Documents\Desafio\desafio-frontend\README.md -->
<div role="img" aria-label="Gráfico de barras mostrando quantidade vendida por produto. O maior produto é Camiseta com 4 unidades.">
  <!-- componente do gráfico -->
</div>
```

Notas finais:

- Prefira aria-labelledby quando houver título visível; use aria-label quando não houver rótulo visível.
- Manter aria-hidden="true" em ícones puramente decorativos.
- Execute auditoria com Lighthouse/axe e corrija textos de rótulos para contexto do usuário.

---

MIT © Caique Matias Tuon
