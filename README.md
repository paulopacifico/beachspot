# BeachSpot

BeachSpot é um front-end para reserva de quadras de beach tennis. Navegue pelas
arenas, filtre por bairro e preço, escolha um horário disponível e confirme sua
reserva. Desenvolvido como um MVP acadêmico para a disciplina "Desenvolvimento
Front-end Avançado" da PUC-Rio.

## Stack de tecnologias

- React 19 + Vite 8
- React Router 7
- Tailwind CSS v4
- Vitest + Testing Library

## Como começar

### Pré-requisitos

- Node.js 20+ e npm

### Instalação

```bash
git clone <url-do-seu-repositorio>
cd beachspot
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

Abra a URL exibida no terminal (padrão: http://localhost:5173).

### Executar os testes

```bash
npm run test
```

### Build de produção

```bash
npm run build
npm run preview
```

## Estrutura do projeto

- `src/components/ui` e `src/components/layout` — componentes de apresentação reutilizáveis
- `src/features/courts` e `src/features/booking` — componentes de domínio e estado
- `src/pages` — pontos de entrada das rotas (Home, Courts, CourtDetail, Reservations, NotFound)
- `src/services` — camada de dados baseada em JSON que simula latência de requisição
- `src/hooks` — hooks compartilhados (`useFetch`)
- `src/data` — dados mockados em JSON

## Observações

Os dados são mockados: a camada de serviços lê arquivos JSON locais e simula
latência de rede, dispensando a necessidade de um backend. As reservas são
persistidas no navegador via `localStorage`.

Consulte `docs/adr/0001-mvp-architecture.md` para o registro de decisão de
arquitetura (ADR).
