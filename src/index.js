// Caminho: src/index.js

// ===================================================================================
// ARQUIVO: index.js
// DESCRIÇÃO: Este é o PONTO DE ENTRADA PRINCIPAL da sua aplicação React.
//            É o primeiro arquivo JavaScript que é executado quando sua aplicação
//            é carregada no navegador (após o HTML ser processado).
//            Sua principal responsabilidade é "montar" ou "renderizar" o
//            componente raiz da sua aplicação (geralmente chamado 'App')
//            dentro de um elemento específico do seu arquivo HTML (geralmente uma
//            <div id="root"></div>).
// ===================================================================================

// --- 1. IMPORTAÇÕES ESSENCIAIS ---

// Importa a biblioteca 'React'.
// Mesmo que a sintaxe JSX seja transformada e você não chame `React.createElement`
// diretamente em todos os builds modernos, é uma boa prática incluir esta linha,
// especialmente para clareza e compatibilidade.
import React from "react";

// Importa 'ReactDOM' da biblioteca 'react-dom/client'.
// - 'react-dom': É a parte do React responsável por interagir com o DOM (Document Object Model)
//                do navegador. O DOM é a representação em árvore da sua página HTML.
// - '/client': A partir do React 18, a API para renderizar a aplicação no cliente (navegador)
//              foi movida para 'react-dom/client'. Ela introduz a API `createRoot`.
import ReactDOM from "react-dom/client";

// Importa o componente principal (raiz) da nossa aplicação.
// Por convenção, este componente é frequentemente chamado 'App' e reside em './App.js' ou './App.jsx'.
// Ele atuará como o container para todos os outros componentes da interface.
import App from "./App";

// Importa o arquivo de estilos globais 'index.css'.
// Os estilos definidos neste arquivo (como variáveis CSS, estilos para o <body>, etc.)
// serão aplicados a toda a aplicação. A ordem de importação de CSS pode ser importante,
// pois o último CSS importado pode sobrescrever regras anteriores se houver conflitos
// de especificidade (embora CSS Modules ajudem a evitar muitos desses conflitos).
import "./index.css";

// --- 2. ENCONTRANDO O ELEMENTO HTML RAIZ ---

// O React precisa de um "lugar" no seu arquivo HTML onde ele possa "montar" a aplicação.
// Este lugar é geralmente uma tag <div> vazia com um identificador (id) único.
// No nosso projeto (veja 'public/index.html'), esta div tem o id="root".
//
// `document.getElementById('root')`: Esta é uma função padrão do JavaScript que
// busca no DOM um elemento HTML que tenha o ID especificado ('root').
// Ela retorna o objeto do elemento HTML, ou 'null' se nenhum elemento com esse ID for encontrado.
const pontoDeMontagemHtml = document.getElementById("root");

// --- 3. CRIANDO A "RAIZ" DO REACT PARA A APLICAÇÃO ---

// Com a API do React 18, usamos `ReactDOM.createRoot()` para criar uma "raiz" React
// no elemento HTML que encontramos no passo anterior.
// Esta raiz se torna o ponto de controle do React para renderizar e atualizar
// a interface do usuário dentro do `pontoDeMontagemHtml`.
const raizDaAplicacao = ReactDOM.createRoot(pontoDeMontagemHtml);

// --- 4. RENDERIZANDO O COMPONENTE PRINCIPAL NA RAIZ ---

// Agora que temos a `raizDaAplicacao`, usamos o método `render()` dela
// para dizer ao React qual componente deve ser exibido inicialmente.
// Estamos passando o nosso componente `<App />` para ser renderizado.

// <React.StrictMode>
//   É um componente utilitário fornecido pelo React que NÃO afeta a build de produção
//   (a versão final do site que os usuários veem). Ele serve como uma ferramenta
//   PARA DESENVOLVEDORES.
//   Durante o desenvolvimento, o StrictMode ativa verificações e avisos adicionais
//   sobre potenciais problemas no código, como:
//     - Identificar componentes com "efeitos colaterais" inseguros no ciclo de vida.
//     - Avisar sobre o uso de APIs legadas (antigas).
//     - Detectar usos inesperados de refs.
//   Uma das formas como ele faz isso é, por exemplo, invocando certas funções
//   (como construtores de componentes, funções de renderização, e funções dentro de
//   useEffect e useLayoutEffect) DUAS VEZES em modo de desenvolvimento. Isso ajuda
//   a encontrar bugs causados por código que não é "puro" ou que tem efeitos colaterais
//   inesperados.
//   É altamente recomendado usá-lo durante o desenvolvimento.
raizDaAplicacao.render(
  <React.StrictMode>
    <App />
    {/* O componente <App /> é o nosso componente React principal.
        Tudo o que o <App /> renderizar (e os componentes filhos dele)
        será inserido dentro da <div id="root"> no HTML. */}
  </React.StrictMode>
);

/*
  ===================================================================================
  FLUXO DE EXECUÇÃO RESUMIDO:

  1. Usuário acessa a página no navegador.
  2. O navegador carrega e interpreta o arquivo 'public/index.html'.
  3. A tag <script type="module" src="/src/index.js"></script> no 'index.html'
     faz com que este arquivo (index.js) seja baixado e executado.
  4. Este script:
     a. Encontra a <div id="root"> no HTML.
     b. Cria uma raiz React controlando essa div.
     c. Instrui o React a renderizar o componente <App /> (envolto em <React.StrictMode>)
        dentro dessa raiz.
  5. O React então assume o controle da <div id="root">, construindo e atualizando
     a interface do usuário conforme definido pelo componente <App /> e seus filhos.
  ===================================================================================
*/
