// Caminho: src/components/AnimalCard.jsx

// =================================================================================================
// ARQUIVO: AnimalCard.jsx
// PROPÓSITO: Este arquivo define um componente React chamado 'AnimalCard'.
//            Um "componente" em React é como um bloco de construção para a sua página da web.
//            Este componente específico é projetado para exibir um "card" (cartão) com
//            informações resumidas sobre um único animal. Ele também terá um efeito visual
//            interativo: o card vai "virar" (como um tazo ou uma carta de baralho)
//            quando o usuário interagir com ele (passando o mouse ou usando o teclado).
//
// CONCEITOS FUNDAMENTAIS DE REACT E JAVASCRIPT DEMONSTRADOS AQUI:
//  1. Componentes Funcionais: A forma moderna de criar componentes em React, usando funções JavaScript.
//  2. JSX (JavaScript XML): Uma extensão de sintaxe para JavaScript que se parece com HTML.
//                           É usada para descrever como a interface do usuário deve parecer.
//  3. Props (Propriedades): Como os componentes recebem dados de seus "componentes pais".
//                           Este AnimalCard receberá:
//                             - 'animal': Um objeto contendo todas as informações do animal.
//                             - 'onSelectAnimal': Uma função que será chamada quando o card for clicado.
//  4. Estado (State) com o Hook 'useState':
//                           Como os componentes podem "lembrar" de informações que podem mudar
//                           ao longo do tempo (neste caso, se o card está virado ou não).
//                           Quando o estado muda, o React automaticamente atualiza a aparência do componente.
//  5. Manipuladores de Eventos (Event Handlers):
//                           Funções que são executadas em resposta a ações do usuário, como:
//                             - 'onClick': Quando o usuário clica no card.
//                             - 'onMouseEnter'/'onMouseLeave': Quando o cursor do mouse entra/sai da área do card.
//                             - 'onFocus'/'onBlur': Quando o card recebe/perde foco via teclado.
//                             - 'onKeyDown': Para interações com o teclado (como pressionar Enter ou Espaço).
//  6. CSS Modules: Uma técnica para escrever CSS de forma que os estilos sejam "escopados"
//                  localmente para este componente, evitando conflitos com estilos de outros
//                  componentes na aplicação.
//  7. Acessibilidade (a11y): Práticas para tornar o componente utilizável por mais pessoas,
//                            incluindo aquelas que usam leitores de tela ou navegam pelo teclado.
//                            (ex: 'tabIndex', 'role', 'aria-label', 'alt' em imagens).
//  8. Renderização Condicional (implícita): Como o que é exibido pode mudar com base no estado
//                                         (ex: mostrar a frente ou o verso do card).
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E FUNÇÕES NECESSÁRIAS ---

// Importa a biblioteca 'React' e o Hook 'useState'.
// - 'React': É a biblioteca principal que nos permite definir componentes e usar JSX.
//            O JSX que escrevemos (ex: <div>) é transformado em chamadas como React.createElement('div').
// - 'useState': É um "Hook" do React. Hooks são funções especiais que "engancham"
//              nos recursos internos do React, como o sistema de estado e ciclo de vida,
//              permitindo que os usemos em componentes funcionais.
//              'useState' especificamente nos permite adicionar uma variável de "estado"
//              ao nosso componente.
import React, { useState } from "react";

// Importa o objeto 'styles' do nosso arquivo CSS Module associado ('AnimalCard.module.css').
// - 'styles': Este nome é uma convenção. Quando o arquivo CSS é nomeado com '.module.css',
//             o sistema de build do React (ou uma ferramenta como o Webpack) processa este CSS
//             de uma forma especial. Todas as classes CSS definidas nesse arquivo
//             (ex: a classe '.animalCard' em AnimalCard.module.css)
//             se tornam propriedades do objeto 'styles' (ex: styles.animalCard).
//             O valor dessas propriedades será uma string com um nome de classe único
//             gerado automaticamente (ex: "AnimalCard_animalCard__XyZ123").
//             Isso garante que os estilos sejam aplicados APENAS a este componente,
//             evitando conflitos de nomes de classes CSS com outros componentes.
import styles from "./AnimalCard.module.css";

// Importa funções utilitárias do nosso arquivo de dados ('animalData.js').
// - 'get(objeto, caminho, valorPadrao)': Uma função que criamos para buscar valores
//                                       dentro de objetos JavaScript de forma segura.
//                                       Se tentarmos acessar `animal.prop.subprop` e `prop`
//                                       não existir, o JavaScript normalmente daria um erro.
//                                       A função `get` nos ajuda a evitar isso, retornando
//                                       um 'valorPadrao' (como "N/A") se o 'caminho'
//                                       para a propriedade não for encontrado.
// - 'getExtinctionHexColor(categoria)': Retorna uma string com o código hexadecimal
//                                      de uma cor (ex: "#FF0000" para vermelho)
//                                      baseada na categoria de extinção do animal (ex: "EN" para Em Perigo).
import { get, getExtinctionHexColor } from "../data/animalData";

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'AnimalCard' ---

// 'AnimalCard' é um componente funcional. Ele é definido como uma função JavaScript.
// Esta função aceita um único argumento: um objeto chamado 'props' (abreviação de propriedades).
// Usamos a "desestruturação de objetos" do JavaScript na lista de parâmetros da função:
//   `({ animal, onSelectAnimal })`
// Isso é um atalho para pegar diretamente as propriedades 'animal' e 'onSelectAnimal'
// de dentro do objeto 'props' que o componente pai (provavelmente AnimalList.jsx) passará.
// Seria o mesmo que escrever:
//   const AnimalCard = (props) => {
//     const animal = props.animal;
//     const onSelectAnimal = props.onSelectAnimal;
//     // ... resto do código do componente
//   }
const AnimalCard = ({ animal, onSelectAnimal }) => {
  // --- A. EXTRAÇÃO E PREPARAÇÃO DOS DADOS DO ANIMAL QUE SERÃO EXIBIDOS ---
  // Usamos a função 'get' importada para buscar as informações específicas do objeto 'animal'
  // que este card precisa exibir. Se uma informação não for encontrada nos dados do animal,
  // 'get' retornará o valor padrão que especificamos.

  // Nome comum do animal, como "Jaguatirica". Usado como título principal do card.
  const nomeComum = get(animal, "nome_tazo", "Nome Indisponível");

  // Nome científico do animal, como "Leopardus pardalis". Exibido abaixo do nome comum.
  const nomeCientifico = get(
    animal,
    "nome_cientifico",
    "Nome Científico Indisponível"
  );

  // URL da imagem para a FRENTE do "tazo" (o lado que aparece inicialmente).
  const imagemFrontal = get(
    animal, // O objeto do animal.
    "imagens.front", // O "caminho" para a propriedade: animal.imagens.front
    "https://via.placeholder.com/200x250/cccccc/888888?text=Frente+Indisponível" // URL de uma imagem genérica de fallback.
  );

  // URL da imagem para o VERSO do "tazo" (o lado que aparece quando o card vira).
  const imagemVerso = get(
    animal,
    "imagens.back",
    "https://via.placeholder.com/200x250/aaaaaa/ffffff?text=Verso+Indisponível"
  );

  // Informações sobre o nível de extinção do animal.
  const categoriaExtincao = get(animal, "nivel_extincao.categoria", "N/A"); // Sigla, ex: "LC", "EN", "CR".
  const descricaoExtincao = get(
    animal,
    "nivel_extincao.descricao",
    "Status Não Avaliado"
  ); // Descrição textual, ex: "Pouco Preocupante".

  // Obtém a cor de fundo (em formato hexadecimal, ex: "#AED581") para a etiqueta do status de extinção.
  // Esta cor será aplicada usando um estilo inline no JSX.
  const corDeFundoParaStatus = getExtinctionHexColor(categoriaExtincao);

  // --- B. GERENCIAMENTO DO ESTADO INTERNO DO CARD (se está virado ou não) ---
  // "Estado" (state) em React refere-se a dados que um componente mantém e que podem mudar
  // ao longo do tempo, geralmente em resposta a interações do usuário ou outros eventos.
  // Quando o estado de um componente muda, o React automaticamente "re-renderiza"
  // (atualiza) esse componente na tela para refletir a nova informação.

  // Usamos o Hook 'useState' para criar uma variável de estado chamada 'estaVirado'.
  // - `estaVirado`: Esta variável booleana (true/false) vai "lembrar" se o card
  //                 está mostrando sua face do verso (true) ou da frente (false).
  // - `definirEstaVirado`: Esta é a FUNÇÃO especial que DEVEMOS usar para ATUALIZAR
  //                        o valor de 'estaVirado'. NUNCA modifique 'estaVirado'
  //                        diretamente (ex: `estaVirado = true;` NÃO FUNCIONA para o React).
  //                        Chamar `definirEstaVirado(novoValor)` informa ao React que o estado mudou
  //                        e que uma re-renderização pode ser necessária.
  // - `useState(false)`: O valor `false` passado para `useState` é o VALOR INICIAL
  //                      da variável de estado 'estaVirado'. Isso significa que, quando
  //                      o card é exibido pela primeira vez, ele estará mostrando a face frontal.
  const [estaVirado, definirEstaVirado] = useState(false);

  // --- C. FUNÇÕES PARA LIDAR COM INTERAÇÕES DO USUÁRIO (MANIPULADORES DE EVENTOS / EVENT HANDLERS) ---
  // Estas são funções que serão chamadas quando certos eventos ocorrerem no card
  // (como o mouse passando sobre ele, ou o card recebendo foco do teclado).

  // Função para VIRAR o card (mudar o estado 'estaVirado' para true).
  // Esta função será chamada quando o mouse ENTRAR na área do card ('onMouseEnter')
  // ou quando o card receber FOCO do teclado ('onFocus').
  const lidarComEntradaDoMouseOuFocoNoCard = () => {
    // console.log(`Mouse/Foco ENTROU em: ${nomeComum}`); // Para depuração
    definirEstaVirado(true); // Atualiza o estado para 'true', fazendo o card virar.
  };

  // Função para DESVIRAR o card (mudar o estado 'estaVirado' para false).
  // Esta função será chamada quando o mouse SAIR da área do card ('onMouseLeave')
  // ou quando o card PERDER o FOCO do teclado ('onBlur').
  const lidarComSaidaDoMouseOuPerdaDeFocoDoCard = () => {
    // console.log(`Mouse/Foco SAIU de: ${nomeComum}`); // Para depuração
    definirEstaVirado(false); // Atualiza o estado para 'false', fazendo o card voltar à frente.
  };

  // Função para lidar com o CLIQUE no card.
  // Esta função será chamada quando o usuário clicar no card inteiro ('onClick').
  // Seu propósito principal é informar ao componente pai (App.js) que este animal
  // foi selecionado, para que o App.js possa, por exemplo, mostrar a página de detalhes.
  const lidarComCliquePrincipalNoCard = () => {
    // Primeiro, verificamos se a função 'onSelectAnimal' foi realmente passada como prop pelo App.js.
    // É uma boa prática verificar se callbacks opcionais existem antes de chamá-los.
    if (onSelectAnimal) {
      // Se 'onSelectAnimal' existe, nós a chamamos, passando o ID único do animal.
      // Usamos 'get' para buscar 'id_animal' ou, como fallback, 'codigo'.
      const idUnicoDoAnimal = get(animal, "id_animal", get(animal, "codigo"));
      onSelectAnimal(idUnicoDoAnimal); // O App.js receberá este ID e saberá qual animal mostrar.
    } else {
      // Se, por algum motivo, 'onSelectAnimal' não foi fornecida, apenas registramos no console.
      console.warn(
        `AnimalCard: A função 'onSelectAnimal' não foi fornecida para o animal "${nomeComum}". O clique não terá efeito de navegação.`
      );
    }
  };

  // --- D. ESTRUTURA JSX: O QUE O COMPONENTE 'AnimalCard' VAI RENDERIZAR NA TELA ---
  // A instrução 'return' define a "aparência" do componente usando JSX.
  // JSX se parece muito com HTML, mas é na verdade JavaScript que será transformado
  // em chamadas `React.createElement(...)` pelo Babel (uma ferramenta de compilação).
  return (
    // Usamos a tag <article> do HTML5. Semanticamente, um "card" com informações
    // autocontidas sobre um item (como um animal) se encaixa bem na definição de <article>.
    <article
      // className: Em JSX, usamos 'className' em vez de 'class' (que é uma palavra reservada em JavaScript)
      //            para aplicar classes CSS. '{styles.animalCard}' pega a classe 'animalCard'
      //            do nosso arquivo CSS Module (AnimalCard.module.css) e a aplica aqui.
      //            O nome da classe no HTML final será algo como "AnimalCard_animalCard__123Abc".
      className={styles.animalCard}
      // Manipuladores de Eventos para interatividade:
      onClick={lidarComCliquePrincipalNoCard} // Quando o card é clicado com o mouse.
      onMouseEnter={lidarComEntradaDoMouseOuFocoNoCard} // Quando o cursor do mouse entra na área do card.
      onMouseLeave={lidarComSaidaDoMouseOuPerdaDeFocoDoCard} // Quando o cursor do mouse sai da área do card.
      onFocus={lidarComEntradaDoMouseOuFocoNoCard} // Quando o card recebe foco (ex: via navegação por Teclado com a tecla Tab).
      onBlur={lidarComSaidaDoMouseOuPerdaDeFocoDoCard} // Quando o card perde o foco.
      // Manipulador de Evento para acessibilidade via teclado:
      // Permite que usuários que navegam com o teclado "cliquem" no card
      // pressionando as teclas "Enter" ou "Espaço" quando o card está focado.
      onKeyDown={(eventoDoTeclado) => {
        // 'eventoDoTeclado' é um objeto com informações sobre o evento de teclado.
        // 'eventoDoTeclado.key' contém o nome da tecla pressionada (ex: "Enter", " ", "a", "Shift").
        if (eventoDoTeclado.key === "Enter" || eventoDoTeclado.key === " ") {
          // 'eventoDoTeclado.preventDefault();' impede o comportamento padrão do navegador
          // para estas teclas. Por exemplo, a tecla Espaço normalmente rola a página para baixo.
          // Queremos que ela apenas "clique" no card aqui.
          eventoDoTeclado.preventDefault();
          lidarComCliquePrincipalNoCard(); // Chama a mesma função do onClick.
        }
      }}
      // Atributos de Acessibilidade (a11y):
      tabIndex="0" // Torna o <article> "focável" via teclado (tecla Tab).
      // Elementos como <div> e <article> não são focáveis por padrão.
      // '0' significa que ele entra na ordem natural de tabulação da página.
      role="button" // Informa aos leitores de tela que este <article> se comporta como um botão,
      // já que ele tem uma ação de clique.
      aria-label={`Ver detalhes sobre o animal: ${nomeComum}`} // Fornece uma descrição textual concisa
      // do propósito do elemento para leitores de tela.
      aria-pressed={estaVirado} // Indica para leitores de tela se o card está no estado "virado" (pressionado).
      // Útil para botões de alternância (toggle buttons).
    >
      {/*
        Container Interno para o Efeito de Flip (o "Tazo" que vira):
        - Este <div> (com a classe 'styles.cardInterno') é o elemento que de fato vai girar.
        - Sua classe CSS é definida dinamicamente com base no estado 'estaVirado':
          - Sempre terá a classe base 'styles.cardInterno'.
          - Se 'estaVirado' for true, a classe 'styles.cardInternoVirado' também será adicionada.
            (Ex: className="AnimalCard_cardInterno__abc AnimalCard_cardInternoVirado__def")
          - Se 'estaVirado' for false, apenas 'styles.cardInterno' será aplicada.
          - A classe 'styles.cardInternoVirado' (definida no CSS) contém a transformação (`transform: rotateY(180deg);`)
            que faz o elemento girar.
        - 'aria-hidden="true"': Como o conteúdo visual do flip (as duas faces da imagem) é principalmente
          decorativo em relação à ação principal do card (que é o clique para ver detalhes),
          e as informações textuais importantes (nome, status) estão visíveis de qualquer forma,
          podemos marcar este container interno como "escondido" para tecnologias assistivas.
          Isso evita que leitores de tela tentem descrever a animação de flip de forma confusa.
      */}
      <div
        className={`${styles.cardInterno} ${
          estaVirado ? styles.cardInternoVirado : ""
        }`}
        aria-hidden="true"
      >
        {/* Face Frontal do Tazo: Contém a imagem da frente. */}
        <div className={`${styles.cardFace} ${styles.cardFrente}`}>
          <img
            src={imagemFrontal} // URL da imagem da frente.
            // O 'alt' text aqui pode ser vazio ('alt=""') porque a imagem é considerada decorativa
            // DENTRO do contexto do card como um todo, que já tem um 'aria-label' abrangente.
            // Se esta imagem fosse a ÚNICA forma de identificar o animal, o 'alt' precisaria ser descritivo.
            // Para tazos, a arte é parte da apresentação, mas a informação principal vem do texto.
            alt=""
            className={styles.cardImagem} // Classe para estilizar a imagem (ex: tamanho, object-fit).
            loading="lazy" // "Lazy loading": instrui o navegador a carregar esta imagem
            // apenas quando ela estiver perto de se tornar visível na tela.
            // Melhora o desempenho inicial da página, especialmente com muitas imagens.
            onError={(eventoDaImagem) => {
              // Esta função é chamada se ocorrer um erro ao carregar a imagem (ex: URL quebrada, imagem não encontrada).
              // 'eventoDaImagem.target' se refere à tag <img> que falhou ao carregar.
              // Trocamos o 'src' para uma imagem placeholder e atualizamos o 'alt' para indicar o erro.
              eventoDaImagem.target.src =
                "https://via.placeholder.com/200x250/EEEEEE/757575?text=Erro+Frente";
              eventoDaImagem.target.alt =
                "Erro ao carregar imagem frontal do tazo";
            }}
          />
        </div>

        {/* Face do Verso do Tazo: Contém a imagem do verso. */}
        <div className={`${styles.cardFace} ${styles.cardVerso}`}>
          <img
            src={imagemVerso}
            alt="" // Decorativo, como a imagem frontal.
            className={styles.cardImagem}
            loading="lazy"
            onError={(eventoDaImagem) => {
              eventoDaImagem.target.src =
                "https://via.placeholder.com/200x250/EEEEEE/757575?text=Erro+Verso";
              eventoDaImagem.target.alt =
                "Erro ao carregar imagem do verso do tazo";
            }}
          />
        </div>
      </div>{" "}
      {/* Fim do div .cardInterno (o tazo que vira) */}
      {/*
        Container do Conteúdo de Texto:
        Esta parte do card fica ABAIXO do tazo que vira e permanece sempre visível.
        Contém o nome do animal e seu status de extinção.
      */}
      <div className={styles.cardConteudo}>
        {/* Agrupador para os nomes (comum e científico).
            Útil se precisarmos aplicar algum estilo específico a este bloco de texto. */}
        <div>
          <h3 className={styles.animalNome}>{nomeComum}</h3>
          <p className={styles.nomeCientifico}>
            {/* A tag <em> (emphasis) é usada para dar ênfase ao texto,
                que geralmente é renderizada como itálico pelos navegadores.
                É semanticamente apropriada para nomes científicos. */}
            <em>{nomeCientifico}</em>
          </p>
        </div>

        {/*
          "Etiqueta" (Badge) para o Status de Extinção:
          - className: Aplica o estilo base para a etiqueta.
          - style: A propriedade 'style' em JSX aceita um objeto JavaScript.
                   As chaves do objeto são nomes de propriedades CSS em camelCase
                   (ex: 'backgroundColor' em vez de 'background-color').
                   Os valores são strings.
                   Aqui, estamos definindo a cor de fundo da etiqueta dinamicamente,
                   com base na 'corDeFundoParaStatus' que calculamos anteriormente.
                   Ex: style={{ backgroundColor: '#AED581' }}
        */}
        <div
          className={styles.statusExtincao}
          style={{ backgroundColor: corDeFundoParaStatus }}
        >
          {/* Exibe a sigla e a descrição do status. Ex: "LC - Pouco Preocupante" */}
          {categoriaExtincao} - {descricaoExtincao}
        </div>
      </div>{" "}
      {/* Fim do div .cardConteudo */}
    </article> // Fim do <article> do AnimalCard
  );
}; // Fim da definição do componente AnimalCard

// --- 3. EXPORTAÇÃO DO COMPONENTE ---
// 'export default AnimalCard;' torna o componente 'AnimalCard' disponível para
// ser importado e utilizado em outros arquivos/componentes da nossa aplicação
// (como no 'AnimalList.jsx' ou 'App.js').
// A palavra-chave 'default' significa que, quando outro arquivo importa deste (AnimalCard.jsx)
// sem usar chaves {}, ele receberá este componente AnimalCard como o item principal exportado.
// Exemplo de importação em outro arquivo:
//   import QualquerNomeQueEuQuiser from './AnimalCard';
//   <QualquerNomeQueEuQuiser animal={...} onSelectAnimal={...} />
export default AnimalCard;
