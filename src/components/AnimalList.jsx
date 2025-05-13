// Caminho: src/components/AnimalList.jsx

// =================================================================================================
// ARQUIVO: AnimalList.jsx
// PROPÓSITO: Este componente é o responsável por exibir uma coleção (lista) de cards de animais.
//            Ele recebe um array de objetos de animais do seu componente pai (App.js)
//            e, para cada animal nesse array, ele renderiza (mostra na tela) um
//            componente <AnimalCard />.
//
// CONCEITOS PRINCIPAIS DO REACT E JAVASCRIPT UTILIZADOS AQUI:
//  - Componentes Funcionais: A forma padrão de criar componentes em React.
//  - Props (Propriedades): Como o componente recebe dados e funções de seu pai.
//      - 'animals': Um array de objetos. Cada objeto contém as informações de um animal.
//      - 'onSelectAnimal': Uma função (callback) que é passada para cada AnimalCard.
//                         Quando um AnimalCard é clicado, essa função é chamada,
//                         permitindo que o App.js (o pai) saiba qual animal foi selecionado.
//  - Renderização de Listas com '.map()': O método de array '.map()' do JavaScript é usado
//                                       para transformar cada item de um array de dados
//                                       em um elemento React (um componente <AnimalCard />).
//  - A Prop Especial 'key': Uma prop obrigatória e única que o React exige ao renderizar
//                           listas de elementos. Ela ajuda o React a identificar
//                           eficientemente quais itens mudaram, foram adicionados ou removidos.
//  - Renderização Condicional: Verificar se a lista de animais está vazia antes de
//                              tentar renderizar os cards.
//  - Composição de Componentes: O AnimalList "compõe" sua interface usando múltiplos
//                               componentes AnimalCard.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E COMPONENTES ---

// Importamos a biblioteca 'React'. É a base para tudo em React,
// permitindo-nos definir componentes e usar JSX.
import React from "react";

// Importamos o componente 'AnimalCard'.
// O AnimalList vai criar uma instância de <AnimalCard /> para cada animal
// que ele precisar exibir. Isso é um exemplo de "composição" de componentes.
import AnimalCard from "./AnimalCard";

// Importamos o objeto 'styles' do nosso arquivo CSS Module (AnimalList.module.css).
// As classes definidas em 'AnimalList.module.css' (ex: .animalListContainer)
// serão usadas para aplicar estilos ao layout desta lista de cards.
// Ex: <section className={styles.animalListContainer}>
import styles from "./AnimalList.module.css";

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'AnimalList' ---

// O componente AnimalList é uma função que aceita um objeto de 'props' como argumento.
// Usamos a desestruturação de props ({ animals, onSelectAnimal }) para extrair
// diretamente as propriedades que esperamos receber do componente pai (App.js).
const AnimalList = ({ animals, onSelectAnimal }) => {
  // --- A. VERIFICAÇÃO INICIAL: HÁ ANIMAIS PARA EXIBIR? ---
  // Antes de tentarmos criar uma lista de cards, é uma boa prática verificar se
  // realmente temos animais para mostrar.

  // Condição:
  // - '!animals': Verifica se a prop 'animals' é 'undefined', 'null', 'false', 0, NaN ou uma string vazia.
  //               Se 'animals' não for passado, esta condição será verdadeira.
  // - 'animals.length === 0': Verifica se o array 'animals' está vazio.
  if (!animals || animals.length === 0) {
    // Se não houver animais, retornamos um parágrafo <p> com uma mensagem para o usuário.
    // Este 'return' interrompe a execução da função AnimalList aqui, e o JSX
    // da lista de cards (mais abaixo) não será processado nem renderizado.

    // Aplicamos alguns estilos inline simples para a mensagem.
    // Em um projeto maior, essa mensagem poderia ser um componente separado ou usar classes globais.
    // Estamos usando variáveis CSS globais (ex: --color-text-muted) que foram definidas em src/index.css.
    return (
      <p
        style={{
          textAlign: "center", // Centraliza o texto.
          color: "var(--color-text-muted)", // Cor cinza para texto secundário.
          fontSize: "1.25rem", // Tamanho da fonte um pouco maior.
          padding: "2.5rem 1rem", // Espaçamento interno (2.5rem em cima/baixo, 1rem nas laterais).
          marginTop: "1rem", // Um pouco de espaço acima.
        }}
      >
        Ops! Nenhum animalzinho encontrado com os filtros atuais. Que tal tentar
        uma nova busca? 🐾
      </p>
    );
  }

  // --- B. RENDERIZAÇÃO DA LISTA DE CARDS DE ANIMAIS ---
  // Se a verificação acima passou, significa que temos um array 'animals' com pelo menos um animal.
  // Agora, vamos construir a lista de <AnimalCard />.

  // Usamos a tag <section> do HTML5, que é semanticamente apropriada para agrupar
  // um conjunto de conteúdo relacionado (neste caso, a lista de cards de animais).
  // - id="animal-list": Um ID único para esta seção. Pode ser útil para links âncora internos na página
  //                     ou para seleção em testes automatizados, mas não é estritamente necessário para o React.
  // - className={styles.animalListContainer}: Aplica a classe CSS '.animalListContainer'
  //                                          definida em 'AnimalList.module.css'. Esta classe
  //                                          será responsável pelo layout em grade dos cards.
  return (
    <section id="animal-list" className={styles.animalListContainer}>
      {/*
        A Mágica do '.map()': Transformando Dados em Componentes React
        - 'animals.map(...)': O método '.map()' é uma das funções mais importantes para trabalhar
          com arrays em JavaScript e, por consequência, em React para renderizar listas.
          Ele NÃO modifica o array original 'animals'. Em vez disso, ele CRIA UM NOVO ARRAY.
        - Como funciona:
          1. Ele itera (passa por) cada item do array 'animals'.
          2. Para cada 'animalObject' encontrado no array, ele executa a função que passamos
             (a "arrow function" `(animalObject) => { ... }`).
          3. O valor RETORNADO por essa função para cada animal se torna um item no NOVO array.
          4. No nosso caso, a função retorna um componente <AnimalCard />.
             Então, o resultado de 'animals.map(...)' será um array de componentes <AnimalCard />.
             Ex: [<AnimalCard ... />, <AnimalCard ... />, <AnimalCard ... />]
        - O React então pega este array de componentes e os renderiza na tela.
      */}
      {animals.map((animalObject) => {
        // Para cada 'animalObject' na lista 'animals':

        // Verificação opcional (para robustez extra, embora App.js deva garantir IDs):
        // Se o animal não tiver um ID, podemos registrar um aviso ou pular este animal.
        const animalId = animalObject.id_animal || animalObject.codigo;
        if (!animalId) {
          console.warn(
            "AnimalList: Encontrado um animal sem 'id_animal' ou 'codigo'. Pulando renderização deste card:",
            animalObject
          );
          return null; // Retornar null faz com que o React não renderize nada para este item.
        }

        // Retornamos um componente <AnimalCard /> para este animal específico.
        return (
          <AnimalCard
            // A Prop 'key': EXTREMAMENTE IMPORTANTE para listas em React!
            // - Propósito: O React usa a 'key' para identificar unicamente cada elemento
            //              gerado dentro de uma lista (como os <AnimalCard /> aqui).
            //              Isso permite que o React seja muito eficiente ao atualizar a lista.
            //              Por exemplo, se um animal for adicionado, removido ou a lista for
            //              reordenada, o React usa as 'keys' para saber exatamente quais
            //              elementos mudaram, em vez de ter que recriar todos eles.
            // - Valor da 'key': Deve ser uma STRING ou NÚMERO que seja ÚNICO entre
            //                   os "irmãos" na lista (ou seja, único entre todos os AnimalCards
            //                   gerados por este .map()).
            // - MELHOR PRÁTICA: Use um ID estável e único que venha dos seus dados.
            //                  No nosso caso, 'animalObject.id_animal' ou 'animalObject.codigo' são boas escolhas.
            // - EVITE USAR O ÍNDICE DO ARRAY (ex: `key={index}`) como chave se a ordem dos
            //   itens na lista puder mudar, ou se itens puderem ser inseridos/removidos
            //   no meio da lista. Usar o índice nesses casos pode levar a bugs
            //   comportamento inesperado e problemas de performance.
            key={animalId} // Usamos o ID único do animal como chave.
            // Passando Props para o Componente AnimalCard:
            // Aqui, estamos passando duas props para cada <AnimalCard />:

            // 1. prop 'animal':
            //    Passamos o 'animalObject' completo (o objeto com todas as informações
            //    do animal atual da iteração do .map()) para o AnimalCard.
            //    Dentro do componente AnimalCard, ele poderá acessar este objeto
            //    através de 'props.animal'.
            animal={animalObject}
            // 2. prop 'onSelectAnimal':
            //    Repassamos a função 'onSelectAnimal' que o AnimalList recebeu do seu pai (App.js).
            //    Isso permite que cada AnimalCard individual, ao ser clicado, chame esta função.
            //    A função 'onSelectAnimal' no App.js saberá então qual animal foi clicado
            //    (porque o AnimalCard passará o ID do animal para ela).
            //    Este é um padrão comum em React para comunicação de filho para pai.
            onSelectAnimal={onSelectAnimal}
          />
        );
      })}{" "}
      {/* Fim da função .map() e do array de AnimalCards */}
    </section> // Fim da tag <section> que contém a lista
  );
}; // Fim da definição do componente AnimalList

// --- 3. EXPORTAÇÃO DO COMPONENTE ---
// 'export default AnimalList;' torna o componente AnimalList disponível para
// ser importado e utilizado em outros arquivos da aplicação, como no App.js.
export default AnimalList;
