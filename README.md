# OM30 - Dashboard para cadastro de pacientes

## Tecnologias Utilizadas

## Requisitos Atendidos
- [x]  Obrigatoriamente para o desenvolvimento do front-end usar o framework Vue.js.
- [x]  Deve conter uma listagem de paciente com busca, do qual deve-se permitir a listagem, adição, edição, visualização e exclusão de cada um dos pacientes.
- [x]  Utilizar para chamadas de API fake as ferramentas Json Place Holder, Json Server ou Mirage JS.
- [x]  Login simplificado de usuários;
- [x] Cadastro de novos pacientes, contendo os campos, respectivas validações e máscaras: "*" obrigatório
  - [x] Foto do Paciente; [PARCIALMENTE]
  - [x] Nome Completo do Paciente*;
  - [x] Nome Completo da Mãe*;
  - [x] Data de Nascimento*;
  - [x] CPF* (com validação);
  - [x] CNS*(cartão nacional de saúde, com validação);
  - [x] Endereço completo*;

## Diferenciais
- [x] Utilizar algum padrão para commits;
  - Commits Semânticos
- [] Realização de validações completas (utilizar biblioteca de validação, ex: yup);
  - No projeto estou utilizando Typescript, porem nem tudo está com tipagem devido ao tempo. (Cabe consideração do avaliador)
- [x] Componentização de estruturas reutilizáveis;
  - Apesar do projeto estar dividido em vários componentes que são utilizados nas páginas, ainda poderiam ser divididos em sub componentes e componentes reutilizaveis, talvez utilizando Atomic Design, no entanto, devido a tantas outras tarefas a serem realizadas preferi não ir muito além neste quesito. (Cabe consideração do avaliador)

## Outros diferenciais

- [x] Utilização do Tailwindcss
- [x] Utilização da Composition API com Typescript
- [x] Utilização do Vuex
- [x] Utilização do Axios
## Observações e considerações finais

- 1 - Sobre Upload de fotos - Há alguma limitação do Miragejs que ocasiona um erro que eu poderia corrigir em outra situação, mas se tratando de um teste resolvi focar em outros aspectos da aplicação.
  - [x] Isso foi resolvido utilizando uma URL que retorna uma imagem de placeholder baseado no `name` do paciente.
- 2 - Sobre integração com API ViaCep - Por alguma limitação ou falta de alguma configuração especifica do Miragejs não foi possível realizar chamada para APIs externas.
  - [x] Como resolução parcial portanto foi nescessário fazer um Mock dessa chamada. Imagino que isso seja suficiente, tendo em vista que a ideia é apenas simular a chamada para uma API.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
