// Caminho: src/components/Header.jsx

// =================================================================================================
// ARQUIVO: Header.jsx
// PROPÓSITO: Este componente define o Cabeçalho (Header) da aplicação ZooDex.
//            O cabeçalho é a barra no topo da página e contém:
//            - O logotipo e o título da aplicação.
//            - Um botão para selecionar um "Animal Surpresa".
//            - Um campo de texto para o usuário buscar animais por nome.
//            - Botões para o usuário ordenar a lista de animais.
//
// CONCEITOS PRINCIPAIS DO REACT E JAVASCRIPT UTILIZADOS AQUI:
//  - Componentes Funcionais: Como este componente é estruturado.
//  - Props (Propriedades): Como o Header recebe dados e, mais importante, FUNÇÕES
//                          de seu componente pai (App.js). Essas funções (callbacks)
//                          permitem que o Header comunique ao App.js as ações do usuário
//                          (ex: o que foi digitado na busca, qual botão de ordenação foi clicado).
//                          As props recebidas são:
//                            - 'onSearch': Função a ser chamada quando o texto na busca muda.
//                            - 'onSort': Função a ser chamada quando um botão de ordenação é clicado.
//                            - 'onRandom': Função a ser chamada quando o botão "Animal Surpresa" é clicado.
//                            - 'initialSearchTerm': O valor inicial para o campo de busca (útil se o App.js
//                                                   quiser restaurar um termo de busca anterior).
//  - useState: Hook do React para adicionar ESTADO LOCAL ao componente Header.
//              Neste caso, usamos para controlar o valor ATUAL do campo de busca.
//              O campo de busca se torna um "componente controlado" pelo React.
//  - JSX: A sintaxe para descrever a estrutura da interface do usuário.
//  - Manipulação de Eventos: Como o componente reage a ações do usuário, como:
//                           - 'onChange' no campo de busca (quando o usuário digita).
//                           - 'onClick' nos botões.
//  - Acessibilidade: Uso de 'aria-label' e 'title' para tornar a interface mais
//                    acessível para usuários com tecnologias assistivas.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E FUNÇÕES ---

// Importamos a biblioteca 'React' e o Hook 'useState'.
// - React: Essencial para criar o componente e usar JSX.
// - useState: Permite que o componente Header tenha seu próprio estado interno.
//           Neste caso, o estado será o texto atual dentro do campo de busca.
import React, { useState } from "react";

// Importamos o objeto 'styles' do nosso arquivo CSS Module (Header.module.css).
// Isso nos dá acesso às classes CSS definidas lá de forma escopada,
// como 'styles.header', 'styles.searchInput', etc.
import styles from "./Header.module.css";

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'Header' ---

// O componente Header é uma função que aceita um objeto de 'props' como argumento.
// Usamos a desestruturação para pegar diretamente as props que esperamos receber do App.js:
//  - onSearch: Uma função que o App.js nos passou. O Header vai chamá-la sempre que
//              o usuário digitar algo no campo de busca.
//  - onSort: Uma função do App.js. O Header vai chamá-la quando um botão de ordenação
//            for clicado, informando qual tipo de ordenação foi escolhido.
//  - onRandom: Uma função do App.js. O Header vai chamá-la quando o botão "Animal Surpresa"
//              for clicado.
//  - initialSearchTerm: O texto que deve aparecer inicialmente no campo de busca.
//                       Se não for fornecido, o campo começará vazio.
const Header = ({ onSearch, onSort, onRandom, initialSearchTerm }) => {
  // --- A. ESTADO LOCAL DO COMPONENTE (para o campo de busca) ---
  // Usamos 'useState' para criar uma variável de estado chamada 'termoDeBuscaDigitado'.
  // - 'termoDeBuscaDigitado': Armazena o texto ATUAL que está no campo de input da busca.
  // - 'definirTermoDeBuscaDigitado': É a FUNÇÃO que usamos para ATUALIZAR 'termoDeBuscaDigitado'.
  // - `useState(initialSearchTerm || "")`: O valor inicial de 'termoDeBuscaDigitado'.
  //   Se 'initialSearchTerm' foi passado como prop, usamos ele. Senão (||), usamos uma string vazia "".
  //   Isso faz com que o campo de busca seja um "componente controlado": seu valor é
  //   controlado pelo estado do React, e não diretamente pelo DOM.
  const [termoDeBuscaDigitado, definirTermoDeBuscaDigitado] = useState(
    initialSearchTerm || ""
  );

  // --- B. FUNÇÃO PARA LIDAR COM MUDANÇAS NO CAMPO DE BUSCA (EVENT HANDLER) ---
  // Esta função ('lidarComMudancaNaBusca') é chamada TODA VEZ que o usuário digita algo
  // no campo de input da busca (devido ao atributo 'onChange' no <input />).
  // O 'evento' é um objeto que o navegador passa para a função, contendo informações
  // sobre o que aconteceu (neste caso, a mudança no input).
  const lidarComMudancaNaBusca = (evento) => {
    // 1. Pegar o novo valor do campo de busca:
    //    'evento.target' se refere ao elemento HTML <input /> que disparou o evento.
    //    'evento.target.value' é o texto atual DENTRO desse campo de input.
    const novoValorDoInput = evento.target.value;

    // 2. Atualizar o estado local do Header:
    //    Chamamos 'definirTermoDeBuscaDigitado' para atualizar nossa variável de estado
    //    'termoDeBuscaDigitado' com o novo texto que o usuário digitou.
    //    Isso faz com que o React re-renderize o Header, e o <input /> mostrará o novo valor.
    definirTermoDeBuscaDigitado(novoValorDoInput);

    // 3. Comunicar a mudança para o componente pai (App.js):
    //    Verificamos se a função 'onSearch' foi realmente passada como prop.
    if (onSearch) {
      // Se sim, chamamos 'onSearch', passando o 'novoValorDoInput'.
      // Desta forma, o componente App.js é NOTIFICADO sobre o que o usuário
      // digitou, e o App.js pode então usar esse termo para filtrar a lista de animais.
      // Isso é um exemplo de "elevar o estado" (lifting state up) ou, mais precisamente,
      // de comunicação de filho para pai através de callbacks.
      onSearch(novoValorDoInput);
    }
  };

  // --- C. RETORNO DO JSX (O QUE O COMPONENTE Header VAI RENDERIZAR) ---
  // A tag <header> do HTML5 é usada para o container principal do cabeçalho.
  return (
    <header className={styles.header}>
      {/* Wrapper para o conteúdo principal (logo, título, botão surpresa)
          para ajudar no layout responsivo com Flexbox. */}
      <div className={styles.headerContentWrapper}>
        {/* Agrupa o logo e o título. */}
        <div className={styles.logoAndTitle}>
          <img
            src="https://colegiouni.com.br/new_site/wp-content/uploads/2019/04/Logo-Col%C3%A9gio-Unilavras-Oficial_2019-full-white-1.png"
            alt="Logotipo do Colégio Unilavras. Um escudo azul com um globo terrestre estilizado e o nome Unilavras abaixo." // Texto alternativo bem descritivo.
            className={styles.logo}
          />
          <h1 className={styles.title}>ZooDex 🐾</h1>{" "}
          {/* Título da aplicação. */}
        </div>

        {/* Botão "Animal Surpresa":
            - onClick={onRandom}: Quando clicado, chama a função 'onRandom' que foi
                                 passada como prop pelo App.js. O App.js então
                                 cuidará da lógica de selecionar um animal aleatoriamente.
            - title: Fornece uma dica visual ao passar o mouse sobre o botão. */}
        <button
          onClick={onRandom} // Chama a função do App.js
          className={styles.randomButton}
          title="Clique para ver informações de um animal escolhido aleatoriamente!"
        >
          Animal Surpresa ✨
        </button>
      </div>{" "}
      {/* Fim de .headerContentWrapper */}
      {/* Container para o campo de busca. */}
      <div className={styles.searchContainer}>
        <input
          type="search" // Tipo de input semanticamente correto para buscas.
          id="search-input" // ID para o input, pode ser útil para labels ou testes.
          value={termoDeBuscaDigitado} // O valor do input é controlado pelo estado 'termoDeBuscaDigitado'.
          // Isso o torna um "componente controlado".
          onChange={lidarComMudancaNaBusca} // Função chamada sempre que o valor do input muda.
          placeholder="Buscar por nome comum ou científico..." // Texto de ajuda dentro do campo.
          className={styles.searchInput} // Classe CSS para estilização.
          aria-label="Campo de busca para encontrar animais por nome comum ou científico" // Descrição para leitores de tela.
        />
      </div>{" "}
      {/* Fim de .searchContainer */}
      {/* Container para os botões de ordenação. */}
      <div className={styles.sortControls}>
        {/*
          Cada botão de ordenação, quando clicado, chama a função 'onSort' (passada pelo App.js),
          enviando uma string que identifica o tipo de ordenação desejado (ex: "name-asc").
          O App.js usará essa string para reordenar a lista de animais.
          Usamos arrow functions no onClick (ex: () => onSort("name-asc")) para poder passar
          um argumento específico para 'onSort' quando o botão é clicado. Se fosse apenas
          onClick={onSort}, não poderíamos passar o tipo de ordenação diretamente.
        */}
        <button
          onClick={() => onSort("name-asc")} // Ordena por nome, de A a Z.
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfabética (A-Z)"
        >
          Nome (A-Z)
        </button>
        <button
          onClick={() => onSort("name-desc")} // Ordena por nome, de Z a A.
          className={styles.sortButton}
          aria-label="Ordenar animais por nome em ordem alfabética inversa (Z-A)"
        >
          Nome (Z-A)
        </button>
        <button
          onClick={() => onSort("risk-asc")} // Ordena por risco, do menor para o maior.
          className={styles.sortButton}
          aria-label="Ordenar animais por nível de risco de extinção, do menor para o maior risco"
        >
          Risco (Menor)
        </button>
        <button
          onClick={() => onSort("risk-desc")} // Ordena por risco, do maior para o menor.
          className={styles.sortButton}
          aria-label="Ordenar animais por nível de risco de extinção, do maior para o menor risco"
        >
          Risco (Maior)
        </button>
        <button
          onClick={() => onSort("codigo-asc")} // Ordena por número do tazo (código), do menor para o maior.
          className={styles.sortButton}
          aria-label="Ordenar animais por número do tazo (código) em ordem crescente"
        >
          Tazo Nº (Crescente)
        </button>
        <button
          onClick={() => onSort("codigo-desc")} // Ordena por número do tazo (código), do maior para o menor.
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
