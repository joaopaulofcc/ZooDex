// Caminho: tailwind.config.js

// =================================================================================================
// ARQUIVO: tailwind.config.js
// PROPÓSITO: Este é o arquivo de configuração para o Tailwind CSS.
//            Tailwind CSS é um framework CSS "utility-first" que fornece um conjunto
//            extenso de classes utilitárias (como 'text-red-500', 'p-4', 'flex')
//            que você pode aplicar diretamente no seu HTML/JSX para construir interfaces
//            rapidamente sem escrever muito CSS customizado.
//
//            Este arquivo permite que você:
//            1. Especifique quais arquivos o Tailwind deve "observar" para encontrar
//               as classes utilitárias que você está usando (para que ele possa gerar
//               apenas o CSS necessário na build final - otimização).
//            2. Customize o "tema" padrão do Tailwind:
//               - Adicionar ou modificar cores, fontes, espaçamentos, breakpoints, etc.
//            3. Adicionar plugins para estender as funcionalidades do Tailwind.
//
//            Este arquivo é geralmente usado por uma ferramenta de build (como PostCSS, que
//            é integrado em projetos Create React App ou Vite) que processa seu CSS
//            e o Tailwind para gerar o arquivo CSS final para sua aplicação.
//
// SINTAXE: Este arquivo é um módulo JavaScript que exporta um objeto de configuração.
// =================================================================================================

// Importa a função 'plugin' do Tailwind CSS.
// Esta função é usada para criar plugins customizados para o Tailwind,
// permitindo adicionar novas classes utilitárias ou modificar o comportamento do framework.
// No nosso caso, será usada para adicionar utilitários para efeitos 3D.
const plugin = require("tailwindcss/plugin");
// NOTA PARA ALUNOS: 'require' é a forma de importar módulos no sistema CommonJS,
// que é tradicionalmente usado em ambientes Node.js (onde o Tailwind é processado).
// Em componentes React, geralmente usamos 'import ... from ...' (ES6 Modules).

// 'export default' torna este objeto de configuração o valor principal exportado por este módulo.
export default {
  // --- SEÇÃO 'content' ---
  // PROPÓSITO: Especifica os caminhos para TODOS os arquivos do seu projeto
  //            que podem conter nomes de classes do Tailwind CSS.
  //            O Tailwind "escaneia" esses arquivos para descobrir quais classes
  //            você realmente usou. Na build final, ele gera um arquivo CSS
  //            contendo APENAS os estilos para as classes que foram encontradas.
  //            Isso mantém o tamanho do arquivo CSS final o menor possível (otimização).
  //
  // FORMATO: Um array de strings, onde cada string é um "glob pattern" (padrão de arquivo).
  //          - "./index.html": Inclui o arquivo HTML principal na raiz do projeto.
  //          - "./src/**/*.{js,ts,jsx,tsx}": Inclui:
  //            - Todos os arquivos com extensão .js, .ts, .jsx, ou .tsx
  //            - Dentro da pasta 'src/'
  //            - E dentro de QUALQUER subpasta ('**') dentro de 'src/'.
  //
  // NOTA: No seu arquivo original, havia duas propriedades 'content'. O Tailwind usará
  // a última que encontrar. Vou manter a segunda, que é mais concisa.
  // É importante garantir que todos os arquivos que usam classes Tailwind estejam cobertos aqui.
  content: [
    "./index.html", // Arquivo HTML principal.
    "./src/**/*.{js,ts,jsx,tsx}", // Todos os arquivos JavaScript/TypeScript dentro da pasta src.
  ],

  // --- SEÇÃO 'theme' ---
  // PROPÓSITO: Permite customizar e estender o "tema" padrão do Tailwind.
  //            O tema padrão do Tailwind já vem com uma vasta paleta de cores,
  //            escalas de espaçamento, tamanhos de fonte, breakpoints, etc.
  //            Aqui, podemos SOBRESCREVER valores padrão ou ADICIONAR novos.
  theme: {
    // A sub-propriedade 'extend' é usada para ADICIONAR novas opções ao tema padrão
    // ou para estender categorias existentes SEM sobrescrever completamente o padrão.
    // Se você definisse 'colors' diretamente dentro de 'theme' (fora de 'extend'),
    // você substituiria TODA a paleta de cores padrão do Tailwind pelas suas.
    // Usar 'extend' é geralmente o que você quer para adicionar suas customizações.
    extend: {
      // --- CUSTOMIZAÇÃO DE CORES ('colors') ---
      // Aqui definimos nossa paleta de cores personalizada para o projeto ZooDex.
      // Essas cores podem então ser usadas com as classes utilitárias do Tailwind, como:
      //   `bg-primary` (para background-color: var(--color-primary))
      //   `text-secondary` (para color: var(--color-secondary))
      //   `border-lc` (para border-color: var(--color-lc))
      //
      // Os nomes das cores (ex: "bg-light", "primary", "lc") se tornam parte do nome da classe Tailwind.
      // Os valores são os códigos hexadecimais das cores.
      // É uma ÓTIMA PRÁTICA alinhar estas cores com as variáveis CSS definidas
      // no seu arquivo `:root` em `src/index.css` para consistência.
      // O Tailwind pode, inclusive, ser configurado para usar variáveis CSS diretamente.
      colors: {
        // Cores Gerais da UI
        "bg-light": "#F0F2F5", // Cor de fundo principal (corresponde a --color-bg-light)
        "text-light": "#212529", // Cor de texto principal (corresponde a --color-text-light)
        "text-muted": "#6c757d", // Cor para texto secundário (corresponde a --color-text-muted)
        primary: "#2E7D32", // Cor primária da marca (Verde Floresta Escuro, corresponde a --color-primary)
        secondary: "#EF6C00", // Cor secundária da marca (Laranja Queimado, corresponde a --color-secondary)
        "card-bg": "#FFFFFF", // Cor de fundo para os cards (Branco, corresponde a --color-card-bg)

        // Cores para os Níveis de Extinção (correspondem às variáveis --color-lc, --color-nt, etc.)
        // Estas serão usadas para estilizar os badges de status de extinção e outras visualizações.
        // Ex: <div class="bg-lc">...</div> ou <div class="text-lc">...</div>
        lc: "#AED581", // Pouco Preocupante
        nt: "#DCE775", // Quase Ameaçado
        vu: "#FFEE58", // Vulnerável
        en: "#FFA726", // Em Perigo
        cr: "#EF5350", // Criticamente em Perigo
        ew: "#7E57C2", // Extinto na Natureza
        ex: "#616161", // Extinto
        dd: "#BDBDBD", // Dados Insuficientes
        ne: "#E0E0E0", // Não Avaliado
        "default-extinction": "#CCCCCC", // Cor padrão para status desconhecido.
      },

      // --- CUSTOMIZAÇÃO DE FONTES ('fontFamily') ---
      // Aqui definimos famílias de fontes personalizadas.
      // Estas podem ser usadas com classes como `font-primary` ou `font-secondary`.
      // Os valores são arrays de strings: a primeira fonte é a preferida,
      // e as seguintes são "fallbacks" (fontes alternativas caso a primeira não carregue).
      // É importante que estas fontes estejam sendo carregadas na sua aplicação
      // (ex: via tag <link> no index.html para Google Fonts, ou @font-face no CSS).
      fontFamily: {
        // 'primary' será o nome usado na classe Tailwind (ex: class="font-primary")
        primary: ["Nunito", "Helvetica", "Arial", "sans-serif"], // Corresponde a --font-primary
        // 'secondary' será o nome usado na classe Tailwind (ex: class="font-secondary")
        secondary: ["Open Sans", "Verdana", "Geneva", "sans-serif"], // Corresponde a --font-secondary
      },

      // --- CUSTOMIZAÇÃO DE RAIO DA BORDA ('borderRadius') ---
      // Permite definir tamanhos de arredondamento de cantos personalizados.
      // Estes podem ser usados com classes como `rounded-DEFAULT` ou `rounded-sm`.
      // O Tailwind já tem uma escala padrão de 'rounded' (sm, md, lg, xl, full, etc.).
      // Aqui estamos adicionando/sobrescrevendo alguns.
      borderRadius: {
        // 'DEFAULT' é a chave especial que o Tailwind usa quando você aplica apenas 'rounded'
        // (sem um sufixo de tamanho, ex: <div class="rounded">).
        DEFAULT: "8px", // Raio de borda padrão (corresponde a --border-radius)
        sm: "4px", // Raio de borda pequeno (corresponde a --border-radius-small)
        // Poderíamos adicionar mais, ex: 'md': '12px', 'lg': '16px', 'xl': '24px', '2xl': '32px', 'full': '9999px'
      },
      // Poderíamos estender outras categorias do tema aqui, como:
      // - spacing: para margens, paddings, width, height.
      // - fontSize: para tamanhos de fonte.
      // - breakpoints: para design responsivo (sm, md, lg, xl).
      // - boxShadow: para sombras.
      // ...e muitas outras.
    },
  }, // Fim da seção 'theme'

  // --- SEÇÃO 'plugins' ---
  // PROPÓSITO: Permite adicionar funcionalidades extras ao Tailwind CSS através de plugins.
  //            Plugins podem adicionar novas classes utilitárias, variantes, ou modificar
  //            o comportamento do Tailwind.
  //            Existem plugins oficiais do Tailwind (como @tailwindcss/typography, @tailwindcss/forms)
  //            e plugins criados pela comunidade.
  //            Aqui, estamos criando um plugin customizado inline para adicionar utilitários
  //            para transformações 3D, que serão usadas no efeito de "flip" dos cards.
  plugins: [
    // Chamamos a função 'plugin()' que importamos no início.
    // Ela recebe uma função como argumento. Esta função, por sua vez, recebe um objeto
    // com várias funções utilitárias do Tailwind (como 'addUtilities', 'addComponents',
    // 'theme', 'e', etc.) que podemos usar para registrar nossos novos estilos ou utilitários.
    plugin(function ({ addUtilities }) {
      // 'addUtilities' é uma função fornecida pelo Tailwind que nos permite registrar
      // novas classes utilitárias.
      // Passamos um objeto para 'addUtilities', onde:
      //   - As CHAVES são os NOMES DAS CLASSES CSS que queremos criar (ex: '.perspective').
      //   - Os VALORES são objetos contendo as DECLARAÇÕES CSS para essas classes.
      addUtilities({
        // Classe para aplicar a propriedade 'perspective' (usada no container pai de um elemento 3D).
        // Uso no JSX: <div class="perspective">...</div>
        ".perspective": {
          perspective: "1000px", // Define a "profundidade" da cena 3D.
        },
        // Classe para aplicar 'transform-style: preserve-3d' (usada no elemento que vai girar).
        // Uso no JSX: <div class="transform-style-preserve-3d">...</div>
        ".transform-style-preserve-3d": {
          "transform-style": "preserve-3d", // Permite que os filhos sejam tratados em 3D.
        },
        // Classe para girar um elemento 180 graus no eixo Y.
        // Uso no JSX: <div class="rotate-y-180">...</div>
        ".rotate-y-180": {
          transform: "rotateY(180deg)", // Aplica a transformação de rotação.
        },
        // Classe para aplicar 'backface-visibility: hidden' (esconde a face de trás de um elemento girado).
        // Uso no JSX: <div class="backface-hidden">...</div>
        ".backface-hidden": {
          "backface-visibility": "hidden", // Padrão CSS.
          "-webkit-backface-visibility": "hidden", // Prefixo para compatibilidade com navegadores WebKit mais antigos.
        },
        // Poderíamos adicionar mais utilitários aqui se necessário.
      });
    }), // Fim do nosso plugin customizado.
    // Poderíamos adicionar outros plugins aqui, se instalados:
    //   require('@tailwindcss/forms'),
    //   require('@tailwindcss/typography'),
  ], // Fim da seção 'plugins'
}; // Fim do objeto de configuração do Tailwind
