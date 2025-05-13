// Caminho: src/components/Header.jsx

// =================================================================================================
// ARQUIVO: Header.jsx
// ... (Mantenha seus comentários iniciais sobre propósito, conceitos, props, etc.)
// Adicionar aos conceitos:
//  - Renderização Condicional de Conteúdo de Botões (CSS): Para mostrar texto completo em
//    telas maiores e apenas ícones em telas menores, melhorando a usabilidade mobile.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E FUNÇÕES ---
import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css"; // Certifique-se que o nome do arquivo CSS Module está correto

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'Header' ---
const Header = ({ onSearch, onSort, onRandom, initialSearchTerm }) => {
  // --- A. ESTADO LOCAL DO COMPONENTE ---
  const [termoDeBuscaDigitado, definirTermoDeBuscaDigitado] = useState(
    initialSearchTerm || ""
  );
  const [headerEncolhido, definirHeaderEncolhido] = useState(false);

  // --- B. REFS PARA CONTROLE DE SCROLL ---
  const ultimaPosicaoScroll = useRef(0);
  const headerRef = useRef(null);

  // --- C. CONSTANTES PARA OS LIMIARES DE SCROLL (THRESHOLDS) ---
  const LIMIAR_PARA_ENCOLHER = 100;
  const LIMIAR_PARA_EXPANDIR_PROXIMO_AO_TOPO = 50;
  const MINIMA_DISTANCIA_SCROLL_PARA_MUDANCA = 5;

  // --- D. EFEITO COLATERAL (useEffect) PARA LIDAR COM O SCROLL DA PÁGINA ---
  useEffect(() => {
    const lidarComScroll = () => {
      const posicaoScrollAtual =
        window.pageYOffset || document.documentElement.scrollTop;
      if (
        Math.abs(posicaoScrollAtual - ultimaPosicaoScroll.current) <
        MINIMA_DISTANCIA_SCROLL_PARA_MUDANCA
      ) {
        return;
      }
      const rolandoParaBaixo = posicaoScrollAtual > ultimaPosicaoScroll.current;

      if (
        rolandoParaBaixo &&
        posicaoScrollAtual > LIMIAR_PARA_ENCOLHER &&
        !headerEncolhido
      ) {
        definirHeaderEncolhido(true);
      } else if (!rolandoParaBaixo && headerEncolhido) {
        if (posicaoScrollAtual < LIMIAR_PARA_EXPANDIR_PROXIMO_AO_TOPO) {
          definirHeaderEncolhido(false);
        }
      }
      if (posicaoScrollAtual === 0 && headerEncolhido) {
        definirHeaderEncolhido(false);
      }
      ultimaPosicaoScroll.current =
        posicaoScrollAtual <= 0 ? 0 : posicaoScrollAtual;
    };
    window.addEventListener("scroll", lidarComScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", lidarComScroll);
    };
  }, [headerEncolhido]); // Dependência crucial para a lógica correta

  // --- E. FUNÇÃO PARA LIDAR COM MUDANÇAS NO CAMPO DE BUSCA ---
  const lidarComMudancaNaBusca = (evento) => {
    const novoValorDoInput = evento.target.value;
    definirTermoDeBuscaDigitado(novoValorDoInput);
    if (onSearch) {
      onSearch(novoValorDoInput);
    }
  };

  // --- F. RETORNO DO JSX ---
  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${
        headerEncolhido ? styles.headerEncolhido : ""
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
        {/* Botão Animal Surpresa é escondido quando o header encolhe para economizar espaço */}
        {!headerEncolhido && (
          <button
            onClick={onRandom}
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
          placeholder="Buscar por nome comum ou cient\xedfico..."
          className={styles.searchInput}
          aria-label="Campo de busca para encontrar animais por nome comum ou cient\xedfico"
        />
      </div>

      <div className={styles.sortControls}>
        {/* Botões de Ordenação com texto e ícones (setas) para responsividade */}
        {/* O CSS Module controlará qual span é exibido com base no tamanho da tela */}

        <button
          onClick={() => onSort("name-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfab\xe9tica (A-Z)"
          title="Ordenar Nome A-Z" // title para quando só o ícone for visível
        >
          <span className={styles.sortButtonText}>Nome</span>
          <span className={styles.sortButtonTextDirection}>(A-Z)</span>
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▲
          </span>{" "}
          {/* Seta para cima para ascendente */}
        </button>

        <button
          onClick={() => onSort("name-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfab\xe9tica inversa (Z-A)"
          title="Ordenar Nome Z-A"
        >
          <span className={styles.sortButtonText}>Nome</span>
          <span className={styles.sortButtonTextDirection}>(Z-A)</span>
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▼
          </span>{" "}
          {/* Seta para baixo para descendente */}
        </button>

        <button
          onClick={() => onSort("risk-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xedvel de risco de extin\xe7\xe3o, do menor para o maior risco"
          title="Ordenar Risco (Menor)"
        >
          <span className={styles.sortButtonText}>Risco</span>
          <span className={styles.sortButtonTextDirection}>(Menor)</span>
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▲
          </span>
        </button>

        <button
          onClick={() => onSort("risk-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xedvel de risco de extin\xe7\xe3o, do maior para o menor risco"
          title="Ordenar Risco (Maior)"
        >
          <span className={styles.sortButtonText}>Risco</span>
          <span className={styles.sortButtonTextDirection}>(Maior)</span>
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▼
          </span>
        </button>

        <button
          onClick={() => onSort("codigo-asc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xfamero do tazo (c\xf3digo) em ordem crescente"
          title="Ordenar Tazo Nº (Crescente)"
        >
          <span className={styles.sortButtonText}>Tazo Nº</span>
          <span className={styles.sortButtonTextDirection}>(Cresc.)</span>{" "}
          {/* Abreviação para caber melhor */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▲
          </span>
        </button>

        <button
          onClick={() => onSort("codigo-desc")}
          className={styles.sortButton}
          aria-label="Ordenar animais por n\xfamero do tazo (c\xf3digo) em ordem decrescente"
          title="Ordenar Tazo Nº (Decrescente)"
        >
          <span className={styles.sortButtonText}>Tazo Nº</span>
          <span className={styles.sortButtonTextDirection}>
            (Decresc.)
          </span>{" "}
          {/* Abreviação */}
          <span className={styles.sortButtonIcon} aria-hidden="true">
            ▼
          </span>
        </button>
      </div>
    </header>
  );
};

// --- 3. EXPORTAÇÃO DO COMPONENTE ---
export default Header;
