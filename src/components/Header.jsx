// Caminho: src/components/Header.jsx

// =================================================================================================
// ARQUIVO: Header.jsx
// PROPÓSITO: Este componente define o Cabeçalho (Header) da aplicação ZooDex.
//            O cabeçalho é a barra no topo da página e contém:
//            - O logotipo e o título da aplicação.
//            - Um botão para selecionar um "Animal Surpresa".
//            - Um campo de texto para o usuário buscar animais por nome.
//            - Botões para o usuário ordenar a lista de animais.
//            - Funcionalidade de "encolher" (shrink) ao rolar a página para baixo
//              para otimizar o espaço em telas menores, especialmente em dispositivos móveis.
//
// CONCEITOS PRINCIPAIS DO REACT E JAVASCRIPT UTILIZADOS AQUI:
//  - Componentes Funcionais: Como este componente é estruturado.
//  - Props (Propriedades): Como o Header recebe dados e funções de seu componente pai (App.js).
//                           As props recebidas são:
//                           - 'onSearch': Função a ser chamada quando o texto na busca muda.
//                           - 'onSort': Função a ser chamada quando um botão de ordenação é clicado.
//                           - 'onRandom': Função a ser chamada quando o botão "Animal Surpresa" é clicado.
//                           - 'initialSearchTerm': O valor inicial para o campo de busca.
//  - useState: Hook do React para adicionar ESTADO LOCAL ao componente.
//              Usado para:
//              1. Controlar o valor ATUAL do campo de busca ('termoDeBuscaDigitado').
//              2. Controlar se o header deve estar no estado "encolhido" ('headerEncolhido').
//  - useEffect: Hook do React para executar EFEITOS COLATERAIS.
//               Usado para adicionar e remover um event listener para o evento de 'scroll' da janela,
//               permitindo que o header reaja à rolagem da página.
//  - useRef: Hook do React para criar referências mutáveis que NÃO causam re-renderização quando
//            seus valores mudam.
//            Usado para armazenar a última posição do scroll ('ultimaPosicaoScroll') para
//            determinar a direção da rolagem.
//  - JSX: A sintaxe para descrever a estrutura da interface do usuário.
//  - Manipulação de Eventos: Como o componente reage a ações do usuário ('onChange', 'onClick', 'scroll').
//  - CSS Modules: Para estilização escopada, evitando conflitos de nomes de classes CSS.
//  - Acessibilidade: Uso de 'aria-label' e 'title' para melhorar a experiência de usuários
//                   com tecnologias assistivas.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E FUNÇÕES ---

// Importamos a biblioteca 'React' e os Hooks 'useState', 'useEffect' e 'useRef'.
// - React: Essencial para criar o componente e usar JSX.
// - useState: Permite que o componente Header tenha seu próprio estado interno.
// - useEffect: Permite executar lógica após a renderização ou quando certas dependências mudam,
//              ideal para interações com o DOM/BOM como event listeners.
// - useRef: Permite criar uma referência a um valor que persiste entre renderizações
//           sem causar uma nova renderização quando o valor é alterado.
import React, { useState, useEffect, useRef } from "react";

// Importamos o objeto 'styles' do nosso arquivo CSS Module (Header.module.css).
// Isso nos dá acesso às classes CSS definidas lá de forma escopada,
// como 'styles.header', 'styles.searchInput', etc.
import styles from "./Header.module.css";

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'Header' ---

// O componente Header é uma função que aceita um objeto de 'props' como argumento.
// Usamos a desestruturação para pegar diretamente as props que esperamos receber do App.js.
const Header = ({ onSearch, onSort, onRandom, initialSearchTerm }) => {
  // --- A. ESTADO LOCAL DO COMPONENTE ---

  // Estado para o valor atual do campo de busca.
  // - 'termoDeBuscaDigitado': Armazena o texto ATUAL que está no campo de input da busca.
  // - 'definirTermoDeBuscaDigitado': É a FUNÇÃO que usamos para ATUALIZAR 'termoDeBuscaDigitado'.
  // - `useState(initialSearchTerm || "")`: O valor inicial de 'termoDeBuscaDigitado'.
  //   Se 'initialSearchTerm' foi passado como prop, usamos ele. Senão (||), usamos uma string vazia "".
  const [termoDeBuscaDigitado, definirTermoDeBuscaDigitado] = useState(
    initialSearchTerm || ""
  );

  // NOVO ESTADO: Estado para controlar se o header está "encolhido" ou não.
  // - 'headerEncolhido': Um booleano (true/false). Se true, uma classe CSS será aplicada
  //                      para diminuir o tamanho do header.
  // - 'definirHeaderEncolhido': Função para atualizar o estado 'headerEncolhido'.
  //   Começa como 'false' (header não encolhido).
  const [headerEncolhido, definirHeaderEncolhido] = useState(false);

  // NOVO REF: Referência para armazenar a última posição vertical do scroll da página.
  // Usamos 'useRef' porque queremos manter esse valor entre renderizações, mas
  // NÃO queremos que a alteração desse valor dispare uma nova renderização por si só.
  // Começa em 0.
  const ultimaPosicaoScroll = useRef(0);

  // --- B. EFEITO COLATERAL (useEffect) PARA LIDAR COM O SCROLL DA PÁGINA ---
  // Este Hook 'useEffect' é responsável por adicionar um listener ao evento de 'scroll'
  // da janela (window) quando o componente Header é montado no DOM, e remover
  // esse listener quando o componente é desmontado.
  useEffect(() => {
    // Função que será executada toda vez que o usuário rolar a página.
    const lidarComScroll = () => {
      // Pega a posição vertical atual do scroll da página.
      // 'window.pageYOffset' é o padrão, mas 'document.documentElement.scrollTop'
      // é um fallback para navegadores mais antigos/específicos.
      const posicaoScrollAtual =
        window.pageYOffset || document.documentElement.scrollTop;

      // Lógica para determinar se o header deve encolher ou expandir:
      // 1. Se o usuário está rolando PARA BAIXO (posicaoScrollAtual > ultimaPosicaoScroll.current)
      //    E já rolou uma certa quantidade (ex: mais que 100 pixels do topo, para evitar
      //    encolhimento imediato com scrolls pequenos no topo da página).
      if (
        posicaoScrollAtual > ultimaPosicaoScroll.current &&
        posicaoScrollAtual > 100 // Limiar para começar a encolher
      ) {
        definirHeaderEncolhido(true); // Encolhe o header
      }
      // 2. Se o usuário está rolando PARA CIMA (posicaoScrollAtual < ultimaPosicaoScroll.current)
      //    OU se o scroll está muito próximo do topo da página (ex: menos de 50 pixels).
      else if (
        posicaoScrollAtual < ultimaPosicaoScroll.current ||
        posicaoScrollAtual <= 50 // Limiar para expandir próximo ao topo
      ) {
        definirHeaderEncolhido(false); // Expande o header
      }

      // Atualiza a 'ultimaPosicaoScroll' com a posição atual para a próxima comparação.
      // Garante que não seja um valor negativo se o scroll for "elástico" em alguns dispositivos.
      ultimaPosicaoScroll.current =
        posicaoScrollAtual <= 0 ? 0 : posicaoScrollAtual;
    };

    // Adiciona o event listener ao objeto 'window' para o evento 'scroll'.
    // - 'lidarComScroll': A função a ser chamada.
    // - '{ passive: true }': Uma otimização que informa ao navegador que esta função
    //   não chamará 'event.preventDefault()', permitindo um scroll mais suave.
    window.addEventListener("scroll", lidarComScroll, { passive: true });

    // FUNÇÃO DE LIMPEZA (Cleanup Function):
    // Esta função é retornada pelo useEffect e será executada quando o componente
    // Header for DESMONTADO (removido da tela).
    // É crucial para remover o event listener e evitar memory leaks (vazamentos de memória).
    return () => {
      window.removeEventListener("scroll", lidarComScroll);
    };
  }, []); // O array de dependências vazio `[]` significa que este useEffect
  // só será executado UMA VEZ após a montagem inicial do componente
  // e a função de limpeza será executada UMA VEZ quando o componente for desmontado.

  // --- C. FUNÇÃO PARA LIDAR COM MUDANÇAS NO CAMPO DE BUSCA (EVENT HANDLER) ---
  // Esta função ('lidarComMudancaNaBusca') é chamada TODA VEZ que o usuário digita algo
  // no campo de input da busca.
  const lidarComMudancaNaBusca = (evento) => {
    const novoValorDoInput = evento.target.value;
    definirTermoDeBuscaDigitado(novoValorDoInput);
    if (onSearch) {
      onSearch(novoValorDoInput);
    }
  };

  // --- D. RETORNO DO JSX (O QUE O COMPONENTE Header VAI RENDERIZAR) ---
  // A tag <header> do HTML5 é usada para o container principal do cabeçalho.
  // A classe CSS do header é dinamicamente construída:
  // - `styles.header` é sempre aplicada.
  // - `styles.headerEncolhido` é aplicada CONDICIONALMENTE se o estado `headerEncolhido` for true.
  return (
    <header
      className={`${styles.header} ${
        headerEncolhido ? styles.headerEncolhido : ""
      }`}
    >
      {/* Wrapper para o conteúdo principal (logo, título, botão surpresa) */}
      <div className={styles.headerContentWrapper}>
        {/* Agrupa o logo e o título. */}
        <div className={styles.logoAndTitle}>
          <img
            src="https://colegiouni.com.br/new_site/wp-content/uploads/2019/04/Logo-Col%C3%A9gio-Unilavras-Oficial_2019-full-white-1.png"
            alt="Logotipo do Colégio Unilavras. Um escudo azul com um globo terrestre estilizado e o nome Unilavras abaixo."
            className={styles.logo} // O CSS Module cuidará da mudança de tamanho quando encolhido
          />
          <h1 className={styles.title}>ZooDex 🐾</h1>
        </div>

        {/* Botão "Animal Surpresa":
            - Pode ser escondido ou ajustado quando o header encolhe.
            - Neste exemplo, optamos por escondê-lo quando 'headerEncolhido' é true
              para dar mais espaço para a barra de busca e filtros em telas menores.
        */}
        {!headerEncolhido && (
          <button
            onClick={onRandom}
            className={styles.randomButton}
            title="Clique para ver informações de um animal escolhido aleatoriamente!"
          >
            Animal Surpresa ✨
          </button>
        )}
      </div>{" "}
      {/* Fim de .headerContentWrapper */}
      {/* Container para o campo de busca. */}
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
      </div>{" "}
      {/* Fim de .searchContainer */}
      {/* Container para os botões de ordenação. */}
      {/* Estes controles permanecem visíveis mesmo quando o header está encolhido,
          mas o padding geral do header (controlado por .headerEncolhido no CSS)
          fará com que ocupem menos espaço vertical.
      */}
      <div className={styles.sortControls}>
        <button
          onClick={() => onSort("name-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfabética (A-Z)"
        >
          Nome (A-Z)
        </button>
        <button
          onClick={() => onSort("name-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfabética inversa (Z-A)"
        >
          Nome (Z-A)
        </button>
        <button
          onClick={() => onSort("risk-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nível de risco de extinção, do menor para o maior risco"
        >
          Risco (Menor)
        </button>
        <button
          onClick={() => onSort("risk-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nível de risco de extinção, do maior para o menor risco"
        >
          Risco (Maior)
        </button>
        <button
          onClick={() => onSort("codigo-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por número do tazo (código) em ordem crescente"
        >
          Tazo Nº (Crescente)
        </button>
        <button
          onClick={() => onSort("codigo-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por número do tazo (código) em ordem decrescente"
        >
          Tazo Nº (Decrescente)
        </button>
      </div>{" "}
      {/* Fim de .sortControls */}
    </header> // Fim do componente Header
  );
}; // Fim da definição do componente Header

// --- 3. EXPORTAÇÃO DO COMPONENTE ---
// Torna o componente Header disponível para ser usado em outros arquivos (principalmente no App.js).
export default Header;
