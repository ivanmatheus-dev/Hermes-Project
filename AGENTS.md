# AGENTS.md

## Projeto

Hermes e um site de vendas de sites e templates premium. A primeira tela precisa demonstrar, pela propria qualidade visual, que a marca entende de sites bonitos, elegantes e preparados para conversao.

O produto principal e uma vitrine de templates prontos, com possibilidade de vender esses templates para negocios que querem colocar uma presenca digital profissional no ar com rapidez. O projeto tambem pode oferecer sites sob medida e auditorias como caminhos comerciais secundarios.

## Convencoes Deste Arquivo

- Este arquivo fica na raiz do repositorio e vale para todo o projeto.
- Use Markdown simples, direto e focado em instrucoes acionaveis para agentes de codigo.
- Mantenha este arquivo atualizado quando a stack, scripts, arquitetura ou regras de entrega mudarem.
- Antes de concluir uma entrega que altere estrutura, design system, scripts, testes, rotas, templates, metadata ou fluxo comercial, revise se este arquivo tambem precisa mudar.
- Quando a entrega ja estiver commitada, compare com uma base real do historico em vez de depender de `git status`. Exemplo: `git diff --name-status <commit-antigo>..HEAD`.
- Se houver um subprojeto grande com convencoes proprias, crie um `AGENTS.md` mais especifico dentro da pasta desse subprojeto. O arquivo mais proximo do codigo alterado deve prevalecer.
- Nao coloque segredos, tokens, credenciais ou dados privados neste arquivo.

## Autoalimentacao

Este arquivo deve funcionar como memoria operacional do projeto. Ao final de uma mudanca relevante:

- Atualize `Arquitetura` quando arquivos, responsabilidades ou fluxo de renderizacao mudarem.
- Atualize `Stack` e `Comandos` quando dependencias, scripts ou ferramentas mudarem.
- Atualize `Design E Direcao Visual` quando tokens, tema, interacoes ou linguagem visual mudarem.
- Atualize `Regras De Teste` quando novos comportamentos observaveis passarem a ser responsabilidade da suite.
- Atualize `Registro Vivo` com um resumo curto da mudanca e a referencia de comparacao usada.
- Remova ou corrija instrucoes obsoletas; este arquivo deve orientar o proximo agente, nao preservar historia morta.

## Stack

Aplicacao principal:

- Next.js 15 com App Router.
- React 19.
- TypeScript em modo `strict`.
- Tailwind CSS v4 usando `@import "tailwindcss"` e tokens CSS em `src/styles/globals.css`.
- GSAP com `@gsap/react` para animacao de entrada do hero, movimento do logotipo, cursor customizado e zoom narrativo do mockup com `ScrollTrigger` pinado/scrubado.
- Fontes via `next/font/google`: `Inter` para texto de interface e `Cormorant Garamond` para titulos editoriais.
- Vitest, Testing Library, jsdom e jest-dom para testes de componentes.
- ESLint 9 com `next/core-web-vitals` e `next/typescript`.

Template atual:

- `public/templates/template 3` e um template independente em Vite + React 18.
- O template publicado usado no iframe fica em `public/templates/template 3/dist/index.html`.
- Ao editar ou rebuildar templates estaticos, garanta que os assets do `dist` usem caminhos relativos como `./assets/...`, nunca `/assets/...`, porque o template roda dentro de iframe em uma subpasta.

## Arquitetura

Estrutura principal:

- `src/app/layout.tsx`: define idioma `pt-BR`, metadata/SEO, Open Graph, robots, fontes globais e importa os estilos globais.
- `src/app/page.tsx`: entrada da home; renderiza a experiencia principal `HermesScrollHero`.
- `src/components/sections/HermesScrollHero.tsx`: orquestrador client-side da home; controla tema claro/escuro, scroll suave entre secoes, reveal por `IntersectionObserver`, cursor customizado, timeline GSAP de entrada e variaveis do zoom do mockup conforme progresso do scroll.
- `src/components/sections/HeroSection.tsx`: primeiro viewport, navegacao, overlay de entrada, toggle de tema, CTAs e mockup principal usado como mascara visual para a proxima secao.
- `src/components/sections/AboutSection.tsx`: secao `#sobre`; comunica valor comercial, confianca e metricas editoriais.
- `src/components/sections/HowItWorksSection.tsx`: secao `#como-funciona`; explica fluxo de escolha, briefing, ajuste visual e publicacao.
- `src/components/sections/TemplateShowcase.tsx`: secao `#templates`; destaque com iframe real do template principal, copy comercial do projeto e modal com preview em iframe.
- `src/components/sections/FAQSection.tsx`: secao `#faq`; perguntas em `details/summary`.
- `src/components/sections/ContactSection.tsx`: secao `#contato`; CTA final para WhatsApp e retorno aos projetos.
- `src/components/sections/hermesContent.ts`: conteudo estruturado compartilhado por navegacao, sobre, fluxo e FAQ.
- `src/components/brand/AnimatedHermesLogo.tsx`: logotipo SVG animavel.
- `src/components/ui/BrowserMockup.tsx`: mockup visual usado no hero; seu conteudo antecipa a secao `#sobre` com camadas esquerda/direita que se separam durante a transicao, sem duplicar a secao real.
- `src/hooks/usePrefersReducedMotion.ts`: hook client-side para respeitar `prefers-reduced-motion`.
- `src/styles/globals.css`: tokens de cor, tema escuro via `[data-theme="dark"]`, estilos globais, textura mineral, classes do zoom/mask do hero, reveal, cursor Hermes, escala de iframes e animacoes do modal.
- `src/__tests__/components/hermes-components.test.tsx`: testes de comportamento dos componentes da home, tema, secoes comerciais, contraste dos cards, dimensao do CTA final, modal, iframe e bundle estatico do template.
- `public/templates/template 3`: template vendido/exibido no carrossel.
- `hermes pencil.pen`: arquivo de apoio visual/prototipo do projeto.
- `images/generated-1778003525614.png`: asset gerado de apoio visual. Antes de trocar/remover, confirme onde ele e usado.
- `hermes-*.png`: capturas de referencia visual desktop/mobile/reduced-motion.

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
- Prefira manter responsabilidades separadas: orquestracao em `HermesScrollHero`, primeiro viewport em `HeroSection`, secoes comerciais em arquivos proprios, conteudo reutilizado em `hermesContent`, vitrine/modal em `TemplateShowcase`, componentes reutilizaveis em `ui`, identidade em `brand`, hooks em `hooks`.
- Antes de criar nova abstracao, verifique se ja existe um padrao local.
- Evite refactors amplos que nao fazem parte da tarefa.
- Para comportamento de browser, valide acessibilidade basica: labels, foco visivel, teclado, `prefers-reduced-motion`, `aria-pressed` no tema e fechamento de modal por botao/Escape.
- Ao alterar links de navegacao interna, mantenha os IDs das secoes e o fluxo de `scrollToSection` sincronizados.
- O tema usa `document.documentElement.dataset.theme` e `localStorage` com a chave `hermes-theme`; trate ambientes sem storage sem quebrar renderizacao/testes.
- Elementos com `data-reveal` dependem da logica em `HermesScrollHero`; se criar novas secoes animadas, use esse atributo e garanta fallback para reduced motion.
- Ao mexer em iframes de templates, confirme que a URL continua funcionando a partir da aplicacao principal.
- O link `https://wa.me/` em `ContactSection` e placeholder comercial; ao configurar producao, use o numero/caminho final validado.

## Regras De Teste

- Para mudancas em componentes da home, atualize ou adicione testes em `src/__tests__/components/hermes-components.test.tsx`.
- Teste comportamento observavel pelo usuario: renderizacao, cliques, tema claro/escuro, abertura/fechamento de modal, teclado, atributos importantes de iframe, links e secoes principais.
- Mocke GSAP e `@gsap/react` em testes unitarios; os testes nao devem depender de animacoes reais.
- Ao rebuildar templates estaticos, mantenha o teste que verifica assets relativos no bundle do iframe.
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

Cores e identidade em `src/styles/globals.css`:

Modo claro, identidade principal:

- `--mineral: #DDD8CD`: fundo principal mineral/champagne fosco.
- `--bone: #E7E3D8`: superficie clara quente.
- `--charcoal: #1A1D26`: texto principal e botoes fortes.
- `--stone: #5C5C56`: texto secundario.
- `--mist: #7E7E76`: labels, metadados e texto de baixa hierarquia.
- `--champagne: #C9A96E`: acento premium, linhas e foco.
- `--border: rgba(26, 29, 38, 0.12)`: bordas sutis.

Modo escuro, identidade noturna:

- `--mineral: #1A1D26`: fundo principal escuro, editorial e profundo.
- `--bone: #252832`: superficies elevadas em grafite quente.
- `--charcoal: #E7E3D8`: texto principal claro, reaproveitando o tom osseo do modo claro.
- `--stone: #C8C1B5`: texto secundario com contraste suave.
- `--mist: #A9A195`: labels, metadados e baixa hierarquia em cinza quente.
- `--champagne: #C9A96E`: acento constante da marca; preserva assinatura premium nos dois temas.
- `--border: rgba(231, 227, 216, 0.14)`: bordas claras discretas para separar superficies escuras.

Uso da paleta:

- Sempre prefira tokens CSS (`var(--mineral)`, `var(--bone)`, `var(--charcoal)`, etc.) em componentes e classes Tailwind arbitrarias.
- Evite codificar cores fixas em componentes; excecoes devem ser pontuais, decorativas e testadas nos dois modos.
- No modo claro, a sensacao deve ser mineral, champagne fosca, editorial e arejada.
- No modo escuro, a sensacao deve ser noturna, sofisticada e mais cinematica, com champagne usado como luz de acabamento, nao como bloco dominante.
- Texturas, linhas e fundos radiais devem continuar sutis. O modo escuro usa grade quase imperceptivel e brilho champagne baixo para manter profundidade sem parecer neon.

Tipografia:

- `Inter`: texto de interface, navegacao, botoes e corpo.
- `Cormorant Garamond`: titulos, marca e frases editoriais.
- Use caixa alta com tracking amplo apenas em labels pequenos e CTAs, mantendo boa legibilidade.

Interacao:

- Animacoes devem ser suaves e elegantes, sem excesso.
- Sempre respeite `prefers-reduced-motion`.
- Botoes devem ter hover/focus perceptivel, mas discreto.
- Modais devem funcionar por mouse, touch e teclado quando aplicavel.
- O site atual tem modo claro/escuro. Novas superficies devem usar tokens CSS, nao cores fixas, salvo detalhes pontuais e justificados.
- O cursor customizado so deve aparecer em ponteiro fino e fora de reduced motion; nao force cursor especial em mobile.
- Reveals de scroll devem ser discretos, com conteudo totalmente visivel quando reduced motion estiver ativo.
- O mockup do hero funciona como mascara narrativa: ao scrollar, `ScrollTrigger` pina a hero com espacamento normal, amplia o browser, separa o conteudo interno para esquerda/direita e revela a secao `#sobre` real em tamanho normal por tras da hero. A secao `#sobre` usa `about-mask-reveal` para compensar visualmente o espacamento do pin; nao duplique `#sobre` dentro do mockup. Mantenha o fallback reduced motion sem pin nem transformacao.
- A home atual e uma landing completa: hero, sobre, como funciona, projetos/templates, FAQ e contato. Preserve a narrativa comercial de venda de sites prontos, com sob medida e auditoria como caminhos secundarios.

## Registro Vivo

- 2026-05-06, comparacao `HEAD..worktree`: cards das secoes `#sobre` e `#como-funciona` voltaram a seguir os tokens do tema no estado normal e so invertem cores no hover; textos internos ganharam contraste, o CTA final foi compactado para caber em um viewport, a vitrine removeu o carrossel secundario e a timeline do zoom agora usa `fromTo` com estado inicial explicito para restaurar textos ao scrollar para cima.
- 2026-05-06, comparacao `HEAD..worktree`: o hero ganhou zoom narrativo do `BrowserMockup` com `ScrollTrigger` pinado/scrubado, fazendo o usuario entrar na div antes da secao `#sobre`; o browser agora esconde a barra, separa os paineis internos para esquerda/direita, remove paddings/raios durante a entrada, desvanece o papel da hero e revela a secao `#sobre` real por tras da mascara sem duplicar conteudo. O pin mantem espacamento normal e `about-mask-reveal` evita que a secao termine cortada.
- 2026-05-05, comparacao `903dfe2..3472df5`: a home deixou de ser uma experiencia centrada apenas no hero com ScrollTrigger e virou uma landing completa. Entraram secoes `HeroSection`, `AboutSection`, `HowItWorksSection`, `FAQSection`, `ContactSection`, conteudo centralizado em `hermesContent`, tema claro/escuro persistido em `localStorage`, reveal por `IntersectionObserver`, cursor Hermes para ponteiro fino, metadata SEO/Open Graph mais completa, mockup visual refinado e vitrine de projetos com iframe destacado e modal.
- Ao fazer a proxima entrega grande, acrescente uma linha acima desta com data, faixa de commits comparada e mudancas que afetam manutencao futura.

## Documentacao Externa

- Quando a tarefa envolver API, configuracao, migracao ou comportamento especifico de uma biblioteca/framework, consulte documentacao atual antes de implementar.
- Para Next.js, React, Tailwind, Vitest, Testing Library, GSAP, Vite ou outras dependencias, prefira Context7 MCP quando disponivel.
- Nao use documentacao externa para substituir a leitura do codigo local; primeiro entenda os padroes existentes do projeto.
