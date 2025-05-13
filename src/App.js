// Caminho: src/App.js

// =================================================================================================
// ARQUIVO: App.js
// PROPÓSITO: Componente principal (raiz) da aplicação ZooDex.
//            Responsável por gerenciar o estado geral, incluindo a lista de animais,
//            filtros, ordenação, seleção de animal para detalhes, E AGORA, PAGINAÇÃO.
//            Ele orquestra a renderização dos componentes Header, AnimalList,
//            AnimalDetail, Pagination e Footer.
//
// NOVOS CONCEITOS COM A PAGINAÇÃO:
//  - Mais Gerenciamento de Estado (useState):
//    - 'paginaAtual': Para saber qual página de resultados mostrar.
//    - 'itensPorPagina': Para definir quantos animais mostrar por página.
//  - Lógica de "Fatiamento" (Slicing) de Arrays: Para pegar apenas o subconjunto
//    de animais que pertence à página atual.
//  - Cálculo de Total de Páginas: Para saber quantos botões de página gerar.
//  - Novas Funções de Callback: Para permitir que o componente de Paginação
//    altere a 'paginaAtual' no App.js.
// =================================================================================================

// --- 1. IMPORTAÇÕES ---
import React, { useState, useEffect, useCallback } from "react";
import { processedAnimalData, get } from "./data/animalData"; // Usaremos os dados completos agora.
import Header from "./components/Header";
import AnimalList from "./components/AnimalList";
import AnimalDetail from "./components/AnimalDetail";
import Footer from "./components/Footer";

// --- NOVO COMPONENTE (Placeholder): Pagination ---
// Idealmente, este seria um arquivo separado (src/components/Pagination.jsx).
// Por enquanto, vamos definir uma estrutura básica aqui para que o App.js funcione.
// Você pode me pedir para detalhar o Pagination.jsx e seu CSS depois.
const Pagination = ({ paginaAtual, totalDePaginas, onPageChange }) => {
  if (totalDePaginas <= 1) {
    // Não mostra paginação se houver apenas uma página ou menos.
    return null;
  }

  const numerosDasPaginas = [];
  for (let i = 1; i <= totalDePaginas; i++) {
    numerosDasPaginas.push(i);
  }

  // Estilos inline MUITO básicos apenas para este exemplo.
  // No componente real, usaríamos CSS Modules.
  const estiloBotao = {
    margin: "0 5px",
    padding: "5px 10px",
    cursor: "pointer",
    border: "1px solid var(--color-primary)",
    borderRadius: "var(--border-radius-small)",
  };
  const estiloBotaoAtivo = {
    ...estiloBotao,
    backgroundColor: "var(--color-primary)",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <nav
      aria-label="Navegação de páginas de animais"
      style={{ textAlign: "center", margin: "2rem 0" }}
    >
      <button
        onClick={() => onPageChange(paginaAtual - 1)}
        disabled={paginaAtual === 1} // Desabilita se estiver na primeira página.
        style={estiloBotao}
        aria-label="Ir para a página anterior"
      >
        Anterior
      </button>
      {numerosDasPaginas.map((numero) => (
        <button
          key={numero}
          onClick={() => onPageChange(numero)}
          disabled={paginaAtual === numero} // Desabilita o botão da página atual.
          style={paginaAtual === numero ? estiloBotaoAtivo : estiloBotao}
          aria-current={paginaAtual === numero ? "page" : undefined} // Acessibilidade: indica a página atual.
          aria-label={`Ir para a página ${numero}`}
        >
          {numero}
        </button>
      ))}
      <button
        onClick={() => onPageChange(paginaAtual + 1)}
        disabled={paginaAtual === totalDePaginas} // Desabilita se estiver na última página.
        style={estiloBotao}
        aria-label="Ir para a próxima página"
      >
        Próxima
      </button>
    </nav>
  );
};

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'App' ---
function App() {
  // --- A. ESTADOS DO COMPONENTE ---

  // Estado para a LISTA COMPLETA de animais após filtro e ordenação.
  // Esta lista será então "fatiada" para a paginação.
  const [animaisFiltradosEOrdenados, definirAnimaisFiltradosEOrdenados] =
    useState(processedAnimalData);

  // Estado para a LISTA DE ANIMAIS A SEREM EFETIVAMENTE EXIBIDOS NA PÁGINA ATUAL.
  // Este é o array que será passado para o componente AnimalList.
  const [animaisParaExibirNaPagina, definirAnimaisParaExibirNaPagina] =
    useState([]);

  const [idAnimalSelecionado, definirIdAnimalSelecionado] = useState(null);
  const [termoDeBusca, definirTermoDeBusca] = useState("");
  const [ordenacaoAtual, definirOrdenacaoAtual] = useState("codigo-asc"); // Padrão

  // NOVOS ESTADOS PARA PAGINAÇÃO:
  const [paginaAtual, definirPaginaAtual] = useState(1); // A paginação começa na página 1.
  const [itensPorPagina] = useState(8); // Quantos animais mostrar por página.
  // Poderia ser um estado se você quisesse permitir
  // que o usuário mudasse isso (ex: via um dropdown).
  // Para simplificar, vamos manter como uma constante por enquanto.

  // Estado para o NÚMERO TOTAL DE PÁGINAS.
  // Será calculado com base no total de animais e itensPorPagina.
  const [totalDePaginas, definirTotalDePaginas] = useState(0);

  // --- B. EFEITO PARA FILTRAR E ORDENAR A LISTA COMPLETA DE ANIMAIS ---
  // Este useEffect reage a mudanças no 'termoDeBusca' ou 'ordenacaoAtual'.
  // Seu resultado (uma lista filtrada e ordenada) será armazenado em 'animaisFiltradosEOrdenados'.
  useEffect(() => {
    // console.log("App.js - useEffect [Filtro/Ordenação]: Disparado.");
    let animaisProcessados = [...processedAnimalData]; // Começa com todos os animais.

    // 1. APLICAR FILTRO DE BUSCA
    if (termoDeBusca && termoDeBusca.trim() !== "") {
      const termoMinusculo = termoDeBusca.toLowerCase().trim();
      animaisProcessados = animaisProcessados.filter(
        (animal) =>
          get(animal, "nome_tazo", "").toLowerCase().includes(termoMinusculo) ||
          get(animal, "nome_cientifico", "")
            .toLowerCase()
            .includes(termoMinusculo)
      );
    }

    // 2. APLICAR ORDENAÇÃO
    if (ordenacaoAtual) {
      // A lógica de switch para ordenação permanece a mesma da versão anterior.
      switch (ordenacaoAtual) {
        case "name-asc":
          animaisProcessados.sort((a, b) =>
            get(a, "nome_tazo", "").localeCompare(get(b, "nome_tazo", ""))
          );
          break;
        case "name-desc":
          animaisProcessados.sort((a, b) =>
            get(b, "nome_tazo", "").localeCompare(get(a, "nome_tazo", ""))
          );
          break;
        case "risk-desc":
          animaisProcessados.sort(
            (a, b) =>
              get(b, "nivel_extincao.indice_risco_calculado", 0) -
              get(a, "nivel_extincao.indice_risco_calculado", 0)
          );
          break;
        case "risk-asc":
          animaisProcessados.sort(
            (a, b) =>
              get(a, "nivel_extincao.indice_risco_calculado", 0) -
              get(b, "nivel_extincao.indice_risco_calculado", 0)
          );
          break;
        case "codigo-asc":
          animaisProcessados.sort(
            (a, b) => get(a, "codigo", 0) - get(b, "codigo", 0)
          );
          break;
        case "codigo-desc":
          animaisProcessados.sort(
            (a, b) => get(b, "codigo", 0) - get(a, "codigo", 0)
          );
          break;
        default:
          // Se um tipo de ordenação desconhecido for passado, podemos logar um aviso
          // e talvez manter a ordem atual ou aplicar uma ordenação padrão.
          console.warn(
            `App.js: Tipo de ordenação desconhecido "${ordenacaoAtual}". Mantendo ordenação por código ascendente.`
          );
          animaisProcessados.sort(
            (a, b) => get(a, "codigo", 0) - get(b, "codigo", 0)
          );
          break;
      }
    }

    // Define o estado com a lista completa já filtrada e ordenada.
    definirAnimaisFiltradosEOrdenados(animaisProcessados);

    // IMPORTANTE PARA PAGINAÇÃO: Quando a lista base (filtrada/ordenada) muda,
    // devemos VOLTAR para a primeira página para evitar exibir uma página vazia
    // ou uma página que não faz mais sentido com os novos dados.
    definirPaginaAtual(1);

    // Array de dependências: este efeito roda se 'termoDeBusca' ou 'ordenacaoAtual' mudarem.
    // 'processedAnimalData' é incluído caso, hipoteticamente, a fonte de dados original pudesse mudar.
    // Como é uma constante importada, não mudará, mas é uma boa prática considerar se fosse dinâmico.
  }, [termoDeBusca, ordenacaoAtual, processedAnimalData]);

  // --- C. EFEITO PARA ATUALIZAR OS ITENS DA PÁGINA ATUAL E O TOTAL DE PÁGINAS ---
  // Este useEffect reage a mudanças na lista 'animaisFiltradosEOrdenados' (resultado do efeito anterior)
  // OU na 'paginaAtual' OU em 'itensPorPagina'.
  // Ele é responsável por:
  //   1. Calcular o subconjunto (fatia) de animais que deve ser exibido na página atual.
  //   2. Calcular e definir o número total de páginas.
  useEffect(() => {
    // console.log(`App.js - useEffect [Paginação]: Disparado. Página Atual: ${paginaAtual}`);

    // 1. CALCULAR O TOTAL DE PÁGINAS:
    //    - 'animaisFiltradosEOrdenados.length': O número total de animais após filtro/ordenação.
    //    - 'itensPorPagina': Quantos animais mostramos por página.
    //    - 'Math.ceil()': Arredonda para o número inteiro MAIS PRÓXIMO ACIMA.
    //                     Ex: Se temos 25 animais e 10 por página, 25/10 = 2.5. Math.ceil(2.5) = 3 páginas.
    const novoTotalDePaginas = Math.ceil(
      animaisFiltradosEOrdenados.length / itensPorPagina
    );
    definirTotalDePaginas(novoTotalDePaginas);

    // 2. CALCULAR OS ÍNDICES PARA "FATIAR" O ARRAY:
    //    O método '.slice(inicio, fim)' de arrays em JavaScript retorna uma cópia
    //    rasa de uma porção do array, do índice 'inicio' ATÉ (mas não incluindo) o índice 'fim'.
    //    Os índices de array começam em 0.
    //
    //    - 'indiceDeInicio': O índice do primeiro animal da página atual.
    //                      Para a página 1, (1-1)*10 = 0.
    //                      Para a página 2, (2-1)*10 = 10.
    const indiceDeInicio = (paginaAtual - 1) * itensPorPagina;
    //    - 'indiceDeFim': O índice do ÚLTIMO animal da página atual + 1.
    //                     Para a página 1, 0 + 10 = 10. Slice pegará de 0 a 9.
    //                     Para a página 2, 10 + 10 = 20. Slice pegará de 10 a 19.
    const indiceDeFim = indiceDeInicio + itensPorPagina;

    // 3. "FATIAR" O ARRAY PARA OBTER OS ANIMAIS DA PÁGINA ATUAL:
    const animaisDaPaginaAtual = animaisFiltradosEOrdenados.slice(
      indiceDeInicio,
      indiceDeFim
    );

    // 4. ATUALIZAR O ESTADO DOS ANIMAIS A SEREM EXIBIDOS:
    definirAnimaisParaExibirNaPagina(animaisDaPaginaAtual);

    // Array de dependências: este efeito roda se a lista filtrada/ordenada mudar,
    // ou se a página atual mudar, ou se a quantidade de itens por página mudar.
  }, [animaisFiltradosEOrdenados, paginaAtual, itensPorPagina]);

  // --- D. FUNÇÕES DE CALLBACK MEMORIZADAS (useCallback) ---

  // Função para lidar com a mudança de texto na busca.
  // É passada para o componente Header.
  const lidarComBusca = useCallback((termo) => {
    definirTermoDeBusca(termo); // Atualiza o estado do termo de busca.
    // Ao fazer uma nova busca, é importante resetar para a primeira página
    // para evitar que o usuário fique em uma página que não existe mais
    // para os novos resultados da busca.
    // A lógica de resetar a página já está no useEffect de filtro/ordenação.
    definirIdAnimalSelecionado(null); // Volta para a lista ao buscar.
  }, []); // Array de dependências vazio, pois 'definirTermoDeBusca' e 'definirIdAnimalSelecionado' são estáveis.

  // Função para lidar com a mudança de critério de ordenação.
  // É passada para o componente Header.
  const lidarComOrdenacao = useCallback((tipoDeOrdenacao) => {
    definirOrdenacaoAtual(tipoDeOrdenacao); // Atualiza o estado da ordenação.
    // Similar à busca, resetar para a primeira página ao reordenar.
    // A lógica de resetar a página já está no useEffect de filtro/ordenação.
    definirIdAnimalSelecionado(null); // Volta para a lista ao ordenar.
  }, []);

  // Função para lidar com a seleção de um animal (clique no card).
  // É passada para AnimalList, que por sua vez a passa para cada AnimalCard.
  const lidarComSelecaoDeAnimal = useCallback((idDoAnimal) => {
    definirIdAnimalSelecionado(idDoAnimal); // Define qual animal está selecionado.
    window.scrollTo(0, 0); // Rola a página para o topo para mostrar o detalhe do animal.
  }, []);

  // Função para voltar da tela de detalhes para a lista de animais.
  // É passada para o componente AnimalDetail.
  const lidarComVoltarParaLista = useCallback(() => {
    definirIdAnimalSelecionado(null); // Limpa o ID do animal selecionado, voltando para a exibição da lista.
  }, []);

  // Função para selecionar um animal aleatoriamente.
  // É passada para o componente Header.
  const lidarComAnimalAleatorio = useCallback(() => {
    if (processedAnimalData && processedAnimalData.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * processedAnimalData.length
      );
      const animalAleatorioId = processedAnimalData[indiceAleatorio].id_animal;
      definirIdAnimalSelecionado(animalAleatorioId);
      window.scrollTo(0, 0);
    }
  }, [processedAnimalData]); // Depende de 'processedAnimalData' para saber de onde sortear.

  // NOVA FUNÇÃO DE CALLBACK PARA PAGINAÇÃO:
  // Esta função será chamada pelo componente Pagination quando o usuário clicar
  // em um botão de página (Anterior, Próxima, ou um número de página).
  // 'numeroDaPaginaAlvo' é o número da página para a qual queremos navegar.
  const lidarComMudancaDePagina = useCallback(
    (numeroDaPaginaAlvo) => {
      // console.log(`App.js: Mudando para a página ${numeroDaPaginaAlvo}`);

      // Validações simples para garantir que o número da página alvo seja válido.
      if (numeroDaPaginaAlvo >= 1 && numeroDaPaginaAlvo <= totalDePaginas) {
        definirPaginaAtual(numeroDaPaginaAlvo); // Atualiza o estado da página atual.
        window.scrollTo(0, 0); // Opcional: rolar para o topo ao mudar de página.
      } else {
        console.warn(
          `App.js: Tentativa de navegar para página inválida: ${numeroDaPaginaAlvo}. Total de páginas: ${totalDePaginas}`
        );
      }
    },
    [totalDePaginas]
  ); // Depende de 'totalDePaginas' para validação. 'definirPaginaAtual' é estável.

  // --- E. LÓGICA PARA ENCONTRAR O ANIMAL SELECIONADO PARA DETALHE ---
  // Se 'idAnimalSelecionado' NÃO for null, procuramos o objeto completo do animal
  // na nossa lista 'processedAnimalData' original.
  const animalDetalhado = idAnimalSelecionado
    ? processedAnimalData.find(
        (animal) => animal.id_animal === idAnimalSelecionado
      )
    : null; // Se nenhum ID estiver selecionado, 'animalDetalhado' será null.

  // --- F. RENDERIZAÇÃO DO COMPONENTE App ---
  return (
    // Fragmento React (<>...</>) para agrupar os elementos sem adicionar um nó <div> extra ao DOM.
    <>
      {/* Renderiza o Header CONDICIONALMENTE:
          Só mostra o Header se NÃO estivermos na tela de detalhes de um animal. */}
      {!animalDetalhado && (
        <Header
          onSearch={lidarComBusca}
          onSort={lidarComOrdenacao}
          onRandom={lidarComAnimalAleatorio}
          initialSearchTerm={termoDeBusca}
        />
      )}

      {/* Conteúdo Principal (<main>) */}
      <main
        style={{
          flexGrow: 1, // Para ocupar o espaço vertical disponível.
          padding: "var(--spacing-medium, 1rem)", // Usando variável CSS.
          maxWidth: "1200px",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Lógica de Renderização Condicional para o conteúdo principal: */}
        {animalDetalhado ? (
          // SE um animal estiver selecionado (animalDetalhado não é null):
          // Mostra o componente AnimalDetail com os dados desse animal.
          <AnimalDetail
            animal={animalDetalhado}
            onBack={lidarComVoltarParaLista}
          />
        ) : // SENÃO (nenhum animal selecionado, mostramos a lista):
        animaisParaExibirNaPagina.length > 0 ? (
          // SE houver animais para exibir na página atual (após filtro e paginação):
          // Mostra o componente AnimalList.
          <>
            {" "}
            {/* Usamos um fragmento para agrupar AnimalList e Pagination */}
            <AnimalList
              animals={animaisParaExibirNaPagina} // Passa APENAS os animais da página atual.
              onSelectAnimal={lidarComSelecaoDeAnimal}
            />
            {/* Renderiza o componente de Paginação */}
            <Pagination
              paginaAtual={paginaAtual}
              totalDePaginas={totalDePaginas}
              onPageChange={lidarComMudancaDePagina} // Passa a função para mudar de página.
            />
          </>
        ) : (
          // SENÃO (nenhum animal selecionado E a lista de animais para exibir está vazia,
          //        ex: resultado de uma busca sem correspondências):
          // Mostra uma mensagem informativa.
          <p className="error-message">
            {" "}
            {/* Usando classe global de index.css */}
            Nenhum animal encontrado. Tente uma busca ou filtro diferente!
          </p>
        )}
      </main>

      {/* Renderiza o Footer no final da página. */}
      <Footer />
    </>
  );
}

// Exporta o componente App.
export default App;
