# AGENTS.md

## Projeto

Hermes e um site de vendas de sites e templates premium. A primeira tela precisa demonstrar, pela propria qualidade visual, que a marca entende de sites bonitos, elegantes e preparados para conversao.

O produto principal e uma vitrine de templates prontos, com possibilidade de vender esses templates para negocios que querem colocar uma presenca digital profissional no ar com rapidez. O projeto tambem pode oferecer sites sob medida e auditorias como caminhos comerciais secundarios.

## Convencoes Deste Arquivo

- Este arquivo fica na raiz do repositorio e vale para todo o projeto.
- Use Markdown simples, direto e focado em instrucoes acionaveis para agentes de codigo.
- Mantenha este arquivo atualizado quando a stack, scripts, arquitetura ou regras de entrega mudarem.
- Se houver um subprojeto grande com convencoes proprias, crie um `AGENTS.md` mais especifico dentro da pasta desse subprojeto. O arquivo mais proximo do codigo alterado deve prevalecer.
- Nao coloque segredos, tokens, credenciais ou dados privados neste arquivo.

## Stack

Aplicacao principal:

- Next.js 15 com App Router.
- React 19.
- TypeScript em modo `strict`.
- Tailwind CSS v4 usando `@import "tailwindcss"` e tokens CSS em `src/styles/globals.css`.
- GSAP com `@gsap/react` e `ScrollTrigger` para animacoes do hero.
- Fontes via `next/font/google`: `Inter` para texto de interface e `Cormorant Garamond` para titulos editoriais.
- Vitest, Testing Library, jsdom e jest-dom para testes de componentes.
- ESLint 9 com `next/core-web-vitals` e `next/typescript`.

Template atual:

- `public/templates/template 3` e um template independente em Vite + React 18.
- O template publicado usado no iframe fica em `public/templates/template 3/dist/index.html`.
- Ao editar ou rebuildar templates estaticos, garanta que os assets do `dist` usem caminhos relativos como `./assets/...`, nunca `/assets/...`, porque o template roda dentro de iframe em uma subpasta.

## Arquitetura

Estrutura principal:

- `src/app/layout.tsx`: define idioma `pt-BR`, metadata, fontes globais e importa os estilos globais.
- `src/app/page.tsx`: entrada da home; renderiza a experiencia principal `HermesScrollHero`.
- `src/components/sections/HermesScrollHero.tsx`: hero principal, navegacao, CTAs e animacoes GSAP de scroll.
- `src/components/sections/TemplateShowcase.tsx`: secao `#templates`, carrossel horizontal, cards de templates e modal com iframe.
- `src/components/brand/AnimatedHermesLogo.tsx`: logotipo SVG animavel.
- `src/components/ui/BrowserMockup.tsx`: mockup visual usado no hero.
- `src/hooks/usePrefersReducedMotion.ts`: hook client-side para respeitar `prefers-reduced-motion`.
- `src/styles/globals.css`: tokens de cor, estilos globais, textura mineral, scroll do carrossel e animacoes do modal.
- `src/__tests__/components/hermes-components.test.tsx`: testes de comportamento dos componentes da home.
- `public/templates/template 3`: template vendido/exibido no carrossel.

Dependencias e saidas geradas:

- Nao edite `node_modules/`.
- Nao edite `.next/`.
- Evite editar arquivos gerados em `dist/` manualmente, exceto quando a correcao for explicitamente sobre o bundle estatico servido pelo iframe. Prefira corrigir a origem e rebuildar quando for viavel.

## Comandos

Instalar dependencias:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Abrir localmente:

```text
http://localhost:3000
```

Rodar testes:

```bash
npm test
```

Rodar lint:

```bash
npm run lint
```

Build de producao:

```bash
npm run build
```

Servir build de producao:

```bash
npm run start
```

Comandos do template atual, quando for necessario trabalhar diretamente nele:

```bash
cd "public/templates/template 3"
npm install
npm run dev
npm run build
npm run preview
```

## Regras De Implementacao

- Preserve a linguagem principal em portugues do Brasil.
- Use componentes React funcionais e TypeScript.
- Use o alias `@/` para imports vindos de `src`.
- Prefira manter responsabilidades separadas: hero em `HermesScrollHero`, vitrine/modal em `TemplateShowcase`, componentes reutilizaveis em `ui`, identidade em `brand`, hooks em `hooks`.
- Antes de criar nova abstracao, verifique se ja existe um padrao local.
- Evite refactors amplos que nao fazem parte da tarefa.
- Para comportamento de browser, valide acessibilidade basica: labels, foco visivel, teclado e `prefers-reduced-motion`.
- Ao mexer em iframes de templates, confirme que a URL continua funcionando a partir da aplicacao principal.

## Regras De Teste

- Para mudancas em componentes da home, atualize ou adicione testes em `src/__tests__/components/hermes-components.test.tsx`.
- Teste comportamento observavel pelo usuario: renderizacao, cliques, abertura/fechamento de modal, teclado, atributos importantes de iframe e links.
- Mocke GSAP em testes unitarios; os testes nao devem depender de animacoes reais.
- Depois de alterar codigo de aplicacao, rode pelo menos:

```bash
npm test
npm run lint
```

- Antes de considerar uma entrega pronta, rode tambem:

```bash
npm run build
```

- Se o ambiente Windows retornar `EPERM` em `.next/trace`, encerre processos Next abertos e limpe/recrie `.next` somente com cuidado. Nao use comandos destrutivos sem confirmar o alvo.

## Regras De Seguranca

- Nunca commite tokens, chaves de API, credenciais, cookies ou dados privados.
- Nao exponha variaveis sensiveis no cliente. Em Next.js, qualquer variavel `NEXT_PUBLIC_*` fica disponivel no browser.
- Evite `dangerouslySetInnerHTML`. Se for inevitavel, sanitize a origem do conteudo.
- Nao aceite URLs externas para iframes sem revisar origem, finalidade e riscos de tracking/phishing.
- Para iframes de templates externos ou de terceiros, use `sandbox`, `referrerPolicy` e uma politica clara de permissao quando aplicavel.
- Validar dados de formularios no cliente e no servidor quando formularios reais forem adicionados.
- Nao altere `package-lock.json` sem uma mudanca intencional em dependencias.

## Design E Direcao Visual

Publico-alvo:

- Empreendedores, profissionais liberais, clinicas, negocios locais e marcas pequenas ou medias que querem comprar um site pronto com aparencia premium.
- O site deve transmitir confianca, bom gosto, acabamento e clareza comercial.

Estilo:

- Visual editorial, elegante, premium e contido.
- Evite estetica generica de landing page com muitos gradientes chamativos.
- Prefira composicoes espacadas, tipografia forte, linhas finas, textura sutil e movimento suave.
- O primeiro viewport deve parecer uma prova de capacidade visual, nao apenas uma apresentacao textual.

Cores principais em `src/styles/globals.css`:

- `--mineral: #DDD8CD`: fundo principal mineral/champagne fosco.
- `--bone: #E7E3D8`: superficie clara quente.
- `--charcoal: #1A1D26`: texto principal e botoes fortes.
- `--stone: #5C5C56`: texto secundario.
- `--mist: #7E7E76`: labels, metadados e texto de baixa hierarquia.
- `--champagne: #C9A96E`: acento premium, linhas e foco.
- `--border: rgba(26, 29, 38, 0.12)`: bordas sutis.

Tipografia:

- `Inter`: texto de interface, navegacao, botoes e corpo.
- `Cormorant Garamond`: titulos, marca e frases editoriais.
- Use caixa alta com tracking amplo apenas em labels pequenos e CTAs, mantendo boa legibilidade.

Interacao:

- Animacoes devem ser suaves e elegantes, sem excesso.
- Sempre respeite `prefers-reduced-motion`.
- Botoes devem ter hover/focus perceptivel, mas discreto.
- Carrosseis e modais devem funcionar por mouse, touch e teclado quando aplicavel.

## Documentacao Externa

- Quando a tarefa envolver API, configuracao, migracao ou comportamento especifico de uma biblioteca/framework, consulte documentacao atual antes de implementar.
- Para Next.js, React, Tailwind, Vitest, Testing Library, GSAP, Vite ou outras dependencias, prefira Context7 MCP quando disponivel.
- Nao use documentacao externa para substituir a leitura do codigo local; primeiro entenda os padroes existentes do projeto.
