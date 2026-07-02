# Front Jurídico - Consulta de Processos

Este é um projeto [Next.js](https://nextjs.org/) focado na consulta e visualização de processos jurídicos provenientes das bases **TCE** (Tribunal de Contas do Estado) e **TJPB** (Tribunal de Justiça da Paraíba).

A aplicação foi projetada com foco exclusivo em **leitura de dados (GET)**, provendo uma interface institucional, moderna e responsiva. Não há operações de criação, edição ou remoção de dados (mutations).

## 🏗 Arquitetura e Organização de Pastas

O projeto segue uma arquitetura modularizada, baseada no **App Router** do Next.js, organizada nas seguintes camadas:

- **`src/app/`**: Contém o roteamento da aplicação, layouts globais (`layout.tsx`), página inicial de dashboard (`page.tsx`) e os endpoints simulados (`api/`).
- **`src/feature/processes/`**: Domínio centralizado da aplicação. Aqui residem:
  - **Componentes específicos**: `ProcessListTable`, `ProcessDetailView`, `MovementsTimeline`.
  - **Hooks**: Lógica de fetching e estado isolada (`useProcessList`, `useProcessDetails`), utilizando tratamentos para evitar problemas de concorrência de renderização no React.
  - **Tipagens**: Definições de contratos TypeScript (Tipos para Processos e Movimentações).
  - **Cliente API**: Funções baseadas em `fetch` para interagir com o backend.
- **`src/shared/`**: Componentes puramente visuais e genéricos, sem regra de negócio acoplada:
  - **UI**: `Badge`, `Card`, `Table`, `Icons`.
  - **Feedbacks de Estado**: `Skeleton` (Loading), `EmptyState`, `ErrorState`.

## 🚀 Funcionalidades e Páginas Implementadas

- **`/` (Dashboard)**: Uma visão geral com métricas (mockadas) e atalhos rápidos para as listas de processos.
- **`/processes/tce`**: Página de listagem dos processos do TCE, utilizando tabelas e badges de status.
- **`/processes/tjpb`**: Página de listagem dos processos do TJPB.
- **`/processes/[id]`**: Página de detalhamento de um processo específico. Inclui informações como Tribunal, Natureza, Valor (quando aplicável) e a Linha do Tempo (Timeline) das movimentações do processo.

## 🎨 UX/UI e Tratamento de Estados

A aplicação cobre todos os cenários principais de experiência do usuário:
- **Estados de Carregamento**: Apresentação fluida via Skeletons, evitando "pulos" de layout.
- **Estados Vazios (Empty States)**: Telas ilustradas indicando a ausência de registros de forma amigável.
- **Estados de Erro**: Componentes informativos com opção de tentativa de recarregamento caso haja falha de API.
- **Responsividade**: Interface plenamente adaptável para Mobile, Tablet e Desktop.
- **Design Institucional**: Uso de cores sóbrias, fontes legíveis (Inter/Geist) e boa hierarquia visual.

## 🔌 API Mock (Endpoints)

O projeto conta com endpoints emulados utilizando Next.js Route Handlers (`src/app/api/ processes/...`), provendo os dados no exato formato esperado:

- `GET /api/processes/tce`
- `GET /api/processes/tjpb`
- `GET /api/processes/[id]`
- `GET /api/processes/[id]/movements`

*(Nota: Para integrar com um backend real, basta atualizar as URLs base no arquivo `src/feature/processes/api/processes.ts` e remover a pasta `api/` do Next.js)*

## 🛠 Como Executar Localmente

Certifique-se de ter o Node.js instalado.

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação.

---
**Status do Projeto**: Concluído e Validado (Compilação e Linter sem erros).
