// Caminho: src/components/AnimalDetail.jsx

// =================================================================================================
// ARQUIVO: AnimalDetail.jsx
// Olá, futuro(a) desenvolvedor(a) de interfaces incríveis com React! 🚀
// Este arquivo é o "coração" da página que mostra todos os DETALHES de UM animal específico
// do nosso ZooDex. Quando você clica em um card na lista principal, é esta página que aparece.
//
// O QUE ESTE COMPONENTE FAZ?
//  - Recebe informações sobre um animal (do App.js).
//  - Mostra o "tazo" do animal (a imagem redonda que vira!).
//  - Exibe o nome comum, nome científico e o status de conservação com cores e uma escala visual.
//  - Apresenta uma galeria de fotos adicionais do animal.
//  - Mostra um mapa interativo com a distribuição geográfica do animal.
//  - Lista informações detalhadas como classificação, habitat, ecologia, ameaças, curiosidades, etc.
//  - Permite que o usuário clique nas imagens (do tazo ou da galeria) para vê-las ampliadas
//    em um "lightbox" (um visualizador de imagem que cobre a tela).
//  - Tem um botão para voltar à lista principal de animais.
//
// NOVAS FUNCIONALIDADES E MELHORIAS RECENTES:
//  - INTERAÇÃO DO TAZO EM DISPOSITIVOS DE TOQUE (CELULARES/TABLETS):
//    - Antes, o tazo só virava quando o mouse passava por cima (hover).
//    - AGORA, em um celular ou tablet, um TOQUE (tap) no tazo fará ele VIRAR!
//    - E mais: o mesmo toque que vira o tazo também abrirá a face visível dele no lightbox
//      para o usuário ver a imagem ampliada.
//  - Comportamento de Hover em Desktops Mantido: Se você estiver usando um computador com mouse,
//    o tazo ainda vai virar quando você passar o mouse por cima. O clique do mouse também
//    terá o mesmo efeito do toque (virar + ampliar).
//
// CONCEITOS PRINCIPAIS DE REACT E JAVASCRIPT QUE VOCÊ VAI VER (E APRENDER!) AQUI:
//  - Componentes Funcionais: A forma moderna e mais comum de criar "blocos de construção"
//                           em React. Nosso `AnimalDetail` é um deles!
//  - Props (Propriedades): Pense nas props como "informações" ou "instruções" que um
//                          componente pai (como o App.js) passa para um componente filho
//                          (como este `AnimalDetail`). Aqui, recebemos o objeto `animal`
//                          (com todos os dados) e a função `onBack` (para voltar à lista).
//  - `useState` (Hook de Estado): Permite que nosso componente tenha sua própria "memória" interna.
//                               Usamos para "lembrar":
//                                 - Se o tazo no cabeçalho está virado (`tazoCabecalhoVirado`).
//                                 - Qual imagem está sendo mostrada no lightbox e se ele está aberto
//                                   (`lightboxInfo`).
//  - `useEffect` (Hook de Efeito Colateral): Para interagir com coisas "fora" do React,
//                                          como adicionar um "escutador de eventos" (event listener)
//                                          para a tecla "Escape" (para fechar o lightbox).
//                                          É importante "limpar" esses efeitos (remover os listeners)
//                                          quando o componente não for mais necessário.
//  - `useMemo` (Hook de Memoização): Uma ferramenta de otimização. Se temos um cálculo que pode
//                                  ser "pesado" e que não precisa ser refeito toda vez que o
//                                  componente renderiza, `useMemo` "memoriza" (guarda) o resultado
//                                  e só refaz o cálculo se as "dependências" (dados que o cálculo usa)
//                                  mudarem. Usamos para a lista de imagens da galeria.
//  - `useCallback` (Hook de Memoização para Funções): Similar ao `useMemo`, mas para FUNÇÕES.
//                                                  Ele "memoriza" a própria função, para que ela
//                                                  não seja recriada desnecessariamente a cada renderização.
//                                                  Útil para funções passadas como props ou usadas em `useEffect`.
//                                                  Usamos para os handlers de evento do lightbox e do tazo.
//  - JSX (JavaScript XML): A sintaxe especial que parece HTML, mas está dentro do JavaScript.
//                          É como descrevemos a "cara" do nosso componente.
//  - Renderização Condicional: Mostrar ou esconder partes da interface com base em certas
//                              condições (ex: `condicao && <MeuElemento />` ou `condicao ? <A /> : <B />`).
//                              Usamos para o lightbox, para o tazo/imagem principal, e nas seções de detalhes.
//  - Mapeamento de Arrays para Elementos (Listas): O famoso método `.map()`! Usamos para transformar
//                                                 arrays de dados (como a lista de curiosidades ou as
//                                                 imagens da galeria) em uma lista de elementos JSX (como `<li>` ou `<img>`).
//  - Manipulação de Eventos: Como o componente reage a ações do usuário (cliques, toques, mouse over,
//                            teclas pressionadas). Ex: `onClick`, `onMouseEnter`, `onKeyDown`.
//  - Acessibilidade (a11y): Tornar a página utilizável por todos, incluindo pessoas com deficiências,
//                           usando atributos como `aria-label`, `aria-pressed`, `role`, `tabIndex`.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS, COMPONENTES E FUNÇÕES ---
// Começamos trazendo as "ferramentas" e "peças" que vamos precisar.
import React, { useState, useEffect, useMemo, useCallback } from "react";
// - `React`: A biblioteca principal do React, essencial para tudo.
// - `useState`, `useEffect`, `useMemo`, `useCallback`: São "Hooks" do React.
//   Hooks são funções especiais que nos permitem "enganchar" funcionalidades do React
//   (como estado e ciclo de vida) em nossos componentes funcionais.

// Importamos nosso componente `MapComponent`, que criamos para mostrar o mapa.
import MapComponent from "./MapComponent";

// Importamos funções "utilitárias" (ajudantes) do nosso arquivo de dados `animalData.js`.
// - `get`: Uma função que nos ajuda a pegar valores de dentro de objetos de forma segura.
//          Se a propriedade não existir, ela pode retornar um valor padrão que especificamos,
//          evitando erros de "undefined".
// - `getExtinctionHexColor`: Uma função que retorna o código de cor hexadecimal (ex: "#FF0000")
//                           correspondente a um status de extinção (ex: "CR" para Criticamente em Perigo).
import { get, getExtinctionHexColor } from "../data/animalData";

// Importamos o objeto `styles` do nosso arquivo CSS Module (`AnimalDetail.module.css`).
// Isso nos dá acesso às classes CSS que definimos lá (ex: `styles.detailContainer`)
// de forma que elas só se apliquem a ESTE componente, evitando conflitos com outros.
import styles from "./AnimalDetail.module.css";

// --- 2. COMPONENTE AUXILIAR INTERNO: DetailSectionContent ---
// ALUNOS: Às vezes, dentro de um componente grande, temos pedacinhos de JSX que se repetem
// com pequenas variações. Para não repetir código (princípio DRY - Don't Repeat Yourself),
// podemos criar pequenos "componentes auxiliares" DENTRO do mesmo arquivo.
// Este `DetailSectionContent` é um exemplo. Ele padroniza como cada seção de informação
// (Habitat, Ecologia, etc.) é exibida, incluindo um título, um ícone opcional,
// e uma mensagem padrão se não houver conteúdo.
//
// Props que este componente espera receber:
//  - `title`: (String obrigatória) O título da seção (ex: "Habitat").
//  - `children`: (JSX obrigatório) O conteúdo principal da seção. Esta é uma prop especial do React!
//                Tudo que você colocar ENTRE as tags de abertura e fechamento
//                `<DetailSectionContent> ... AQUI DENTRO ... </DetailSectionContent>`
//                será passado automaticamente como `children`.
//  - `icon`: (String, opcional, valor padrão é "") Um emoji ou caractere para ser exibido antes do título.
//  - `condition`: (Boolean, opcional, valor padrão é `true`) Se esta condição for `false`,
//                 a seção não renderizará seu `children`, mostrando apenas a mensagem de
//                 "Informação não disponível". Útil se uma seção inteira depende de um dado existir.
const DetailSectionContent = ({
  title, // O título que vai aparecer na seção
  children, // O conteúdo principal que vai dentro da seção
  icon = "📄", // Um ícone emoji padrão (documento), se nenhum for passado
  condition = true, // Por padrão, a seção é mostrada se tiver conteúdo
}) => {
  // Vamos descobrir se o `children` (conteúdo) que recebemos é "vazio" ou não utilizável.
  let conteudoConsideradoVazio = false;
  if (
    children === null || // Se o children for explicitamente `null`
    children === undefined || // Ou se for `undefined`
    children === "N/A" || // Ou se for a string "N/A" (que usamos como padrão para dados ausentes)
    (Array.isArray(children) && children.length === 0) || // Ou se for um array sem nenhum item
    (typeof children === "object" && // Ou se for um objeto...
      !React.isValidElement(children) && // ...que NÃO seja um elemento React válido (como <p> ou outro componente)...
      children !== null && // ...e que não seja null (já coberto acima, mas para clareza)...
      Object.keys(children).length === 0) // ...e que NÃO tenha nenhuma propriedade própria (um objeto vazio como {}).
  ) {
    conteudoConsideradoVazio = true; // Se alguma dessas condições for verdade, o conteúdo é "vazio".
  }

  // Agora, decidimos o que mostrar:
  // Se a `condition` (prop opcional) for `false`, OU se o `conteudoConsideradoVazio` for `true`...
  if (!condition || conteudoConsideradoVazio) {
    // ...então, mostramos o título da seção e uma mensagem padrão.
    return (
      <div className={styles.detailSection}>
        {" "}
        {/* Container da seção com estilo */}
        <h2 className={styles.sectionTitle}>
          {" "}
          {/* Título da seção com estilo */}
          {icon /* Renderiza o ícone SOMENTE SE a prop `icon` foi fornecida E não é uma string vazia */ && (
            <span
              className={styles.icon} // Classe para estilizar o ícone
              role="img" // Diz aos leitores de tela que isso é uma imagem/emoji
              aria-label={title.toLowerCase()} // Descreve o ícone para leitores de tela (ex: "habitat")
            >
              {icon} {/* O caractere do ícone/emoji */}
            </span>
          )}
          {title} {/* O texto do título da seção */}
        </h2>
        {/* Mensagem padrão para quando não há conteúdo para mostrar nesta seção. */}
        <p className={styles.textMuted}>
          Informação não disponível para esta seção.
        </p>
      </div>
    );
  }

  // CASO CONTRÁRIO (ou seja, `condition` é `true` E o conteúdo NÃO é vazio)...
  // ...renderizamos a seção normalmente, com seu título e o conteúdo (`children`) que foi passado.
  return (
    <div className={styles.detailSection}>
      <h2 className={styles.sectionTitle}>
        {icon && (
          <span
            className={styles.icon}
            role="img"
            aria-label={title.toLowerCase()}
          >
            {icon}
          </span>
        )}
        {title}
      </h2>
      {children}{" "}
      {/* AQUI é onde o conteúdo principal da seção (passado como children) é renderizado! */}
    </div>
  );
};

// --- 3. MAPA PARA EXIBIÇÃO AMIGÁVEL DE NOMES DE IDIOMAS ---
// Este objeto JavaScript funciona como um pequeno "dicionário".
// Ele nos ajuda a traduzir os códigos de idioma (que vêm dos nossos dados, ex: "pt", "en")
// para nomes que as pessoas entendem melhor (ex: "Português (Brasil)", "Inglês (English)").
// Usaremos isso quando formos listar os "Nomes Comuns em outros idiomas" do animal.
const languageDisplayMap = {
  pt: "Português (Brasil)", // Poderíamos ser mais específicos com pt-BR, pt-PT, etc.
  en: "Inglês (English)",
  es: "Espanhol (Español)",
  fr: "Francês (Français)", // Exemplo, você pode adicionar mais conforme os idiomas nos seus dados
  de: "Alemão (Deutsch)", // Exemplo
  // ALUNOS: Se os seus dados de animais tiverem nomes comuns em outros idiomas
  // (ex: japonês "ja", italiano "it"), vocês adicionariam as "traduções" aqui!
};

// --- 4. DEFINIÇÃO DO COMPONENTE PRINCIPAL 'AnimalDetail' ---
// Chegamos ao nosso componente principal desta página!
// Ele recebe duas `props` (propriedades) importantes do seu componente "pai" (o App.js):
//  - `animal`: Um OBJETO JavaScript contendo TODOS os dados do animal que foi selecionado
//              na lista principal (nome, imagens, habitat, etc.).
//  - `onBack`: Uma FUNÇÃO. Quando o usuário clicar no botão "Voltar à Lista", esta função
//              (que foi definida lá no App.js) será chamada. Ela geralmente avisa o App.js
//              para "limpar" o animal selecionado, fazendo a lista de animais reaparecer.
const AnimalDetail = ({ animal, onBack }) => {
  // --- A. GERENCIAMENTO DE ESTADO INTERNO DO COMPONENTE (Memória do AnimalDetail) ---
  // `useState` é um Hook do React que nos permite adicionar "estado" (variáveis que o React
  // vai "lembrar" e que, quando mudam, fazem o componente re-renderizar) aos nossos
  // componentes funcionais.

  // Estado para controlar o LIGHTBOX (o visualizador de imagem ampliada que cobre a tela).
  // `lightboxInfo` é um objeto que guarda duas coisas:
  //   - `index`: O número (índice) da imagem que está atualmente sendo mostrada no lightbox.
  //              Começa com -1, que para nós significa "lightbox está fechado".
  //   - `images`: Um array (lista) contendo as URLs (endereços web) de TODAS as imagens
  //               que podem ser vistas no lightbox (geralmente, as imagens da galeria do animal).
  // `definirLightboxInfo` é a função que usamos para ATUALIZAR essas informações do lightbox.
  const [lightboxInfo, definirLightboxInfo] = useState({
    index: -1, // Lightbox começa fechado
    images: [], // Lista de imagens do lightbox começa vazia
  });

  // Estado para controlar se o "tazo" (o card redondo com a imagem do animal que vira)
  // que aparece no cabeçalho desta página de detalhes está MOSTRANDO O VERSO ou A FRENTE.
  // `tazoCabecalhoVirado` será `true` se o tazo estiver mostrando o verso, e `false` se estiver
  // mostrando a frente.
  // Começa como `false` (mostrando a frente do tazo por padrão).
  // `definirTazoCabecalhoVirado` é a função para mudar esse estado (virar o tazo).
  const [tazoCabecalhoVirado, definirTazoCabecalhoVirado] = useState(false);

  // --- B. MEMORIZAÇÃO DO CÁLCULO DAS IMAGENS DA GALERIA (`useMemo`) ---
  // ALUNOS: `useMemo` é um Hook de OTIMIZAÇÃO!
  // A função que passamos para `useMemo` (a primeira parte, antes da vírgula)
  // pode ser um cálculo "caro" ou demorado. `useMemo` "memoriza" (guarda na memória)
  // o RESULTADO desse cálculo.
  // A função só é RE-EXECUTADA (o cálculo só é refeito) se alguma das "dependências"
  // (as coisas listadas no array `[animal]` no final) mudar.
  //
  // NO NOSSO CASO: Estamos montando a lista de URLs para as imagens da galeria.
  // Esse processo envolve pegar dados do objeto `animal`, verificar se são válidos,
  // garantir que não haja URLs duplicadas, etc.
  // Este cálculo só precisa ser feito novamente se o `animal` (a prop que recebemos) MUDAR
  // (ou seja, se estivermos mostrando detalhes de um animal diferente).
  // Se o componente `AnimalDetail` re-renderizar por outros motivos (ex: o usuário
  // virou o tazo, o que muda o estado `tazoCabecalhoVirado`), `imagensDaGaleria` NÃO será
  // recalculado desnecessariamente. O React usará o valor que `useMemo` guardou.
  // Isso pode deixar nossa aplicação um pouquinho mais rápida!
  const imagensDaGaleria = useMemo(() => {
    // Para depuração, você pode adicionar um console.log aqui para ver QUANDO este cálculo é refeito:
    // console.log("useMemo: Calculando 'imagensDaGaleria' para o animal:", animal?.nome_tazo);

    // Se, por algum motivo, não recebermos dados do `animal` ou se o `animal` não tiver
    // a propriedade `imagens`, retornamos uma lista vazia para evitar erros.
    if (!animal || !animal.imagens) {
      return [];
    }

    // Usamos um `Set` para garantir que cada URL de imagem seja ÚNICA na galeria.
    // `Set` é uma estrutura de dados em JavaScript que só permite valores únicos.
    // Isso evita que a mesma imagem apareça duas vezes na galeria se, por acaso,
    // ela estiver duplicada nos dados do animal.
    const urlsUnicas = new Set();
    const imagensOrdenadasParaGaleria = []; // Este será nosso array final de URLs.

    // Criamos uma pequena função "ajudante" (helper function) aqui dentro.
    // Ela vai adicionar uma URL de imagem à nossa lista, mas SÓ SE a URL for válida
    // (não nula, uma string, não vazia) e se ainda não tiver sido adicionada.
    const adicionarImagemSeValida = (url) => {
      if (
        url && // A URL existe (não é null, undefined, etc.)?
        typeof url === "string" && // É do tipo string?
        url.trim() !== "" && // Não é uma string vazia (após remover espaços em branco das pontas)?
        !urlsUnicas.has(url) // Já NÃO está no nosso `Set` de URLs únicas?
      ) {
        urlsUnicas.add(url); // Se passou em todos os testes, adiciona ao `Set` para marcar como já vista.
        imagensOrdenadasParaGaleria.push(url); // E adiciona ao nosso array final.
      }
    };

    // Agora, tentamos adicionar as imagens que esperamos encontrar nos dados do animal.
    // Usamos nossa função `get` (importada de `animalData.js`) para buscar essas URLs
    // de forma segura dentro do objeto `animal.imagens`.
    // Se `animal.imagens.foto_1` não existir, `get` retornará uma string vazia `""`
    // (o terceiro argumento de `get`), e nossa função `adicionarImagemSeValida` não a adicionará.
    adicionarImagemSeValida(get(animal, "imagens.foto_1", ""));
    adicionarImagemSeValida(get(animal, "imagens.foto_2", ""));

    // ALUNOS: Se a estrutura dos seus dados de animais (`animalData.js`) tivesse
    // mais campos para imagens da galeria (ex: `foto_3`, `foto_ambiente`, etc.),
    // vocês adicionariam mais chamadas a `adicionarImagemSeValida` aqui!
    // Exemplo:
    // adicionarImagemSeValida(get(animal, "imagens.foto_adicional_1", ""));
    // adicionarImagemSeValida(get(animal, "imagens.mapa_distribuicao_img", "")); // Se o mapa também fosse uma imagem

    return imagensOrdenadasParaGaleria; // Retorna o array final com as URLs das imagens da galeria.
  }, [animal]); // Array de dependências do `useMemo`:
  // Esta função de cálculo SÓ SERÁ RE-EXECUTADA se o valor da prop `animal` mudar.

  // --- C. FUNÇÕES PARA CONTROLAR O LIGHTBOX (VISUALIZADOR DE IMAGENS AMPLIADAS) ---
  // Envolvemos estas funções com `useCallback` para otimização, pois elas são
  // chamadas por eventos de clique e uma delas (`fecharLightbox`) é usada no `useEffect`
  // da tecla Escape. `useCallback` retorna uma versão "memoizada" da função, que só é
  // recriada se suas dependências mudarem.

  // Função para ABRIR o lightbox.
  // É chamada quando o usuário clica em uma imagem da galeria OU no tazo do cabeçalho.
  // `urlDaImagemClicada`: A URL da imagem que o usuário realmente clicou.
  const abrirImagemNoLightbox = useCallback(
    (urlDaImagemClicada) => {
      // Primeiro, tentamos encontrar o índice (a posição) da imagem clicada dentro da
      // nossa lista de imagens da galeria (`imagensDaGaleria`).
      // `findIndex` retorna o índice do primeiro elemento que satisfaz a condição, ou -1 se não encontrar.
      const indiceDaImagemNaGaleria = imagensDaGaleria.findIndex(
        (url) => url === urlDaImagemClicada
      );

      if (indiceDaImagemNaGaleria !== -1) {
        // Se a imagem clicada FAZ PARTE da galeria (`indiceDaImagemNaGaleria` não é -1)...
        // ...configuramos o lightbox para começar mostrando essa imagem
        // e disponibilizamos TODAS as imagens da galeria para navegação (próxima/anterior).
        definirLightboxInfo({
          index: indiceDaImagemNaGaleria, // O índice da imagem clicada.
          images: imagensDaGaleria, // O array completo de imagens da galeria.
        });
      } else if (
        urlDaImagemClicada &&
        typeof urlDaImagemClicada === "string" &&
        urlDaImagemClicada.trim() !== ""
      ) {
        // Se a imagem clicada NÃO está na galeria (ex: pode ser uma das imagens do tazo
        // do cabeçalho que não necessariamente repetimos na galeria)...
        // ...abrimos o lightbox mostrando APENAS essa imagem específica.
        // Nesse caso, a navegação (botões próxima/anterior) não fará sentido
        // (ou não estará disponível, dependendo de como implementarmos o lightbox no JSX).
        definirLightboxInfo({
          index: 0, // Como só temos uma imagem, o índice dela é 0.
          images: [urlDaImagemClicada], // O array de imagens do lightbox contém APENAS a imagem clicada.
        });
      }
      // Se `urlDaImagemClicada` for inválida (nula, vazia, etc.), não fazemos nada e o lightbox não abre.
    },
    [imagensDaGaleria]
  ); // Dependência: `imagensDaGaleria`. Se esta lista mudar, a função `abrirImagemNoLightbox`
  // será recriada para usar a nova lista.

  // Função para FECHAR o lightbox.
  // É chamada quando o usuário clica no "backdrop" (fundo escuro) do lightbox,
  // no botão de fechar (X), ou (como veremos no `useEffect`) pressiona a tecla 'Escape'.
  const fecharLightbox = useCallback(() => {
    // Para fechar, simplesmente resetamos o estado `lightboxInfo` para seus valores iniciais:
    // `index: -1` (que para nós significa "fechado") e `images: []` (lista de imagens vazia).
    definirLightboxInfo({ index: -1, images: [] });
  }, []); // Sem dependências, pois esta função não usa nada de fora que possa mudar.

  // Função para navegar para a PRÓXIMA imagem no lightbox.
  // O argumento `e` é o objeto do evento de clique (precisamos dele para `e.stopPropagation()`).
  const proximaImagemLightbox = useCallback((e) => {
    // `e.stopPropagation()` é importante aqui!
    // Se não o usarmos, o clique neste botão "Próxima" poderia "borbulhar" (propagar)
    // para o elemento pai (`.lightboxBackdrop`), que tem um `onClick` para FECHAR o lightbox.
    // Não queremos que clicar em "Próxima" feche o lightbox!
    e.stopPropagation();

    // Para atualizar o estado `lightboxInfo`, usamos a forma funcional de `definirLightboxInfo`.
    // `estadoAnterior` nos dá acesso ao valor ATUAL de `lightboxInfo` antes desta atualização.
    // Isso é mais seguro do que usar `lightboxInfo.index` diretamente aqui, especialmente
    // se houver múltiplas atualizações de estado "na fila".
    definirLightboxInfo((estadoAnterior) => ({
      ...estadoAnterior, // Primeiro, copiamos todas as outras propriedades do estado anterior (como o array `images`).
      // Agora, calculamos o novo `index` para a próxima imagem:
      // `(estadoAnterior.index + 1)` pega o próximo índice.
      // `% estadoAnterior.images.length` (operador "módulo" ou "resto da divisão")
      // faz com que, se chegarmos ao final da lista de imagens (ex: índice 4 em uma lista de 5 imagens,
      // onde o último índice é 4), o próximo índice (4+1=5) ao ser dividido pelo tamanho (5)
      // dê resto 0. Isso faz o índice "voltar" para o começo da lista (índICE 0),
      // criando um efeito de carrossel/loop.
      index: (estadoAnterior.index + 1) % estadoAnterior.images.length,
    }));
  }, []); // Sem dependências, pois só usa o estado anterior.

  // Função para navegar para a imagem ANTERIOR no lightbox.
  const imagemAnteriorLightbox = useCallback((e) => {
    e.stopPropagation(); // Impede que o clique no botão "Anterior" feche o lightbox.
    definirLightboxInfo((estadoAnterior) => ({
      ...estadoAnterior,
      // Calcula o índice anterior com efeito de carrossel:
      // `(estadoAnterior.index - 1 + estadoAnterior.images.length)`:
      //   Se `index` é 0, `0 - 1` é `-1`. Somar `images.length` (ex: 5) resulta em `4`.
      //   Então, `4 % 5` dá `4`, que é o último índice da lista.
      // Se `index` é 3, `3 - 1` é `2`. `2 + 5` é `7`. `7 % 5` dá `2`.
      index:
        (estadoAnterior.index - 1 + estadoAnterior.images.length) %
        estadoAnterior.images.length,
    }));
  }, []); // Sem dependências.

  // --- D. EFEITO COLATERAL (`useEffect`) PARA OUVIR A TECLA 'ESCAPE' E FECHAR O LIGHTBOX ---
  // ALUNOS: `useEffect` é para quando precisamos interagir com coisas FORA do React,
  // como o navegador (adicionar/remover event listeners), fazer chamadas de API, etc.
  // Este `useEffect` específico vai adicionar um "escutador de eventos" (event listener)
  // ao DOCUMENTO INTEIRO. Ele vai "ouvir" por qualquer tecla pressionada.
  // Se a tecla for "Escape", ele fecha o lightbox.
  useEffect(() => {
    // Esta é a função que será chamada TODA VEZ que uma tecla for pressionada no documento.
    const lidarComTeclaEsc = (evento) => {
      // `evento.key` nos diz qual tecla foi pressionada.
      if (evento.key === "Escape") {
        fecharLightbox(); // Se for "Escape", chamamos nossa função para fechar o lightbox.
      }
    };

    // SÓ queremos "escutar" pela tecla Escape SE o lightbox estiver ABERTO.
    // Verificamos isso checando se `lightboxInfo.index` é diferente de -1 (nosso sinal de fechado).
    if (lightboxInfo.index !== -1) {
      // Se o lightbox está aberto, ADICIONAMOS o event listener ao `document`.
      // Ele vai escutar pelo evento `keydown` (tecla pressionada).
      document.addEventListener("keydown", lidarComTeclaEsc);
      // Para depuração, você pode ver no console quando o listener é adicionado:
      // console.log("useEffect: Event listener para 'Esc' ADICIONADO.");
    }

    // A FUNÇÃO DE LIMPEZA (Cleanup Function)! ESSA PARTE É SUPER IMPORTANTE!
    // O `useEffect` pode retornar uma função. Essa função (chamada de "cleanup")
    // será executada pelo React:
    //  1. ANTES que o efeito seja executado novamente (se uma de suas dependências mudar).
    //  2. QUANDO o componente `AnimalDetail` for "desmontado" (removido da tela).
    // AQUI, nossa limpeza REMOVE o event listener que adicionamos.
    // POR QUÊ? Se não removermos, podemos ter "vazamentos de memória" (memory leaks)
    // ou o listener pode ser adicionado várias vezes, causando comportamentos estranhos.
    // É como arrumar a bagunça depois da festa!
    return () => {
      document.removeEventListener("keydown", lidarComTeclaEsc);
      // console.log("useEffect: Event listener para 'Esc' REMOVIDO.");
    };

    // Array de dependências do `useEffect`: `[lightboxInfo.index, fecharLightbox]`
    // O React vai re-executar este efeito (ou seja, a lógica de adicionar/remover o listener)
    // SOMENTE se o valor de `lightboxInfo.index` OU a função `fecharLightbox` mudar.
    // - `lightboxInfo.index`: Garante que o listener só seja adicionado/removido quando o lightbox abre/fecha.
    // - `fecharLightbox`: Como `fecharLightbox` é memoizada com `useCallback` e não tem dependências,
    //   ela não mudará. Mas é uma boa prática incluir funções chamadas dentro do efeito
    //   no array de dependências, especialmente se elas pudessem mudar.
  }, [lightboxInfo.index, fecharLightbox]); // Adicionamos fecharLightbox como dependência.

  // --- E. VERIFICAÇÃO DE DADOS DO ANIMAL (GUARDA DE SEGURANÇA) ---
  // Se, por algum motivo MUITO estranho, o componente `AnimalDetail` for renderizado
  // mas a prop `animal` (que deveria conter os dados do animal) for `null` ou `undefined`,
  // não podemos continuar, pois daria erro ao tentar acessar `animal.nome_tazo`, etc.
  // Então, exibimos uma mensagem de erro e paramos a renderização do restante.
  if (!animal) {
    // Idealmente, o componente `App.js` (que é o pai) já deveria garantir que `animal`
    // sempre tenha dados válidos antes de decidir renderizar o `AnimalDetail`.
    // Mas ter essa verificação aqui é uma "prática defensiva" – uma segurança extra.
    return (
      <p className="error-message">
        Erro crítico: Dados do animal não foram fornecidos para a página de
        detalhes.
      </p>
    );
  }

  // --- F. EXTRAÇÃO DE DADOS DO ANIMAL PARA USO MAIS FÁCIL NO JSX ---
  // Agora que sabemos que temos o objeto `animal`, vamos pegar as informações específicas
  // que queremos mostrar na página. Guardamos em variáveis com nomes mais curtos e claros.
  // Usar nossa função `get(objeto, 'caminho.da.propriedade', valorPadrao)` torna o código
  // mais robusto, pois se uma propriedade não existir, ela retorna o `valorPadrao`
  // em vez de dar um erro de "cannot read property of undefined".

  // Informações sobre o Nível de Extinção:
  const objetoNivelExtincao = get(animal, "nivel_extincao", {}); // Pega o objeto inteiro para evitar múltiplas chamadas `get` no mesmo nível.
  const categoriaExtincao = get(objetoNivelExtincao, "categoria", "N/A"); // Ex: "LC", "EN", "CR"
  const descricaoExtincao = get(
    objetoNivelExtincao,
    "descricao",
    "Não Avaliado"
  ); // Ex: "Pouco Preocupante"
  const corDoStatusHex = getExtinctionHexColor(categoriaExtincao); // Pega a cor hexadecimal (ex: "#aed581")
  // Garante que `escalaExtincao` seja sempre um array. Se `get` retornar "N/A" ou algo que não seja array, usa `[]`.
  const escalaExtincao = Array.isArray(get(objetoNivelExtincao, "escala", []))
    ? get(objetoNivelExtincao, "escala", [])
    : [];

  // URLs das imagens do Tazo para o cabeçalho da página de detalhes.
  // Se a imagem não existir, `get` retorna uma string vazia `""`, o que facilita
  // verificar depois no JSX se devemos ou não tentar renderizar a imagem.
  const tazoFrontUrl = get(animal, "imagens.front", "");
  const tazoBackUrl = get(animal, "imagens.back", "");

  // Nomes principais do animal (para o título da página).
  const nomeComumPrincipal = get(animal, "nome_tazo", "Nome Indisponível");
  const nomeCientificoPrincipal = get(
    animal,
    "nome_cientifico",
    "Nome Científico Indisponível"
  );

  // Prepara a lista de Nomes Comuns em outros idiomas para exibição.
  const nomesComunsEmOutrosIdiomasRaw = get(animal, "nome_comum", {}); // Esperamos um objeto como {pt: "...", en: "..."}
  const nomesComunsParaExibicao = {}; // Vamos criar um novo objeto para armazenar os nomes formatados.

  // Verifica se `nomesComunsEmOutrosIdiomasRaw` é realmente um objeto e não nulo.
  if (
    typeof nomesComunsEmOutrosIdiomasRaw === "object" &&
    nomesComunsEmOutrosIdiomasRaw !== null
  ) {
    // Itera sobre as chaves (que são os códigos de idioma, como "pt", "en") do objeto.
    for (const codigoIdioma in nomesComunsEmOutrosIdiomasRaw) {
      // `hasOwnProperty` é uma verificação de segurança. Garante que estamos olhando apenas para
      // propriedades que pertencem DIRETAMENTE ao objeto `nomesComunsEmOutrosIdiomasRaw`,
      // e não para propriedades que ele possa ter "herdado" de seu "protótipo"
      // (um conceito mais avançado de JavaScript, mas é uma boa prática usar).
      if (nomesComunsEmOutrosIdiomasRaw.hasOwnProperty(codigoIdioma)) {
        const nomeNesteIdioma = nomesComunsEmOutrosIdiomasRaw[codigoIdioma]; // Pega o nome no idioma atual.
        // Só adicionamos à nossa lista de exibição se o nome for válido (existir) e não for a string "N/A".
        if (nomeNesteIdioma && nomeNesteIdioma !== "N/A") {
          // Usa nosso `languageDisplayMap` para obter um nome de idioma amigável (ex: "Português (Brasil)").
          // Se o código do idioma (ex: "ja" para japonês) não estiver no nosso mapa,
          // usamos o próprio código em letras maiúsculas como um "fallback" (plano B).
          const nomeAmigavelDoIdioma =
            languageDisplayMap[codigoIdioma] || codigoIdioma.toUpperCase();

          // Às vezes, o nome para um idioma pode ser uma lista (array) de nomes.
          // Se for um array, juntamos os nomes com uma vírgula e espaço (ex: "Lobo, Lobo Cinzento").
          // Senão, usamos o nome como está (se for uma string simples).
          nomesComunsParaExibicao[nomeAmigavelDoIdioma] = Array.isArray(
            nomeNesteIdioma
          )
            ? nomeNesteIdioma.join(", ")
            : nomeNesteIdioma;
        }
      }
    }
  }

  // Função auxiliar interna (helper function) para renderizar listas simples de itens (array de strings).
  // Usaremos para seções como "Ameaças", "Curiosidades".
  // `items`: o array de strings que queremos listar.
  // `iconeDoItem`: um emoji ou string para colocar antes de cada item da lista (opcional).
  // Envolvemos com `useCallback` pois, embora não seja estritamente necessário aqui (já que
  // não é passada como prop nem usada em `useEffect` diretamente), é um bom hábito para funções
  // que retornam JSX e podem ser chamadas múltiplas vezes. Se ela fizesse cálculos mais
  // complexos baseados em props/estado, `useCallback` seria mais benéfico.
  const renderizarListaDeItensSimples = useCallback(
    (items, iconeDoItem = "🔹") => {
      // Se `items` não for um array, ou se o array estiver vazio,
      // ou se o único item do array for "N/A" ou uma string vazia...
      // ...consideramos que não há dados válidos para listar. Retornamos `null`.
      // Quando `null` é retornado, o componente `DetailSectionContent` (que chama esta função)
      // saberá que deve mostrar a mensagem padrão "Informação não disponível".
      if (
        !Array.isArray(items) ||
        items.length === 0 ||
        (items.length === 1 && (!items[0] || items[0] === "N/A"))
      ) {
        return null;
      }
      // Se houver itens válidos, usamos o método `.map()` dos arrays.
      // `.map()` passa por CADA item do array `items` e executa uma função para cada um.
      // Essa função deve retornar um elemento JSX (no nosso caso, um `<li>`).
      // O resultado final de `.map()` é um NOVO array contendo todos esses elementos JSX.
      return (
        <ul className={styles.list}>
          {" "}
          {/* Uma lista não ordenada `<ul>` com estilo. */}
          {items.map((item, index) => (
            // `key={index}`: IMPORTANTE! Quando o React renderiza uma lista de elementos,
            // ele precisa de uma "chave" (`key`) única para cada item, para poder identificar
            // e atualizar os itens de forma eficiente se a lista mudar.
            // Usar o `index` do array como chave SÓ é seguro se a ORDEM dos itens na lista
            // NUNCA mudar e se itens não forem ADICIONADOS ou REMOVIDOS do MEIO da lista.
            // Se os itens tivessem um ID único vindo dos dados, seria MELHOR usar esse ID.
            // Ex: `key={item.id}`. Para listas simples e estáticas, `index` pode ser aceitável.
            <li key={index} className={styles.listItem}>
              {" "}
              {/* Cada item da lista com estilo. */}
              {iconeDoItem && ( // Se um `iconeDoItem` foi fornecido...
                // ...renderiza o ícone dentro de um `<span>` para estilo e acessibilidade.
                <span className={styles.icon} role="img" aria-hidden="true">
                  {iconeDoItem}
                </span>
              )}
              {item} {/* O texto do item da lista. */}
            </li>
          ))}
        </ul>
      );
    },
    []
  ); // Sem dependências, pois a função não usa nada do escopo do componente que muda.

  // Função auxiliar interna para renderizar "listas de definição" (objetos chave-valor).
  // Usaremos para seções como "Classificação Taxonômica", "Ecologia", "Outros Nomes Comuns".
  // `dataObject`: o objeto JavaScript cujas propriedades (chaves e valores) queremos listar.
  const renderizarListaDeDefinicaoDetalhada = useCallback((dataObject) => {
    // Se `dataObject` não for um objeto válido ou se estiver vazio...
    if (
      !dataObject ||
      typeof dataObject !== "object" ||
      Object.keys(dataObject).length === 0
    ) {
      return null; // ...retornamos `null`, e `DetailSectionContent` mostrará a mensagem padrão.
    }
    // `Object.entries(dataObject)` transforma um objeto como `{ chave1: valor1, chave2: valor2 }`
    // em um array de arrays, onde cada subarray é um par `[chave, valor]`.
    // Ex: `[ ['chave1', valor1], ['chave2', valor2] ]`.
    // Depois, usamos `.filter()` para manter apenas as entradas (pares chave-valor)
    // onde o `valorDaPropriedade` é "significativo" (existe e não é a string "N/A").
    const entradasValidasDoObjeto = Object.entries(dataObject).filter(
      ([chaveDaPropriedade, valorDaPropriedade]) =>
        valorDaPropriedade && valorDaPropriedade !== "N/A"
    );

    // Se não sobrar nenhuma entrada válida após o filtro, não há o que mostrar.
    if (entradasValidasDoObjeto.length === 0) {
      return null;
    }

    // Usamos a tag HTML `<dl>` (definition list - lista de definição) para semântica.
    // Ela é ideal para listar pares de termos e suas definições.
    // Embora usemos `div`s para cada par para aplicar o estilo `.listItem`,
    // a estrutura `<dl>` -> `<dt>`(termo) `<dd>`(descrição) é semanticamente correta.
    return (
      <dl className={styles.list}>
        {" "}
        {/* Reutilizamos a classe .list para o espaçamento entre os itens. */}
        {entradasValidasDoObjeto.map(([chave, valor]) => (
          // Cada par chave-valor é envolvido em uma `<div>` com a classe `.listItem` para estilo.
          // Usamos a `chave` como `key` aqui, assumindo que as chaves são únicas dentro do objeto.
          <div key={chave} className={styles.listItem}>
            {/* `<dt>` (definition term) é usado para a "chave" ou nome da propriedade. */}
            <dt className={styles.definitionListDt}>
              {/* Formatamos a chave para ficar mais bonita:
                  - `replace(/_/g, " ")`: Troca todos os underscores `_` por espaços.
                  - `replace(/\b\w/g, letra => letra.toUpperCase())`: Capitaliza a primeira letra
                                                                    de cada palavra. */}
              {chave
                .replace(/_/g, " ")
                .replace(/\b\w/g, (letra) => letra.toUpperCase())}
              :
            </dt>
            {/* `<dd>` (definition description) é usado para o "valor" da propriedade. */}
            {/* Convertemos o `valor` para `String()` para garantir que ele possa ser renderizado,
                mesmo que seja um número ou booleano. */}
            <dd className={styles.definitionListDd}>{String(valor)}</dd>
          </div>
        ))}
      </dl>
    );
  }, []); // Sem dependências.

  // --- G. NOVA FUNÇÃO HANDLER PARA O CLIQUE/TOQUE NO TAZO ---
  // ALUNOS: Esta é a função que faz a mágica acontecer quando o usuário
  // CLICA (com mouse) ou TOCA (em celular/tablet) no tazo!
  // Ela vai fazer DUAS coisas:
  //  1. VIRAR o tazo (mostrar a outra face).
  //  2. ABRIR a imagem que ficou visível no tazo (seja frente ou verso) no LIGHTBOX.
  // Envolvemos com `useCallback` para otimização.
  // Suas dependências são `tazoCabecalhoVirado` (porque a lógica de qual imagem abrir
  // depende se o tazo estava virado ANTES do clique), `tazoFrontUrl`, `tazoBackUrl`
  // (as URLs das imagens), e `abrirImagemNoLightbox` (a função que chamamos).
  const lidarComInteracaoNoTazo = useCallback((evento) => {
    // `evento.stopPropagation()`: Como antes, impede que o clique/toque "vaze"
    // para elementos pais e acione outros handlers acidentalmente.
    // Essencial para garantir que só o tazo reaja a esta interação específica.
    if (evento) evento.stopPropagation();

    // AÇÃO ÚNICA: VIRAR O TAZO (Alternar o estado `tazoCabecalhoVirado`)
    // Usamos a forma funcional de `definirTazoCabecalhoVirado` (passando uma função
    // que recebe o estado anterior).
    // `estadoAnteriorVirado` representa o valor ATUAL de `tazoCabecalhoVirado` ANTES desta atualização.
    // `!estadoAnteriorVirado` simplesmente INVERTE esse valor (se era `true` vira `false`, se era `false` vira `true`).
    // Esta é a maneira mais segura e recomendada de atualizar um estado que depende do seu valor anterior.
    definirTazoCabecalhoVirado((estadoAnteriorVirado) => !estadoAnteriorVirado);

    // REMOVEMOS A PARTE QUE ABRIA O LIGHTBOX!
    // A lógica anterior que calculava `imagemQueSeraVisivelAposFlip` e chamava
    // `abrirImagemNoLightbox()` foi removida daqui.

    // E é só isso! Agora, clicar/tocar no tazo só faz ele virar. Simples e direto!
  }, []);

  // --- H. RENDERIZAÇÃO FINAL DO COMPONENTE AnimalDetail (O QUE APARECE NA TELA!) ---
  return (
    // Usamos um "Fragmento React" (`<>...</>`) aqui.
    // Um Fragmento nos permite agrupar múltiplos elementos JSX (como o `<article>` e o lightbox)
    // SEM adicionar um nó `<div>` extra desnecessário ao DOM (a estrutura HTML da página).
    // Todo componente React precisa retornar UM ÚNICO elemento raiz. O Fragmento serve para isso.
    <>
      {/* O container principal da página de detalhes do animal.
          Usamos a tag semântica `<article>` porque esta página representa um conteúdo
          autocontido e distribuível (os detalhes de um animal). */}
      <article className={styles.detailContainer}>
        {/* Botão para Voltar à Lista */}
        <button
          onClick={onBack}
          className={styles.backButton}
          aria-label="Voltar para a lista de animais"
        >
          ⬅️ Voltar à Lista
        </button>
        {/* Cabeçalho da Página de Detalhes (contém tazo, nome, status) */}
        <header
          className={styles.detailHeader}
          // Estilo Inline Dinâmico:
          // A cor da borda inferior deste header muda de acordo com o status de extinção do animal!
          // Passamos um objeto JavaScript para a prop `style`.
          // As chaves do objeto são nomes de propriedades CSS em camelCase (ex: `borderBottomColor`).
          style={{
            borderBottomColor: corDoStatusHex, // `corDoStatusHex` foi calculada antes.
            borderBottomWidth: "5px",
            borderBottomStyle: "solid",
          }}
        >
          {/* Lógica para exibir o Tazo Interativo OU uma Imagem de Fallback */}
          {tazoFrontUrl || tazoBackUrl ? ( // Se existir URL para a frente OU para o verso do tazo...
            // ...então renderizamos o container do Tazo Interativo.
            <div
              className={styles.headerTazoContainer} // Estilo base do container do tazo.
              // --- EVENTOS DE MOUSE (Para DESKTOP - continuam funcionando) ---
              // Quando o mouse ENTRA na área do tazo, vira para o verso.
              onMouseEnter={() => definirTazoCabecalhoVirado(true)}
              // Quando o mouse SAI da área do tazo, volta para a frente.
              onMouseLeave={() => definirTazoCabecalhoVirado(false)}
              // --- EVENTOS DE FOCO (Para ACESSIBILIDADE via teclado - continuam funcionando) ---
              // Quando o tazo recebe FOCO (ex: usuário navegou com a tecla Tab até ele).
              onFocus={() => definirTazoCabecalhoVirado(true)}
              // Quando o tazo PERDE o foco.
              onBlur={() => definirTazoCabecalhoVirado(false)}
              // --- EVENTO DE CLIQUE/TOQUE (Para TODOS os dispositivos) ---
              // AGORA, o `onClick` chama nosso novo handler `lidarComInteracaoNoTazo`.
              // Em dispositivos de TOQUE, um "tap" (toque rápido) geralmente dispara `onClick`.
              // Em dispositivos com MOUSE, um clique dispara `onClick`.
              // Esta função vai:
              //   1. VIRAR o tazo (alternar `tazoCabecalhoVirado`).
              //   2. ABRIR a imagem (que ficou visível após o flip) no lightbox.
              onClick={lidarComInteracaoNoTazo}
              // --- EVENTO DE TECLADO (Para ACESSIBILIDADE - Enter/Espaço) ---
              // Se o tazo estiver focado e o usuário pressionar "Enter" ou "Espaço"...
              onKeyDown={(evento) => {
                if (evento.key === "Enter" || evento.key === " ") {
                  evento.preventDefault(); // Previne o comportamento padrão da tecla (ex: rolar a página com Espaço).
                  // Reutilizamos a mesma lógica de interação do clique/toque!
                  lidarComInteracaoNoTazo(evento); // Passamos o evento, embora nosso handler atual não o use diretamente.
                }
              }}
              tabIndex="0" // IMPORTANTE para acessibilidade: torna o `<div>` FOCÁVEL com a tecla Tab.
              // Elementos como `<div>` e `<span>` não são focáveis por padrão.
              role="button" // Diz aos leitores de tela que este `<div>` se comporta como um BOTÃO.
              // `aria-label` descreve a ação do "botão" para leitores de tela.
              // Inclui dinamicamente qual face está sendo mostrada.
              aria-label={`Tazo de ${nomeComumPrincipal}. Clique ou toque para virar e ampliar a imagem.`}
              // `aria-pressed` indica o estado de um botão de alternância (toggle button).
              // `true` se o tazo está "pressionado" (virado), `false` caso contrário.
              aria-pressed={tazoCabecalhoVirado}
            >
              {/* Container Interno que efetivamente GIRA (o "disco" do tazo) */}
              <div
                className={`${styles.headerTazoInner} ${
                  // Classe base para o disco.
                  tazoCabecalhoVirado ? styles.headerTazoInnerFlipped : "" // Adiciona classe de "virado" SE `tazoCabecalhoVirado` for `true`.
                }`}
              >
                {/* Face FRONTAL do Tazo */}
                <div
                  className={`${styles.headerTazoFace} ${styles.headerTazoFront}`}
                >
                  {tazoFrontUrl ? ( // Se tiver URL para a imagem da frente...
                    <img
                      src={tazoFrontUrl}
                      alt=""
                      loading="lazy"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    // `alt=""` - Imagem decorativa, o `aria-label` do container já descreve.
                    // `loading="lazy"` - O navegador só carrega a imagem quando ela está perto de aparecer na tela.
                    // `onError` - Se a imagem falhar ao carregar, ela é escondida.
                    // Senão (se não tiver imagem da frente)...
                    // ...mas se TIVER imagem do VERSO, mostra um placeholder para a frente.
                    tazoBackUrl && (
                      <div className={styles.imagePlaceholder}>
                        Frente do Tazo Indisponível
                      </div>
                    )
                  )}
                </div>
                {/* Face do VERSO do Tazo */}
                <div
                  className={`${styles.headerTazoFace} ${styles.headerTazoBack}`}
                >
                  {tazoBackUrl ? ( // Se tiver URL para a imagem do verso...
                    <img
                      src={tazoBackUrl}
                      alt=""
                      loading="lazy"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    // Senão...
                    // ...mas se TIVER imagem da FRENTE, mostra um placeholder para o verso.
                    tazoFrontUrl && (
                      <div className={styles.imagePlaceholder}>
                        Verso do Tazo Indisponível
                      </div>
                    )
                  )}
                </div>
              </div>{" "}
              {/* Fim do .headerTazoInner */}
            </div> // Fim do .headerTazoContainer
          ) : imagensDaGaleria.length > 0 ? ( // SENÃO (se não tiver tazo), mas se houver imagens na galeria...
            // ...mostra a PRIMEIRA imagem da galeria como imagem principal de destaque.
            <img
              src={imagensDaGaleria[0]}
              alt={`Foto principal de ${nomeComumPrincipal}`}
              className={`${styles.detailImageLarge} ${styles.galleryImageClickable}`}
              onClick={() => abrirImagemNoLightbox(imagensDaGaleria[0])} // Clique abre no lightbox.
              onError={(e) => {
                e.target.style.display = "none";
              }} // Esconde se falhar.
              loading="lazy" // Carregamento preguiçoso.
              title="Clique para ampliar a imagem" // Dica ao passar o mouse.
            />
          ) : (
            // SENÃO (se não houver NENHUMA imagem - nem tazo, nem galeria)...
            // ...mostra um placeholder genérico.
            <div
              className={styles.imagePlaceholder}
              style={{
                height: "200px",
                width: "100%",
                maxWidth: "300px",
                margin: "0 auto 1.5rem auto",
              }}
            >
              Nenhuma imagem principal disponível para {nomeComumPrincipal}.
            </div>
          )}

          {/* Nome Comum e Científico do Animal */}
          <h1 className={styles.animalNameTitle}>
            {nomeComumPrincipal}
            <span className={styles.scientificNameDetail}>
              (<em>{nomeCientificoPrincipal}</em>){" "}
              {/* `<em>` para ênfase/itálico no nome científico. */}
            </span>
          </h1>

          {/* Banner com o Status de Extinção (cor de fundo dinâmica) */}
          <div
            className={styles.extinctionBanner}
            style={{ backgroundColor: corDoStatusHex }}
          >
            <h2>
              {categoriaExtincao} - {descricaoExtincao}
            </h2>
          </div>

          {/* Escala Visual dos Níveis de Extinção */}
          {/* Só renderiza a escala se `escalaExtincao` for um array com itens. */}
          {escalaExtincao.length > 0 && (
            <div className={styles.extinctionScaleVisual}>
              {escalaExtincao.map(
                (
                  nivel // Mapeia cada nível da escala para um `div`.
                ) => (
                  <div
                    key={get(nivel, "sigla", Math.random())} // Chave única.
                    className={`${styles.scaleLevel} ${
                      // Classe base para o nível.
                      get(nivel, "sigla") === categoriaExtincao
                        ? styles.scaleLevelCurrent
                        : "" // Destaca o nível atual do animal.
                    }`}
                    style={{
                      backgroundColor: getExtinctionHexColor(
                        get(nivel, "sigla")
                      ),
                    }} // Cor de fundo para cada nível.
                    title={get(nivel, "descricao")} // Tooltip com a descrição completa do nível ao passar o mouse.
                  >
                    {get(nivel, "sigla", "?")}{" "}
                    {/* Sigla do nível (ex: LC, EN), ou "?" se faltar. */}
                  </div>
                )
              )}
            </div>
          )}
        </header>{" "}
        {/* Fim do .detailHeader */}
        {/* --- SEÇÕES DE CONTEÚDO DETALHADO --- */}
        {/* Cada seção abaixo usa nosso componente auxiliar `DetailSectionContent`
            para manter um padrão visual e de fallback para dados ausentes.
            Passamos `title`, `icon` (emoji), `condition` (opcional), e o conteúdo
            principal como `children` (o JSX entre as tags). */}
        <DetailSectionContent
          title="Outros Nomes Comuns"
          icon="🗣️" // Emoji de "cabeça falante"
          // `condition`: Só mostra esta seção se realmente houver nomes em outros idiomas para listar.
          condition={Object.keys(nomesComunsParaExibicao).length > 0}
        >
          {/* O conteúdo (`children`) desta seção é o resultado da nossa função
              `renderizarListaDeDefinicaoDetalhada`, que cria uma lista de termos/descrições. */}
          {renderizarListaDeDefinicaoDetalhada(nomesComunsParaExibicao)}
        </DetailSectionContent>
        <DetailSectionContent
          title="Galeria de Fotos Adicionais"
          icon="🖼️" // Emoji de "moldura com paisagem"
          // `condition`: Só mostra se houver imagens na nossa `imagensDaGaleria`.
          condition={imagensDaGaleria.length > 0}
        >
          {/* O conteúdo (`children`) aqui é um parágrafo de dica e o container da galeria. */}
          <p className={styles.galleryHint}>
            Clique nas imagens abaixo para ampliar e navegar na galeria.
          </p>
          <div className={styles.galleryContainer}>
            {/* Mapeamos nosso array `imagensDaGaleria` para criar uma tag `<img>` para cada URL. */}
            {imagensDaGaleria.map((urlDaImagem, indice) => (
              <img
                key={`${urlDaImagem}-${indice}`} // Chave única (URL + índice, caso haja URLs duplicadas nos dados originais).
                src={urlDaImagem}
                alt={`Foto ${indice + 1} de ${nomeComumPrincipal}`} // Texto alternativo descritivo para acessibilidade.
                className={`${styles.galleryImage} ${styles.galleryImageClickable}`} // Classes para estilo e interatividade.
                onClick={() => abrirImagemNoLightbox(urlDaImagem)} // Ação de clique para abrir no lightbox.
                onError={(e) => {
                  e.target.style.display = "none";
                }} // Se a imagem falhar ao carregar, ela é escondida.
                loading="lazy" // "Carregamento preguiçoso": o navegador só baixa a imagem quando ela está
                // perto de aparecer na tela, o que pode melhorar o tempo de carregamento inicial.
                title="Clique para ampliar esta imagem" // Dica ao passar o mouse.
              />
            ))}
          </div>
        </DetailSectionContent>
        <DetailSectionContent
          title="Classificação Científica (Taxonomia)"
          icon="👑"
        >
          {/* Passamos o objeto `animal.classificacao_taxonomica` para nossa função de renderização. */}
          {renderizarListaDeDefinicaoDetalhada(
            get(animal, "classificacao_taxonomica", {})
          )}
        </DetailSectionContent>
        <DetailSectionContent
          title="Detalhes do Status de Conservação"
          icon="📊"
        >
          {/* Aqui, o conteúdo (`children`) é um Fragmento React (`<>...</>`) com múltiplos parágrafos,
              cada um renderizado condicionalmente se o dado específico existir. */}
          <>
            {get(animal, "status_conservacao.categoria_global", "N/A") !==
              "N/A" && (
              <p>
                <strong>Categoria Global (IUCN):</strong>{" "}
                {get(animal, "status_conservacao.categoria_global")}
              </p>
            )}
            {get(animal, "status_conservacao.tendencia_populacional", "N/A") !==
              "N/A" && (
              <p style={{ marginTop: "0.3rem" }}>
                <strong>Tendência da População:</strong>{" "}
                {get(animal, "status_conservacao.tendencia_populacional")}
              </p>
            )}
            {get(animal, "status_conservacao.justificativa", "N/A") !==
              "N/A" && (
              <p
                className={styles.paragraphWithMargin}
                style={{ marginTop: "0.3rem" }}
              >
                <strong>Justificativa do Status:</strong>{" "}
                {get(animal, "status_conservacao.justificativa")}
              </p>
            )}
            {/* Se TODAS as informações desta seção (categoria, tendência, justificativa)
                estiverem ausentes ou forem "N/A", o `DetailSectionContent` (devido à lógica
                de `conteudoConsideradoVazio` nele) mostrará a mensagem padrão
                "Informação não disponível...". */}
          </>
        </DetailSectionContent>
        {/* O Componente de Mapa, que recebe o objeto `animal` inteiro como prop
            para que ele possa extrair as coordenadas e exibir o mapa de distribuição. */}
        <MapComponent animal={animal} />
        <DetailSectionContent title="Habitat e Ecossistemas" icon="🌳">
          <>
            {get(animal, "habitat.descricao", "N/A") !== "N/A" && (
              <p className={styles.paragraphWithMargin}>
                {get(animal, "habitat.descricao")}
              </p>
            )}
            {/* Verifica se `animal.habitat.habitats_principais` é um array E tem itens antes de tentar renderizar a lista. */}
            {Array.isArray(get(animal, "habitat.habitats_principais", [])) &&
              get(animal, "habitat.habitats_principais", []).length > 0 && (
                <>
                  <h3 className={styles.sectionSubtitle}>
                    Principais Tipos de Habitat:
                  </h3>
                  {renderizarListaDeItensSimples(
                    get(animal, "habitat.habitats_principais", []),
                    "🏞️"
                  )}
                </>
              )}
          </>
        </DetailSectionContent>
        <DetailSectionContent title="Ecologia e Comportamento" icon="🔬">
          {renderizarListaDeDefinicaoDetalhada(get(animal, "ecologia", {}))}
        </DetailSectionContent>
        <DetailSectionContent title="Principais Ameaças" icon="⚠️">
          {renderizarListaDeItensSimples(get(animal, "ameacas", []), "❗")}
        </DetailSectionContent>
        <DetailSectionContent title="Ações e Esforços de Conservação" icon="🛡️">
          <>
            {get(animal, "acoes_conservacao.protecao_legal", "N/A") !==
              "N/A" && (
              <p>
                <strong>Medidas de Proteção Legal:</strong>{" "}
                {get(animal, "acoes_conservacao.protecao_legal")}
              </p>
            )}
            {Array.isArray(
              get(animal, "acoes_conservacao.acoes_recomendadas", [])
            ) &&
              get(animal, "acoes_conservacao.acoes_recomendadas", []).length >
                0 && (
                <>
                  <h3
                    className={styles.sectionSubtitle}
                    // Estilo inline condicional: adiciona margem superior ao subtítulo
                    // APENAS SE a seção "Proteção Legal" acima dele tiver sido renderizada.
                    style={{
                      marginTop:
                        get(
                          animal,
                          "acoes_conservacao.protecao_legal",
                          "N/A"
                        ) !== "N/A"
                          ? "1rem"
                          : "0",
                    }}
                  >
                    Ações Recomendadas para Conservação:
                  </h3>
                  {renderizarListaDeItensSimples(
                    get(animal, "acoes_conservacao.acoes_recomendadas", []),
                    "✅"
                  )}
                </>
              )}
          </>
        </DetailSectionContent>
        <DetailSectionContent
          title="Curiosidades e Fatos Interessantes"
          icon="✨"
        >
          {renderizarListaDeItensSimples(get(animal, "curiosidades", []), "💡")}
        </DetailSectionContent>
        <DetailSectionContent title="Fonte das Informações" icon="🔗">
          <div className={styles.sourceSection}>
            {get(animal, "fonte.citacao", "N/A") !== "N/A" && (
              <p>
                <strong>Citação:</strong> {get(animal, "fonte.citacao")}
              </p>
            )}
            {/* Verifica se o link da fonte existe E não é apenas a string "N/A"
                (pois `get` pode retornar "N/A" se a propriedade `link` estiver ausente). */}
            {get(animal, "fonte.link") &&
              get(animal, "fonte.link") !== "N/A" && (
                <p>
                  <strong>Link da Fonte:</strong>{" "}
                  {/* Link para a fonte original, abrindo em nova aba. */}
                  <a
                    href={get(animal, "fonte.link")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar fonte original{" "}
                    <span aria-label="(abre em nova aba)">↗️</span>{" "}
                    {/* Ícone e acessibilidade. */}
                  </a>
                </p>
              )}
          </div>
        </DetailSectionContent>
      </article>{" "}
      {/* Fim do .detailContainer (o <article>) */}
      {/* --- SEÇÃO DO LIGHTBOX (VISUALIZADOR DE IMAGEM AMPLIADA) --- */}
      {/* O lightbox (fundo escuro + imagem ampliada + controles) só é renderizado
          SE `lightboxInfo.index` for diferente de -1 (ou seja, uma imagem foi selecionada)
          E se houver imagens na lista `lightboxInfo.images`. */}
      {lightboxInfo.index !== -1 && lightboxInfo.images.length > 0 && (
        // O "backdrop" é o fundo escuro que cobre toda a tela.
        // Clicar DIRETAMENTE no backdrop (não na imagem ou botões) chama `fecharLightbox`.
        <div
          className={styles.lightboxBackdrop}
          onClick={fecharLightbox} // Fecha ao clicar no fundo.
          role="dialog" // Informa aos leitores de tela que isso é um diálogo/modal.
          aria-modal="true" // Indica que o conteúdo POR TRÁS do lightbox está inativo.
          aria-label={`Visualizador de imagem: ${nomeComumPrincipal}`} // Um rótulo geral para o diálogo.
        >
          {/* Wrapper para o conteúdo do lightbox (imagem e botões de controle).
              Clicar DENTRO deste wrapper NÃO fecha o lightbox, graças a `e.stopPropagation()` abaixo. */}
          <div
            className={styles.lightboxContentWrapper}
            onClick={(e) => e.stopPropagation()} // IMPEDE que o clique aqui "borbulhe" para o backdrop.
          >
            {/* Botão "Anterior" (só aparece se houver MAIS DE UMA imagem para navegar) */}
            {lightboxInfo.images.length > 1 && (
              <button
                onClick={imagemAnteriorLightbox}
                className={`${styles.lightboxNavButton} ${styles.lightboxPrevButton}`}
                aria-label="Ver imagem anterior na galeria"
                title="Anterior (Seta Esquerda)" // Dica visual.
              >
                &#10094;{" "}
                {/* Código HTML para o caractere de seta para esquerda (‹) */}
              </button>
            )}

            {/* Container da imagem ampliada */}
            <div className={styles.lightboxImageContainer}>
              <img
                src={lightboxInfo.images[lightboxInfo.index]} // A URL da imagem ATUAL a ser exibida.
                alt={`Imagem ampliada ${lightboxInfo.index + 1} de ${
                  lightboxInfo.images.length
                } do animal ${nomeComumPrincipal}`} // Texto alternativo bem descritivo.
                className={styles.lightboxImage} // Estilos para a imagem.
              />
            </div>

            {/* Botão "Próxima" (só aparece se houver mais de uma imagem) */}
            {lightboxInfo.images.length > 1 && (
              <button
                onClick={proximaImagemLightbox}
                className={`${styles.lightboxNavButton} ${styles.lightboxNextButton}`}
                aria-label="Ver próxima imagem na galeria"
                title="Próxima (Seta Direita)"
              >
                &#10095;{" "}
                {/* Código HTML para o caractere de seta para direita (›) */}
              </button>
            )}

            {/* Botão para Fechar o Lightbox (o "X") */}
            <button
              onClick={fecharLightbox}
              className={styles.lightboxCloseButton}
              aria-label="Fechar visualizador de imagem (Esc)" // Informa que Esc também fecha.
              title="Fechar (Esc)" // Dica visual.
            >
              &times;{" "}
              {/* Código HTML para o símbolo de multiplicação (X), que parece um "fechar". */}
            </button>
          </div>{" "}
          {/* Fim do .lightboxContentWrapper */}
        </div> // Fim do .lightboxBackdrop
      )}{" "}
      {/* Fim da renderização condicional do Lightbox */}
    </> // Fim do Fragmento React
  ); // Fim da instrução return do componente AnimalDetail
}; // Fim da definição do componente AnimalDetail

// Exporta o componente `AnimalDetail` para que ele possa ser importado e usado
// em outros arquivos da nossa aplicação (principalmente no `App.js`).
export default AnimalDetail;
