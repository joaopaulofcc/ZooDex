// Caminho: postcss.config.js

// =================================================================================================
// ARQUIVO: postcss.config.js
// PROPÓSITO: Este é o arquivo de configuração para o PostCSS.
//
// O QUE É POSTCSS?
//   PostCSS é uma ferramenta para transformar CSS usando plugins JavaScript.
//   Pense nele como um "transformador" ou "processador" para seu código CSS.
//   Você escreve seu CSS (ou usa um framework como Tailwind que gera CSS), e o PostCSS,
//   junto com os plugins que você configurar, pode fazer várias coisas úteis:
//
//   1. Adicionar Prefixos de Navegador (Vendor Prefixes):
//      Algumas propriedades CSS mais novas precisam de prefixos para funcionar em
//      navegadores específicos (ex: `-webkit-transform`, `-moz-transform`).
//      O plugin 'autoprefixer' (que usamos aqui) faz isso automaticamente, garantindo
//      que seu CSS funcione no maior número de navegadores possível.
//
//   2. Permitir o Uso de Sintaxe CSS Moderna:
//      Plugins podem permitir que você use recursos CSS que ainda não são totalmente
//      suportados por todos os navegadores, transformando-os em CSS compatível.
//
//   3. Integrar Frameworks CSS (como Tailwind CSS):
//      Tailwind CSS usa PostCSS como parte do seu processo de build para processar
//      suas diretivas (como `@tailwind`, `@apply`) e gerar o CSS final.
//
//   4. Otimizar e Minificar CSS:
//      Plugins podem limpar, otimizar e reduzir o tamanho do seu arquivo CSS final.
//
// COMO FUNCIONA NESTE PROJETO (geralmente com Create React App ou Vite):
//   Quando você roda o comando de build (ex: `npm run build` ou `pnpm build`),
//   o sistema de build (Webpack, por baixo dos panos no Create React App, ou Vite)
//   encontra este arquivo `postcss.config.js`. Ele então usa o PostCSS e os plugins
//   listados aqui para processar todos os arquivos CSS do seu projeto
//   (incluindo aqueles gerados pelo Tailwind a partir do `tailwind.config.js`
//   e seus arquivos `.css` ou `.module.css`).
//
// SINTAXE DO ARQUIVO:
//   Este arquivo é um módulo JavaScript (usando a sintaxe 'export default' do ES6 Modules,
//   que é comum em projetos modernos, ou poderia ser `module.exports` em sintaxe CommonJS
//   dependendo da configuração do projeto).
//   Ele exporta um objeto de configuração.
// =================================================================================================

// 'export default' torna este objeto o valor principal exportado pelo módulo.
// Este objeto de configuração será lido pelo PostCSS.
export default {
  // A propriedade 'plugins' é um objeto (ou um array) que lista os plugins
  // do PostCSS que queremos usar e suas configurações.
  // A ordem dos plugins pode ser importante em alguns casos, pois eles
  // processam o CSS em sequência.
  plugins: {
    // --- PLUGIN 1: tailwindcss ---
    // CHAVE: 'tailwindcss'
    // VALOR: {} (um objeto vazio, indicando que estamos usando as configurações padrão do plugin Tailwind CSS)
    //
    // PROPÓSITO: Este plugin integra o Tailwind CSS ao processo de build do PostCSS.
    //            Ele é responsável por:
    //            - Encontrar as diretivas do Tailwind no seu CSS (como `@tailwind base;`,
    //              `@tailwind components;`, `@tailwind utilities;` que você geralmente coloca
    //              no seu arquivo CSS principal, como `src/index.css`).
    //            - Processar seu arquivo `tailwind.config.js` para aplicar suas customizações de tema.
    //            - "Escanear" seus arquivos (definidos na seção 'content' do `tailwind.config.js`)
    //              para descobrir quais classes utilitárias do Tailwind você realmente usou.
    //            - Gerar apenas o CSS necessário para essas classes, mantendo o arquivo final pequeno.
    //
    // Se você não estivesse usando Tailwind CSS, este plugin não estaria aqui.
    // Se o plugin 'tailwindcss' precisasse de alguma configuração específica DENTRO do PostCSS
    // (o que é raro, já que a maior parte da configuração do Tailwind vai no `tailwind.config.js`),
    // você colocaria essas opções dentro do objeto `{}`.
    // Por exemplo:
    //   'tailwindcss': { config: './caminho/para/outro/tailwind.config.js' },
    // Mas geralmente, um objeto vazio `{}` é suficiente, pois ele automaticamente
    // procura por um arquivo `tailwind.config.js` na raiz do projeto.
    tailwindcss: {},

    // --- PLUGIN 2: autoprefixer ---
    // CHAVE: 'autoprefixer'
    // VALOR: {} (um objeto vazio, indicando que estamos usando as configurações padrão do Autoprefixer)
    //
    // PROPÓSITO: O Autoprefixer é um plugin PostCSS que adiciona automaticamente
    //            "prefixos de fornecedor" (vendor prefixes) ao seu código CSS.
    //            Vendor prefixes são pequenas adições aos nomes de propriedades CSS
    //            (como `-webkit-`, `-moz-`, `-ms-`, `-o-`) que são (ou foram) necessárias
    //            para que certas funcionalidades CSS funcionem corretamente em navegadores específicos
    //            antes de se tornarem totalmente padronizadas.
    //
    //            Exemplo: Se você escrever `display: flex;` no seu CSS, o Autoprefixer pode
    //            adicionar `-webkit-display: flex;` e `-ms-flexbox: flex;` se for
    //            necessário para a compatibilidade com os navegadores que você quer suportar.
    //
    // COMO ELE SABE QUAIS PREFIXOS ADICIONAR?
    //   O Autoprefixer usa dados do site "Can I use" (caniuse.com) e a configuração
    //   de "browserslist" do seu projeto para determinar quais prefixos são necessários.
    //   A configuração "browserslist" geralmente está no seu arquivo `package.json`
    //   ou em um arquivo separado (`.browserslistrc`). Ela define quais navegadores
    //   e suas versões você deseja suportar.
    //   Exemplo de browserslist no package.json:
    //     "browserslist": {
    //       "production": [ ">0.2%", "not dead", "not op_mini all" ],
    //       "development": [ "last 1 chrome version", "last 1 firefox version", "last 1 safari version" ]
    //     }
    //   Com base nisso, o Autoprefixer adiciona apenas os prefixos realmente necessários.
    //
    // Assim como o plugin do Tailwind, se o Autoprefixer precisasse de configurações específicas
    // (o que também é raro, pois ele pega as informações do browserslist), elas iriam
    // dentro do objeto `{}`.
    autoprefixer: {},

    // Poderíamos adicionar mais plugins PostCSS aqui se necessário.
    // Por exemplo, para minificar o CSS na build de produção:
    //   'cssnano': process.env.NODE_ENV === 'production' ? {} : false,
    // (Isso habilitaria o cssnano apenas em produção).
    // No entanto, ferramentas como Create React App e Vite geralmente já cuidam
    // da minificação de CSS em produção automaticamente.
  }, // Fim da propriedade 'plugins'
}; // Fim do objeto de configuração exportado

/* =================================================================================================
   EM RESUMO PARA OS ALUNOS:

   - Este arquivo `postcss.config.js` diz ao PostCSS (uma ferramenta que mexe no nosso CSS
     antes dele ir para o navegador) para fazer duas coisas principais:
     1. Processar o Tailwind CSS: Para que todas aquelas classes úteis como `text-red-500`,
        `flex`, `p-4` funcionem e sejam otimizadas.
     2. Rodar o Autoprefixer: Para adicionar automaticamente aqueles pedacinhos chatos
        como `-webkit-` ou `-moz-` em algumas regras CSS, garantindo que nosso site
        fique bonito em mais navegadores sem que a gente precise se preocupar com isso
        manualmente.

   - Você geralmente não precisa mexer muito neste arquivo em projetos configurados com
     ferramentas como Create React App ou Vite, a menos que precise adicionar
     plugins PostCSS muito específicos ou customizar o comportamento dos plugins existentes.
   ================================================================================================= */
