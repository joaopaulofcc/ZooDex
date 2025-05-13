// Caminho: src/components/Header.jsx

// =================================================================================================
// ARQUIVO: Header.jsx
// Olá, futuro(a) desenvolvedor(a) React! Este arquivo define o componente "Header",
// que é a barra que você vê no topo da nossa aplicação ZooDex.
// Ele é responsável por mostrar o logo, o título, permitir que você busque animais,
// ordene a lista e até descubra um animal surpresa!
//
// Recentemente, adicionamos algumas funcionalidades bem legais:
//  1. "Shrinky Header" (Cabeçalho que Encolhe): Em telas de celular, o header
//     diminui de tamanho quando você rola a página para baixo, para dar mais
//     espaço para o conteúdo. Ele volta ao normal quando você rola para cima.
//  2. Comportamento Diferente para Desktop: Em telas maiores (como computadores),
//     o header NÃO encolhe com o scroll, pois já temos bastante espaço.
//  3. Scroll Automático para o Topo: Quando você clica em um botão de ordenação
//     ou no "Animal Surpresa", a página rola suavemente para o topo, para você
//     ver o resultado da sua ação imediatamente. Isso acontece tanto no celular
//     quanto no computador.
//
// CONCEITOS DE REACT E JAVASCRIPT QUE VOCÊ VAI APRENDER AQUI:
//  - Componentes Funcionais: A forma moderna de criar blocos de construção em React.
//  - Props (Propriedades): Como este componente recebe informações e funções de seu "pai" (App.js).
//  - State (Estado Local com `useState`): Como o componente guarda informações que mudam
//    (o texto da busca, se o header está encolhido, se a tela é mobile).
//  - Effects (Efeitos Colaterais com `useEffect`): Para interagir com coisas fora do React,
//    como o scroll da janela do navegador ou o tamanho da tela.
//  - Refs (Referências com `useRef`): Para guardar valores que não disparam re-renderização
//    ou para acessar elementos DOM diretamente (embora usemos mais para o primeiro caso aqui).
//  - Callbacks Memoizados (`useCallback`): Para otimizar funções, especialmente aquelas
//    passadas para `useEffect` ou componentes filhos.
//  - JavaScript do Navegador (BOM - Browser Object Model):
//    - `window.scrollTo()`: Para fazer a página rolar.
//    - `window.matchMedia()`: Para verificar o tamanho da tela (Media Queries em JS).
//    - `window.addEventListener()` e `window.removeEventListener()`: Para "ouvir" eventos
//      do navegador, como scroll ou mudança no tamanho da tela.
//  - JSX: A sintaxe que mistura HTML com JavaScript para descrever como o componente
//    deve aparecer na tela.
//  - CSS Modules: Para manter nossos estilos CSS organizados e evitar conflitos.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E FUNÇÕES ---
// Primeiro, importamos tudo que precisamos do React e de outros lugares.
import React, { useState, useEffect, useRef, useCallback } from "react";
// - `React`: A biblioteca principal do React.
// - `useState`: Hook para adicionar "estado" (memória interna) ao nosso componente.
// - `useEffect`: Hook para lidar com "efeitos colaterais" (coisas que acontecem fora do fluxo normal de renderização).
// - `useRef`: Hook para criar "referências" (como um ponteiro para um valor ou elemento DOM).
// - `useCallback`: Hook para otimizar funções, criando versões "memoizadas" delas.

import styles from "./Header.module.css";
// - `styles`: Importamos nossos estilos CSS específicos para este componente.
//   Graças ao CSS Modules, `styles.header` será uma classe única como `Header_header__123xyz`.

// --- 1.1. DEFINIÇÃO DO BREAKPOINT PARA MOBILE ---
// Um "breakpoint" é um ponto de corte na largura da tela que usamos para mudar o layout
// ou comportamento da nossa aplicação.
// Aqui, definimos que qualquer tela com largura MÁXIMA de 767 pixels será considerada "mobile".
// Esta string é uma "media query", a mesma que usamos em CSS!
const MOBILE_BREAKPOINT = "(max-width: 767px)";

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'Header' ---
// Esta é a função principal que define nosso componente Header.
// Ela recebe `props` (propriedades) do componente pai (App.js).
// Usamos "desestruturação" para pegar as props que nos interessam diretamente:
//  - `onSearch`: Uma função que será chamada quando o usuário digitar na busca.
//  - `onSort`: Uma função que será chamada quando um botão de ordenação for clicado.
//  - `onRandom`: Uma função para o botão "Animal Surpresa".
//  - `initialSearchTerm`: O texto inicial para o campo de busca.
const Header = ({ onSearch, onSort, onRandom, initialSearchTerm }) => {
  // --- A. ESTADO LOCAL DO COMPONENTE (Nossa "Memória Interna") ---

  // Estado para o texto que o usuário está digitando no campo de busca.
  // `termoDeBuscaDigitado` guarda o texto.
  // `definirTermoDeBuscaDigitado` é a função para ATUALIZAR esse texto.
  // Começa com `initialSearchTerm` (se existir) ou uma string vazia.
  const [termoDeBuscaDigitado, definirTermoDeBuscaDigitado] = useState(
    initialSearchTerm || ""
  );

  // Estado para controlar se o header deve estar "encolhido" ou não.
  // `headerEncolhido` é `true` se o header deve diminuir, `false` caso contrário.
  // Começa como `false` (header normal).
  const [headerEncolhido, definirHeaderEncolhido] = useState(false);

  // NOVO ESTADO: Para saber se estamos em uma tela de celular (mobile) ou não.
  // `isMobile` será `true` se a tela for pequena, `false` se for grande.
  // A inicialização é feita com uma função para que `window.matchMedia` seja chamado apenas uma vez
  // na montagem inicial do componente.
  // `window.matchMedia(MOBILE_BREAKPOINT).matches` verifica se a tela ATUALMENTE
  // corresponde à nossa media query de mobile.
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_BREAKPOINT).matches
  );

  // --- B. REFS (Referências) ---
  // Refs são como "caixinhas" que podemos usar para guardar valores que persistem
  // entre as renderizações do componente, MAS que NÃO disparam uma nova renderização
  // quando seus valores mudam. Também podem ser usados para acessar elementos DOM diretamente.

  // `ultimaPosicaoScroll` guarda a posição Y do scroll da página da última vez que
  // o evento de scroll foi verificado. Usamos `.current` para acessar/modificar o valor.
  const ultimaPosicaoScroll = useRef(0); // Começa em 0 (topo da página).

  // `headerRef` é uma referência que vamos "ligar" ao elemento `<header>` no nosso JSX.
  // Poderíamos usá-lo para pegar a altura do header, por exemplo, mas não estamos
  // usando ativamente para cálculos nesta versão.
  const headerRef = useRef(null);

  // --- C. CONSTANTES PARA OS LIMIARES DE SCROLL (THRESHOLDS) ---
  // "Limiares" são valores de "gatilho".
  // Estas constantes tornam o código mais fácil de ler e ajustar.
  // Elas só são realmente usadas quando `isMobile` é `true`.

  // Se o scroll passar de 100 pixels PARA BAIXO, tentaremos encolher o header.
  const LIMIAR_PARA_ENCOLHER = 100;
  // Se o scroll estiver ABAIXO de 50 pixels do topo, tentaremos expandir o header.
  const LIMIAR_PARA_EXPANDIR_PROXIMO_AO_TOPO = 50;
  // Para evitar que o header "pisque" com movimentos mínimos do scroll,
  // exigimos que o usuário role pelo menos 5 pixels para considerarmos uma mudança de direção.
  const MINIMA_DISTANCIA_SCROLL_PARA_MUDANCA = 5;

  // --- D. FUNÇÃO AUXILIAR PARA ROLAR A TELA PARA O TOPO ---
  // Criamos uma função separada para esta ação, para não repetir código (princípio DRY).
  // `useCallback` "memoiza" esta função. Isso significa que o React só vai recriar
  // esta função se alguma de suas dependências (o array `[]` no final) mudar.
  // Como não tem dependências, ela é criada uma vez e reutilizada.
  // Isso pode ser uma otimização se esta função for passada para muitos componentes filhos
  // ou usada como dependência em outros `useEffect` ou `useCallback`.
  const rolarParaTopo = useCallback(() => {
    // `window.scrollTo` é um comando do navegador para mover a visualização da página.
    window.scrollTo({
      top: 0, // Queremos ir para a coordenada Y = 0 (o topo absoluto da página).
      behavior: "smooth", // `behavior: "smooth"` faz a rolagem ser animada, suavemente.
      // Se quiséssemos instantâneo, seria `behavior: "auto"` ou omitiríamos.
    });
  }, []); // Array de dependências vazio = a função nunca precisa ser recriada.

  // --- E. HANDLER DE SCROLL (Função que Lida com o Evento de Rolagem) ---
  // Esta função será chamada TODA VEZ que o usuário rolar a página (se o listener estiver ativo).
  // Também a envolvemos com `useCallback` para memoização.
  // Suas dependências são `isMobile` e `headerEncolhido`, pois a lógica dentro dela
  // usa esses valores de estado. Se eles mudarem, a função `lidarComScroll` será recriada
  // com os novos valores.
  const lidarComScroll = useCallback(() => {
    // PASSO 1: Só fazer algo se estivermos em uma tela de celular.
    if (!isMobile) {
      // Se, por algum motivo, não for mobile mas o header estiver encolhido
      // (ex: o usuário redimensionou a tela de pequeno para grande),
      // garantimos que ele se expanda.
      if (headerEncolhido) definirHeaderEncolhido(false);
      return; // Sai da função, não faz mais nada se não for mobile.
    }

    // PASSO 2: Pegar a posição atual do scroll vertical da página.
    const posicaoScrollAtual =
      window.pageYOffset || document.documentElement.scrollTop; // Funciona na maioria dos navegadores.

    // PASSO 3: "Zona Morta" - Ignorar micro-movimentos do scroll.
    // Se a diferença entre a posição atual e a última posição guardada for muito pequena
    // (menor que `MINIMA_DISTANCIA_SCROLL_PARA_MUDANCA`), não fazemos nada.
    // Isso evita o efeito chato de "piscar" o header.
    if (
      Math.abs(posicaoScrollAtual - ultimaPosicaoScroll.current) <
      MINIMA_DISTANCIA_SCROLL_PARA_MUDANCA
    ) {
      return;
    }

    // PASSO 4: Determinar a direção do scroll.
    // Se a posição atual for MAIOR que a última, estamos rolando PARA BAIXO.
    const rolandoParaBaixo = posicaoScrollAtual > ultimaPosicaoScroll.current;

    // PASSO 5: Lógica para ENCOLHER o header.
    if (
      rolandoParaBaixo && // Se estivermos rolando para baixo...
      posicaoScrollAtual > LIMIAR_PARA_ENCOLHER && // ...e já passamos do nosso limiar para encolher...
      !headerEncolhido // ...e o header ainda não estiver encolhido...
    ) {
      definirHeaderEncolhido(true); // ...então, encolhemos o header!
    }
    // PASSO 6: Lógica para EXPANDIR o header.
    else if (!rolandoParaBaixo && headerEncolhido) {
      // Se NÃO estivermos rolando para baixo (ou seja, estamos rolando para CIMA
      // ou paramos, mas a posição mudou significativamente) E o header ESTIVER encolhido...
      if (posicaoScrollAtual < LIMIAR_PARA_EXPANDIR_PROXIMO_AO_TOPO) {
        // ...e a posição do scroll estiver perto do topo da página...
        definirHeaderEncolhido(false); // ...então, expandimos o header!
      }
    }

    // PASSO 7: Caso especial - Se o scroll voltar ao topo absoluto (0).
    // Isso garante que, mesmo se o usuário usar "Page Up" ou um link para o topo,
    // o header se expanda.
    if (posicaoScrollAtual === 0 && headerEncolhido) {
      definirHeaderEncolhido(false);
    }

    // PASSO 8: Atualizar a última posição do scroll guardada.
    // `.current` é como acessamos o valor dentro de um `useRef`.
    ultimaPosicaoScroll.current =
      posicaoScrollAtual <= 0 ? 0 : posicaoScrollAtual; // Garante que não seja negativo.
  }, [isMobile, headerEncolhido]); // Dependências: esta função será recriada se `isMobile` ou `headerEncolhido` mudar.

  // --- F. EFEITO (useEffect) PARA GERENCIAR O LISTENER DE SCROLL E MEDIA QUERY ---
  // Este `useEffect` é o cérebro por trás de quando o `lidarComScroll` é ativado
  // e como reagimos a mudanças no tamanho da tela.
  // Ele roda após a primeira renderização e sempre que uma de suas dependências mudar.
  useEffect(() => {
    // PASSO 1: Criar um objeto "MediaQueryList".
    // `window.matchMedia` nos permite verificar se a tela corresponde a uma media query CSS.
    const mediaQueryList = window.matchMedia(MOBILE_BREAKPOINT);

    // PASSO 2: Definir uma função para atualizar nosso estado `isMobile`.
    // Esta função será chamada quando a media query (tamanho da tela) mudar.
    // `evento.matches` será `true` se a tela AGORA corresponde à media query (é mobile).
    const atualizarIsMobile = (evento) => {
      setIsMobile(evento.matches);
    };

    // PASSO 3: "Ouvir" por mudanças na media query.
    // Adicionamos um "event listener" ao objeto `mediaQueryList`.
    // O evento `change` é disparado quando a janela é redimensionada e cruza o breakpoint.
    mediaQueryList.addEventListener("change", atualizarIsMobile);

    // PASSO 4: Definir o estado inicial de `isMobile` (importante!).
    // Isso garante que `isMobile` esteja correto logo na primeira vez que o efeito roda.
    setIsMobile(mediaQueryList.matches);

    // PASSO 5: Lógica para adicionar ou remover o listener de SCROLL.
    if (mediaQueryList.matches) {
      // SE A TELA ATUALMENTE É MOBILE...
      // ...adicionamos nosso `lidarComScroll` como um "ouvinte" do evento de scroll da janela.
      // `{ passive: true }` é uma otimização que diz ao navegador que nosso listener
      // não vai impedir o scroll, o que pode torná-lo mais suave.
      window.addEventListener("scroll", lidarComScroll, { passive: true });
    } else {
      // SE A TELA ATUALMENTE NÃO É MOBILE (É DESKTOP)...
      // ...removemos o listener de scroll, pois não queremos que o header encolha.
      window.removeEventListener("scroll", lidarComScroll);
      // E, crucialmente, se o header ESTIVER encolhido (talvez porque a tela
      // acabou de ser redimensionada de pequena para grande), nós o expandimos.
      if (headerEncolhido) {
        definirHeaderEncolhido(false);
      }
    }

    // PASSO 6: Função de Limpeza (Cleanup).
    // Esta função é EXTREMAMENTE IMPORTANTE! Ela roda quando o componente `Header`
    // está prestes a ser "desmontado" (removido da tela) OU ANTES de o `useEffect`
    // rodar novamente devido a uma mudança em suas dependências.
    // Aqui, removemos os listeners que adicionamos para evitar "memory leaks"
    // (vazamentos de memória) e comportamentos inesperados.
    return () => {
      mediaQueryList.removeEventListener("change", atualizarIsMobile);
      window.removeEventListener("scroll", lidarComScroll);
    };
  }, [isMobile, lidarComScroll, headerEncolhido]); // Dependências do useEffect.
  // Se `isMobile` mudar, o efeito roda de novo
  // para adicionar/remover o listener de scroll corretamente.
  // Se `lidarComScroll` mudar (porque `isMobile` ou `headerEncolhido` mudou),
  // o listener é atualizado.
  // `headerEncolhido` está aqui para a lógica de forçar expansão.

  // --- G. FUNÇÃO PARA LIDAR COM MUDANÇAS NO CAMPO DE BUSCA ---
  // Chamada toda vez que o usuário digita no campo de input da busca.
  const lidarComMudancaNaBusca = (evento) => {
    // `evento.target.value` pega o texto atual do campo de input.
    const novoValorDoInput = evento.target.value;
    // Atualiza nosso estado local com o novo texto.
    definirTermoDeBuscaDigitado(novoValorDoInput);
    // Se a prop `onSearch` (do App.js) foi fornecida, nós a chamamos,
    // passando o novo termo de busca para o componente pai.
    if (onSearch) {
      onSearch(novoValorDoInput);
    }
  };

  // --- H. FUNÇÕES HANDLER PARA CLIQUES NOS BOTÕES QUE CHAMAM PROPS E ROLAM A TELA ---
  // "Handlers" são funções que "lidam" com eventos, como cliques de mouse.

  // Handler para os botões de ordenação.
  // Recebe `tipoDeOrdenacao` (ex: "name-asc") como argumento.
  // Envolvido com `useCallback` para memoização.
  // Suas dependências são `onSort` (a prop) e `rolarParaTopo` (nossa função auxiliar).
  const lidarComCliqueNaOrdenacao = useCallback(
    (tipoDeOrdenacao) => {
      // PASSO 1: Chamar a função de ordenação que veio do App.js.
      if (onSort) {
        onSort(tipoDeOrdenacao);
      }
      // PASSO 2: Rolar a tela para o topo.
      // Esta chamada foi modificada para acontecer SEMPRE, não apenas no mobile.
      rolarParaTopo();
    },
    [onSort, rolarParaTopo] // Dependências do useCallback. Se `onSort` ou `rolarParaTopo` mudarem,
    // esta função será recriada.
  );

  // Handler para o botão "Animal Surpresa".
  // Envolvido com `useCallback`. Depende de `onRandom` e `rolarParaTopo`.
  const lidarComCliqueNoAnimalSurpresa = useCallback(() => {
    // PASSO 1: Chamar a função de animal aleatório que veio do App.js.
    if (onRandom) {
      onRandom();
    }
    // PASSO 2: Rolar a tela para o topo.
    // Esta chamada também foi modificada para acontecer SEMPRE.
    rolarParaTopo();
  }, [onRandom, rolarParaTopo]); // Dependências do useCallback.

  // --- I. RETORNO DO JSX (O que o Componente Vai Mostrar na Tela) ---
  // Este é o "desenho" do nosso header usando uma sintaxe parecida com HTML.
  // Caminho: src/components/Header.jsx

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${
        isMobile && headerEncolhido ? styles.headerEncolhido : ""
      }`}
    >
      <div className={styles.headerContentWrapper}>
        <div className={styles.logoAndTitle}>
          <img
            src="https://colegiouni.com.br/new_site/wp-content/uploads/2019/04/Logo-Col%C3%A9gio-Unilavras-Oficial_2019-full-white-1.png"
            alt="Logotipo do Colégio Unilavras. Um escudo azul com um globo terrestre estilizado e o nome Unilavras abaixo."
            className={styles.logo}
          />
          <h1 className={styles.title}>ZooDex 🐾</h1>
        </div>
        {!(isMobile && headerEncolhido) && (
          <button
            onClick={lidarComCliqueNoAnimalSurpresa}
            className={styles.randomButton}
            title="Clique para ver informa\xe7\xf5es de um animal escolhido aleatoriamente!"
          >
            Animal Surpresa ✨
          </button>
        )}
      </div>

      <div className={styles.searchContainer}>
        <input
          type="search"
          id="search-input"
          value={termoDeBuscaDigitado}
          onChange={lidarComMudancaNaBusca}
          placeholder="Buscar por nome comum ou científico..."
          className={styles.searchInput}
          aria-label="Campo de busca para encontrar animais por nome comum ou científico"
        />
      </div>

      <div className={styles.sortControls}>
        <button
          onClick={() => lidarComCliqueNaOrdenacao("name-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfab\xe9tica (A-Z)"
          title="Ordenar Nome A-Z"
        >
          <span className={styles.sortButtonText}>Nome</span>
          <span className={styles.sortButtonTextDirection}>(A-Z)</span>
          {/* CORRIGIDO AQUI: Ícone na mesma linha ou sem quebras de linha desnecessárias dentro do span */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▲
          </span>
        </button>

        <button
          onClick={() => lidarComCliqueNaOrdenacao("name-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfab\xe9tica inversa (Z-A)"
          title="Ordenar Nome Z-A"
        >
          <span className={styles.sortButtonText}>Nome</span>
          <span className={styles.sortButtonTextDirection}>(Z-A)</span>
          {/* CORRIGIDO AQUI */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▼
          </span>
        </button>

        <button
          onClick={() => lidarComCliqueNaOrdenacao("risk-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xedvel de risco de extin\xe7\xe3o, do menor para o maior risco"
          title="Ordenar Risco (Menor)"
        >
          <span className={styles.sortButtonText}>Risco</span>
          <span className={styles.sortButtonTextDirection}>(Menor)</span>
          {/* CORRIGIDO AQUI */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▲
          </span>
        </button>

        <button
          onClick={() => lidarComCliqueNaOrdenacao("risk-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xedvel de risco de extin\xe7\xe3o, do maior para o menor risco"
          title="Ordenar Risco (Maior)"
        >
          <span className={styles.sortButtonText}>Risco</span>
          <span className={styles.sortButtonTextDirection}>(Maior)</span>
          {/* CORRIGIDO AQUI */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▼
          </span>
        </button>

        <button
          onClick={() => lidarComCliqueNaOrdenacao("codigo-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xfamero do tazo (c\xf3digo) em ordem crescente"
          title="Ordenar Tazo Nº (Crescente)"
        >
          <span className={styles.sortButtonText}>Tazo Nº</span>
          <span className={styles.sortButtonTextDirection}>(Cresc.)</span>
          {/* CORRIGIDO AQUI */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▲
          </span>
        </button>

        <button
          onClick={() => lidarComCliqueNaOrdenacao("codigo-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xfamero do tazo (c\xf3digo) em ordem decrescente"
          title="Ordenar Tazo Nº (Decrescente)"
        >
          <span className={styles.sortButtonText}>Tazo Nº</span>
          <span className={styles.sortButtonTextDirection}>(Decresc.)</span>
          {/* CORRIGIDO AQUI */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▼
          </span>
        </button>
      </div>
    </header>
  );
}; // Fim da definição do componente Header

// --- 3. EXPORTAÇÃO DO COMPONENTE ---
// Isso torna nosso componente `Header` disponível para ser usado em outros arquivos,
// principalmente no `App.js`.
export default Header;
