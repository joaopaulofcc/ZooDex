// Caminho: src/components/AnimalDetail.jsx

// =================================================================================================
// ARQUIVO: AnimalDetail.jsx
// PROPÓSITO: Mostrar uma página com todas as informações detalhadas sobre UM ÚNICO animal
//            que foi selecionado pelo usuário na lista principal.
//
// CONCEITOS PRINCIPAIS DO REACT UTILIZADOS AQUI:
//  - Componentes Funcionais: A estrutura básica do nosso componente.
//  - Props: Como o componente recebe dados (o objeto 'animal') e funções (a função 'onBack')
//           do seu componente pai (o App.js).
//  - useState: Para gerenciar o estado interno do componente, como:
//              - Se o "tazo" do animal no cabeçalho está virado ou não.
//              - Qual imagem está sendo exibida no "lightbox" (visualizador de imagem em tela cheia).
//              - Se o lightbox está visível ou não.
//  - useEffect: Para adicionar e remover "escutadores de eventos" (event listeners),
//               especificamente para permitir que o usuário feche o lightbox pressionando a tecla "Esc".
//  - useMemo: Para otimizar o processamento de dados que não mudam frequentemente, como a lista
//             de imagens da galeria. Ele "memoriza" o resultado de uma computação e só a refaz
//             se as suas dependências mudarem.
//  - JSX: A sintaxe especial que usamos para descrever a estrutura da interface do usuário.
//  - Renderização Condicional: Mostrar ou esconder partes da interface com base em certas condições
//                           (ex: mostrar o lightbox apenas se uma imagem estiver selecionada para ampliação).
//  - Mapeamento de Arrays para Elementos (listas): Usar o método '.map()' para transformar arrays de dados
//                                                (ex: lista de curiosidades, lista de imagens da galeria)
//                                                em uma lista de elementos JSX.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS, COMPONENTES E FUNÇÕES ---

// Importa a biblioteca React e os Hooks que vamos utilizar.
import React, { useState, useEffect, useMemo } from "react";

// Importa o componente MapComponent, que será usado para mostrar o mapa de distribuição do animal.
import MapComponent from "./MapComponent";

// Importa funções utilitárias do nosso arquivo de dados (animalData.js).
// - 'get': Para buscar dados dentro de objetos de forma segura e com um valor padrão.
// - 'getExtinctionHexColor': Para obter o código hexadecimal da cor correspondente ao status de extinção.
import { get, getExtinctionHexColor } from "../data/animalData";

// Importa o objeto 'styles' do nosso arquivo CSS Module (AnimalDetail.module.css).
// Isso nos permite usar classes CSS como 'styles.detailContainer', 'styles.sectionTitle', etc.,
// e garante que esses estilos sejam escopados (limitados) apenas a este componente.
import styles from "./AnimalDetail.module.css";


// --- 2. COMPONENTE AUXILIAR INTERNO: DetailSectionContent ---
// Este é um "componente auxiliar" (helper component) criado para ajudar a padronizar
// a forma como cada seção de informação (Habitat, Ecologia, etc.) é exibida.
// Ele não será exportado, pois só é usado dentro do AnimalDetail.jsx.
//
// Props que este componente espera receber:
//  - title: (String) O título da seção (ex: "Habitat").
//  - children: (JSX) O conteúdo principal da seção. Esta é uma prop especial do React.
//                   Tudo que é colocado entre as tags <DetailSectionContent> e </DetailSectionContent>
//                   será passado como 'children'.
//  - icon: (String, opcional) Um emoji ou caractere para ser exibido antes do título.
//  - condition: (Boolean, opcional, padrão é true) Se false, a seção não renderiza seu conteúdo,
//               mostrando apenas a mensagem de "Informação não disponível".
const DetailSectionContent = ({ title, children, icon = "", condition = true }) => {
  // Vamos verificar se o conteúdo ('children') que recebemos é considerado "vazio" ou "inválido".
  let conteudoConsideradoVazio = false;
  if (
    children === null || // Se for explicitamente null
    children === undefined || // Se for explicitamente undefined
    children === "N/A" || // Se a função 'get' retornou "N/A" (nosso valor padrão para dados ausentes)
    (Array.isArray(children) && children.length === 0) || // Se for um array sem nenhum item
    (typeof children === 'object' && // Se for um objeto...
      !React.isValidElement(children) && // ... que NÃO seja um elemento React válido (como <p> ou outro componente)...
      Object.keys(children).length === 0) // ... e que NÃO tenha nenhuma propriedade própria.
  ) {
    conteudoConsideradoVazio = true;
  }

  // Se a 'condition' prop for 'false', OU se o 'conteudoConsideradoVazio' for 'true',
  // então vamos renderizar o título da seção seguido de uma mensagem padrão.
  if (!condition || conteudoConsideradoVazio) {
    return (
      <div className={styles.detailSection}> {/* Container da seção */}
        <h2 className={styles.sectionTitle}> {/* Título da seção */}
          {icon && ( /* Renderiza o ícone SOMENTE SE a prop 'icon' foi fornecida E não é vazia */
            <span className={styles.icon} role="img" aria-label={title.toLowerCase()}>
              {icon}
            </span>
          )}
          {title} {/* O título da seção */}
        </h2>
        {/* Mensagem padrão para quando não há conteúdo */}
        <p className={styles.textMuted}>Informação não disponível para esta seção.</p>
      </div>
    );
  }

  // Se a 'condition' for 'true' E o conteúdo NÃO for considerado vazio,
  // renderizamos a seção normalmente com seu título e o conteúdo ('children').
  return (
    <div className={styles.detailSection}>
      <h2 className={styles.sectionTitle}>
        {icon && (
          <span className={styles.icon} role="img" aria-label={title.toLowerCase()}>
            {icon}
          </span>
        )}
        {title}
      </h2>
      {children} {/* Aqui o 'children' (conteúdo JSX passado) é renderizado. */}
    </div>
  );
};


// --- 3. MAPA PARA EXIBIÇÃO AMIGÁVEL DE NOMES DE IDIOMAS ---
// Este objeto é usado para traduzir os códigos de idioma (ex: "pt", "en")
// para nomes mais legíveis quando formos listar os "Nomes Comuns em outros idiomas".
const languageDisplayMap = {
  pt: "Português (Brasil)", // Poderíamos ser mais específicos
  en: "Inglês (English)",
  es: "Espanhol (Español)",
  fr: "Francês (Français)", // Exemplo, adicione mais conforme necessário
  de: "Alemão (Deutsch)",   // Exemplo
  // Adicione outros códigos de idioma e seus nomes de exibição
  // baseados nos dados que você tem em `animal.nome_comum`.
};


// --- 4. DEFINIÇÃO DO COMPONENTE PRINCIPAL 'AnimalDetail' ---
// Este componente recebe duas props principais do App.js:
//  - 'animal': Um objeto contendo todos os dados do animal que foi selecionado.
//  - 'onBack': Uma função que será chamada quando o usuário clicar no botão "Voltar à Lista".
//              Esta função é definida no App.js e geralmente atualiza o estado lá
//              para indicar que nenhum animal está mais selecionado, fazendo a lista reaparecer.
const AnimalDetail = ({ animal, onBack }) => {
  // --- A. GERENCIAMENTO DE ESTADO INTERNO DO COMPONENTE ---
  // Usamos 'useState' para criar variáveis de estado que este componente precisa "lembrar".

  // Estado para controlar o lightbox (visualizador de imagem ampliada):
  // - 'lightboxInfo.index': O índice da imagem que está atualmente ampliada.
  //                         Começa com -1, o que significa que o lightbox está fechado.
  // - 'lightboxInfo.images': Um array contendo as URLs de todas as imagens que podem
  //                          ser vistas no lightbox (geralmente as imagens da galeria).
  const [lightboxInfo, definirLightboxInfo] = useState({ index: -1, images: [] });

  // Estado para controlar se o "tazo" (card com imagem frente/verso)
  // exibido no cabeçalho desta página de detalhes está virado ou não.
  // Começa como 'false' (mostrando a frente).
  const [tazoCabecalhoVirado, definirTazoCabecalhoVirado] = useState(false);


  // --- B. MEMORIZAÇÃO DO CÁLCULO DAS IMAGENS DA GALERIA (useMemo) ---
  // 'useMemo' é um Hook de otimização. Ele "memoriza" (guarda o resultado de)
  // uma função de cálculo. A função só é re-executada se uma das "dependências"
  // (listadas no array no final do useMemo) mudar.
  //
  // Neste caso, estamos calculando a lista de URLs para as imagens da galeria.
  // Este cálculo só precisa ser feito novamente se o objeto 'animal' (a prop) mudar.
  // Se o componente AnimalDetail re-renderizar por outros motivos (ex: mudança de estado interno),
  // 'imagensDaGaleria' não será recalculado desnecessariamente, usando o valor memorizado.
  const imagensDaGaleria = useMemo(() => {
    // console.log("Calculando imagensDaGaleria..."); // Para depuração, mostra quando é recalculado.

    // Se não recebermos dados do 'animal' ou se o animal não tiver a propriedade 'imagens',
    // retornamos um array vazio para evitar erros.
    if (!animal || !animal.imagens) {
      return [];
    }

    // Usamos um 'Set' para garantir que cada URL de imagem seja única na galeria,
    // evitando duplicatas caso os dados as contenham.
    const urlsUnicas = new Set();
    const imagensOrdenadasParaGaleria = [];

    // Função interna (helper) para adicionar uma URL de imagem à lista,
    // apenas se ela for uma string válida, não vazia, e ainda não estiver na lista.
    const adicionarImagemSeValida = (url) => {
      if (url && typeof url === 'string' && url.trim() !== "" && !urlsUnicas.has(url)) {
        urlsUnicas.add(url); // Adiciona ao Set para marcar como já vista.
        imagensOrdenadasParaGaleria.push(url); // Adiciona ao array final.
      }
    };

    // Tentamos adicionar as imagens 'foto_1' e 'foto_2' à galeria.
    // Usamos a função 'get' para buscar essas URLs de forma segura no objeto 'animal.imagens'.
    adicionarImagemSeValida(get(animal, "imagens.foto_1", "")); // Se 'foto_1' não existir, 'get' retorna "".
    adicionarImagemSeValida(get(animal, "imagens.foto_2", ""));

    // Poderíamos adicionar mais imagens aqui se a estrutura de dados tivesse, por exemplo:
    // adicionarImagemSeValida(get(animal, "imagens.foto_adicional_1", ""));
    // adicionarImagemSeValida(get(animal, "imagens.mapa_distribuicao_img", ""));

    return imagensOrdenadasParaGaleria; // Retorna o array com as URLs das imagens da galeria.
  }, [animal]); // Array de dependências: 'useMemo' re-executará esta função SE 'animal' mudar.


  // --- C. FUNÇÕES PARA CONTROLAR O LIGHTBOX (VISUALIZADOR DE IMAGENS) ---

  // Função para ABRIR o lightbox.
  // É chamada quando o usuário clica em uma imagem da galeria ou no tazo do cabeçalho.
  // 'urlDaImagemClicada': A URL da imagem que o usuário clicou.
  const abrirImagemNoLightbox = (urlDaImagemClicada) => {
    // Primeiro, tentamos encontrar o índice da imagem clicada dentro da nossa lista 'imagensDaGaleria'.
    const indiceDaImagemNaGaleria = imagensDaGaleria.findIndex(url => url === urlDaImagemClicada);

    if (indiceDaImagemNaGaleria !== -1) {
      // Se a imagem clicada FAZ PARTE da galeria, configuramos o lightbox para começar
      // nessa imagem e disponibilizamos todas as imagens da galeria para navegação.
      definirLightboxInfo({
        index: indiceDaImagemNaGaleria, // O índice da imagem clicada.
        images: imagensDaGaleria        // O array completo de imagens da galeria.
      });
    } else if (urlDaImagemClicada && typeof urlDaImagemClicada === 'string' && urlDaImagemClicada.trim() !== "") {
      // Se a imagem clicada NÃO está na galeria (ex: pode ser uma das imagens do tazo do cabeçalho
      // que não repetimos na galeria), abrimos o lightbox mostrando APENAS essa imagem.
      // Nesse caso, a navegação (próxima/anterior) não fará sentido ou não estará disponível.
      definirLightboxInfo({
        index: 0, // Começamos no índice 0 do novo array de imagens.
        images: [urlDaImagemClicada] // O array de imagens contém apenas a imagem clicada.
      });
    }
    // Se 'urlDaImagemClicada' for inválida, não fazemos nada.
  };

  // Função para FECHAR o lightbox.
  // É chamada quando o usuário clica no backdrop (fundo escuro) do lightbox,
  // no botão de fechar (X), ou pressiona a tecla 'Escape'.
  const fecharLightbox = () => {
    // Reseta o estado do lightbox para seus valores iniciais (fechado).
    definirLightboxInfo({ index: -1, images: [] });
  };

  // Função para navegar para a PRÓXIMA imagem no lightbox.
  // O argumento 'e' é o objeto do evento de clique (precisamos dele para parar a propagação).
  const proximaImagemLightbox = (e) => {
    // 'e.stopPropagation()' impede que o evento de clique neste botão
    // "borbulhe" para cima e acione o onClick do backdrop do lightbox (que fecharia o lightbox).
    e.stopPropagation();

    // Atualizamos o estado 'lightboxInfo' usando a forma funcional de 'definirLightboxInfo'.
    // Isso nos dá acesso ao 'estadoAnterior' (o valor atual de lightboxInfo).
    definirLightboxInfo(estadoAnterior => ({
      ...estadoAnterior, // Mantemos todas as outras propriedades do estado (como o array 'images').
      // Calculamos o novo 'index':
      // (estadoAnterior.index + 1) pega o próximo índice.
      // '% estadoAnterior.images.length' faz com que, se chegarmos ao final da lista de imagens,
      // o índice volte para 0 (criando um efeito de carrossel/loop).
      index: (estadoAnterior.index + 1) % estadoAnterior.images.length,
    }));
  };

  // Função para navegar para a imagem ANTERIOR no lightbox.
  const imagemAnteriorLightbox = (e) => {
    e.stopPropagation(); // Impede que o clique feche o lightbox.
    definirLightboxInfo(estadoAnterior => ({
      ...estadoAnterior,
      // Calcula o índice anterior:
      // (estadoAnterior.index - 1 + estadoAnterior.images.length) garante que, se estivermos no índice 0
      // e subtrairmos 1 (resultando em -1), ao somar o tamanho do array, obtemos um número positivo.
      // O operador '%' (módulo) então nos dá o índice correto para o final da lista (efeito carrossel).
      index: (estadoAnterior.index - 1 + estadoAnterior.images.length) % estadoAnterior.images.length,
    }));
  };


  // --- D. EFEITO COLATERAL (useEffect) PARA OUVIR A TECLA 'ESCAPE' ---
  // Este 'useEffect' é usado para adicionar um "escutador de eventos" (event listener)
  // ao documento, para que possamos fechar o lightbox quando o usuário pressionar a tecla 'Escape'.
  useEffect(() => {
    // Esta é a função que será chamada toda vez que uma tecla for pressionada NO DOCUMENTO INTEIRO.
    const lidarComTeclaEsc = (evento) => {
      // Verificamos se a tecla pressionada foi a 'Escape'.
      if (evento.key === "Escape") {
        fecharLightbox(); // Se sim, chamamos nossa função para fechar o lightbox.
      }
    };

    // SÓ adicionamos o escutador de eventos SE o lightbox estiver atualmente aberto.
    // Verificamos isso checando se 'lightboxInfo.index' é diferente de -1.
    if (lightboxInfo.index !== -1) {
      // 'document.addEventListener' anexa nossa função 'lidarComTeclaEsc' ao evento 'keydown'
      // (que é disparado quando uma tecla é pressionada).
      document.addEventListener("keydown", lidarComTeclaEsc);
      // console.log("useEffect: Event listener para 'Esc' ADICIONADO."); // Para depuração
    }

    // A função retornada pelo 'useEffect' é chamada de "função de limpeza" (cleanup function).
    // Ela é executada:
    //  1. ANTES que o efeito seja executado novamente (se alguma de suas dependências mudar).
    //  2. QUANDO o componente 'AnimalDetail' for "desmontado" (removido da tela).
    // É MUITO IMPORTANTE remover event listeners que foram adicionados manualmente
    // para evitar "vazamentos de memória" (memory leaks) e comportamentos inesperados.
    return () => {
      document.removeEventListener("keydown", lidarComTeclaEsc);
      // console.log("useEffect: Event listener para 'Esc' REMOVIDO."); // Para depuração
    };

  // Array de dependências do useEffect: [lightboxInfo.index]
  // Este efeito será re-executado (ou seja, o listener será potencialmente re-adicionado/removido)
  // SOMENTE se o valor de 'lightboxInfo.index' mudar.
  // Isso garante que o listener só esteja ativo quando o lightbox estiver visível.
  }, [lightboxInfo.index]);


  // --- E. VERIFICAÇÃO DE DADOS DO ANIMAL ---
  // Se, por algum motivo muito estranho, o componente AnimalDetail for renderizado
  // mas a prop 'animal' for nula ou indefinida, exibimos uma mensagem de erro
  // e interrompemos a renderização do restante para evitar erros piores.
  if (!animal) {
    // Idealmente, o componente App.js já garantiria que 'animal' sempre tenha dados
    // antes de renderizar AnimalDetail, mas é uma boa prática defensiva.
    return <p className="error-message">Erro crítico: Dados do animal não foram fornecidos para a página de detalhes.</p>;
  }


  // --- F. EXTRAÇÃO DE DADOS DO ANIMAL PARA USO NO JSX ---
  // Aqui, pegamos todas as informações do objeto 'animal' que queremos exibir.
  // Usar 'get' torna o código mais robusto a dados ausentes.

  // Informações sobre o Nível de Extinção
  const objetoNivelExtincao = get(animal, "nivel_extincao", {}); // Pega o objeto inteiro para evitar múltiplas chamadas 'get' no mesmo nível.
  const categoriaExtincao = get(objetoNivelExtincao, "categoria", "N/A");
  const descricaoExtincao = get(objetoNivelExtincao, "descricao", "Não Avaliado");
  const corDoStatusHex = getExtinctionHexColor(categoriaExtincao); // Cor para o banner e escala.
  // Garante que 'escalaExtincao' seja sempre um array. Se 'get' retornar "N/A" ou algo que não seja array, usa [].
  const escalaExtincao = Array.isArray(get(objetoNivelExtincao, "escala", [])) ? get(objetoNivelExtincao, "escala", []) : [];

  // URLs das imagens do Tazo para o cabeçalho da página.
  const tazoFrontUrl = get(animal, "imagens.front", ""); // Retorna "" se não houver, para facilitar verificações.
  const tazoBackUrl = get(animal, "imagens.back", "");

  // Nomes principais do animal.
  const nomeComumPrincipal = get(animal, "nome_tazo", "Nome Indisponível");
  const nomeCientificoPrincipal = get(animal, "nome_cientifico", "Nome Científico Indisponível");

  // Prepara a lista de Nomes Comuns em outros idiomas.
  const nomesComunsEmOutrosIdiomasRaw = get(animal, "nome_comum", {}); // Pega o objeto {pt: "...", en: "..."}
  const nomesComunsParaExibicao = {}; // Objeto para armazenar os nomes formatados.
  // Verifica se 'nomesComunsEmOutrosIdiomasRaw' é um objeto e não nulo.
  if (typeof nomesComunsEmOutrosIdiomasRaw === 'object' && nomesComunsEmOutrosIdiomasRaw !== null) {
    // Itera sobre as chaves (códigos de idioma) do objeto.
    for (const codigoIdioma in nomesComunsEmOutrosIdiomasRaw) {
      // 'hasOwnProperty' garante que estamos olhando apenas para propriedades diretas do objeto,
      // e não para propriedades herdadas do protótipo (boa prática).
      if (nomesComunsEmOutrosIdiomasRaw.hasOwnProperty(codigoIdioma)) {
        const nomeNesteIdioma = nomesComunsEmOutrosIdiomasRaw[codigoIdioma];
        // Só adiciona se o nome for válido e não a string "N/A".
        if (nomeNesteIdioma && nomeNesteIdioma !== "N/A") {
          // Usa o 'languageDisplayMap' para obter um nome de idioma amigável (ex: "Português").
          // Se o código do idioma não estiver no mapa, usa o próprio código em maiúsculas como fallback.
          const nomeAmigavelDoIdioma = languageDisplayMap[codigoIdioma] || codigoIdioma.toUpperCase();
          // Se o nome para um idioma for um array de nomes (ex: para Espanhol),
          // junta os nomes com uma vírgula e espaço. Senão, usa o nome como está.
          nomesComunsParaExibicao[nomeAmigavelDoIdioma] = Array.isArray(nomeNesteIdioma)
            ? nomeNesteIdioma.join(", ")
            : nomeNesteIdioma;
        }
      }
    }
  }

  // Função auxiliar interna para renderizar listas de itens (array de strings).
  // Usada para seções como "Ameaças", "Curiosidades".
  // 'items': o array de strings.
  // 'iconeDoItem': um emoji ou string para prefixar cada item.
  const renderizarListaDeItensSimples = (items, iconeDoItem = "🔹") => {
    // Se 'items' não for um array, ou estiver vazio, ou o único item for "N/A" ou uma string vazia,
    // consideramos que não há dados válidos para listar. Retornamos 'null' para que o
    // componente DetailSectionContent possa mostrar a mensagem de "Informação não disponível".
    if (!Array.isArray(items) || items.length === 0 || (items.length === 1 && (!items[0] || items[0] === "N/A"))) {
      return null;
    }
    // Se houver itens válidos, usamos '.map()' para transformar cada string do array em um elemento <li>.
    return (
      <ul className={styles.list}> {/* Aplica a classe CSS para estilização da lista. */}
        {items.map((item, index) => (
          // 'key={index}' é importante para o React identificar cada item da lista de forma eficiente.
          // Idealmente, se os itens tivessem IDs únicos, usaríamos esses IDs na key.
          // Usar o índice como key só é seguro se a lista não for reordenada ou itens não forem inseridos/removidos do meio.
          <li key={index} className={styles.listItem}>
            {iconeDoItem && ( // Se um ícone foi fornecido...
              <span className={styles.icon} role="img" aria-hidden="true">{iconeDoItem}</span> // ...renderiza o ícone.
            )}
            {item} {/* O texto do item da lista. */}
          </li>
        ))}
      </ul>
    );
  };

  // Função auxiliar interna para renderizar "listas de definição" (objetos chave-valor).
  // Usada para seções como "Classificação Taxonômica", "Ecologia".
  // 'dataObject': o objeto cujas propriedades queremos listar.
  const renderizarListaDeDefinicaoDetalhada = (dataObject) => {
    // Se 'dataObject' não for um objeto válido ou estiver vazio...
    if (!dataObject || typeof dataObject !== 'object' || Object.keys(dataObject).length === 0) {
      return null; // ...retornamos null, e DetailSectionContent mostrará a mensagem padrão.
    }
    // 'Object.entries(dataObject)' transforma o objeto em um array de pares [chave, valor].
    // Ex: { a: 1, b: 2 } se torna [ ['a', 1], ['b', 2] ].
    // Filtramos para manter apenas as entradas onde o valor é "significativo" (não nulo, não "N/A").
    const entradasValidasDoObjeto = Object.entries(dataObject).filter(
      ([chaveDaPropriedade, valorDaPropriedade]) => valorDaPropriedade && valorDaPropriedade !== "N/A"
    );

    if (entradasValidasDoObjeto.length === 0) {
      return null; // Se não houver entradas válidas após o filtro.
    }

    // Usamos <dl> (definition list) para semântica, embora a estilização seja controlada por classes.
    return (
      <dl className={styles.list}> {/* Reutiliza a classe .list para espaçamento entre os itens. */}
        {entradasValidasDoObjeto.map(([chave, valor]) => (
          // Cada par chave-valor é envolvido em uma <div> com a classe .listItem para estilo.
          <div key={chave} className={styles.listItem}>
            {/* <dt> (definition term) para a chave/nome da propriedade. */}
            <dt className={styles.definitionListDt}>
              {/* Formatamos a chave: trocamos '_' por espaço e capitalizamos a primeira letra de cada palavra. */}
              {chave.replace(/_/g, " ").replace(/\b\w/g, letra => letra.toUpperCase())}:
            </dt>
            {/* <dd> (definition description) para o valor da propriedade. */}
            <dd className={styles.definitionListDd}>{String(valor)}</dd> {/* Convertemos o valor para String para garantir. */}
          </div>
        ))}
      </dl>
    );
  };


  // --- G. RENDERIZAÇÃO FINAL DO COMPONENTE AnimalDetail ---
  return (
    // Fragmento React (<>...</>) para agrupar os elementos sem adicionar um nó <div> extra ao DOM.
    <>
      {/* O container principal da página de detalhes do animal. */}
      <article className={styles.detailContainer}>
        {/* Botão para Voltar à Lista:
            - onClick={onBack}: Chama a função 'onBack' (recebida via props do App.js)
                               quando o botão é clicado.
            - aria-label: Descreve a ação do botão para leitores de tela. */}
        <button onClick={onBack} className={styles.backButton} aria-label="Voltar para a lista de animais">
          ⬅️ Voltar à Lista
        </button>

        {/* Cabeçalho da Página de Detalhes:
            Contém o tazo que vira, nome do animal, status de extinção.
            A cor da borda inferior é definida dinamicamente via 'style' prop,
            usando a cor hexadecimal do status de extinção do animal. */}
        <header
          className={styles.detailHeader}
          style={{
            borderBottomColor: corDoStatusHex,
            borderBottomWidth: "5px",
            borderBottomStyle: "solid",
          }}
        >
          {/* Lógica para exibir o Tazo Interativo ou uma Imagem de Fallback */}
          {(tazoFrontUrl || tazoBackUrl) ? ( // Se existir imagem para frente OU verso do tazo...
            // Container do Tazo Interativo
            <div
              className={styles.headerTazoContainer} // Estilo base do container do tazo.
              // Eventos para controlar o estado 'tazoCabecalhoVirado':
              onMouseEnter={() => definirTazoCabecalhoVirado(true)} // Vira ao passar o mouse.
              onMouseLeave={() => definirTazoCabecalhoVirado(false)} // Desvira ao sair o mouse.
              onFocus={() => definirTazoCabecalhoVirado(true)} // Vira ao focar com Tab.
              onBlur={() => definirTazoCabecalhoVirado(false)} // Desvira ao perder o foco.
              // Eventos para abrir a imagem do tazo no lightbox:
              onClick={(evento) => {
                evento.stopPropagation(); // Evita que o clique propague para o <article> e feche o detalhe.
                const imagemAtualDoTazo = tazoCabecalhoVirado ? tazoBackUrl : tazoFrontUrl;
                if (imagemAtualDoTazo) {
                  abrirImagemNoLightbox(imagemAtualDoTazo);
                }
              }}
              onKeyDown={(evento) => {
                if (evento.key === 'Enter' || evento.key === ' ') {
                  evento.preventDefault(); // Previne comportamento padrão (ex: rolar com Espaço).
                  evento.stopPropagation();
                  const imagemAtualDoTazo = tazoCabecalhoVirado ? tazoBackUrl : tazoFrontUrl;
                  if (imagemAtualDoTazo) {
                    abrirImagemNoLightbox(imagemAtualDoTazo);
                  }
                }
              }}
              tabIndex="0" // Torna o tazo focável.
              role="button" // Indica que é interativo como um botão.
              aria-label={`Tazo de ${nomeComumPrincipal}, atualmente ${tazoCabecalhoVirado ? 'mostrando o verso' : 'mostrando a frente'}. Pressione Enter ou Espaço para ampliar a imagem visível.`}
              aria-pressed={tazoCabecalhoVirado} // Indica se o estado "virado" está ativo.
            >
              {/* Container Interno que efetivamente gira */}
              <div
                className={`${styles.headerTazoInner} ${
                  tazoCabecalhoVirado ? styles.headerTazoInnerFlipped : "" // Aplica a classe de giro se 'tazoCabecalhoVirado' for true.
                }`}
              >
                {/* Face Frontal do Tazo */}
                <div className={`${styles.headerTazoFace} ${styles.headerTazoFront}`}>
                  {tazoFrontUrl ? (
                    <img src={tazoFrontUrl} alt="" loading="lazy" onError={(e) => e.target.style.display = 'none'} />
                  ) : (
                    tazoBackUrl && <div className={styles.imagePlaceholder}>Frente do Tazo Indisponível</div>
                  )}
                </div>
                {/* Face do Verso do Tazo */}
                <div className={`${styles.headerTazoFace} ${styles.headerTazoBack}`}>
                  {tazoBackUrl ? (
                    <img src={tazoBackUrl} alt="" loading="lazy" onError={(e) => e.target.style.display = 'none'}/>
                  ) : (
                     tazoFrontUrl && <div className={styles.imagePlaceholder}>Verso do Tazo Indisponível</div>
                  )}
                </div>
              </div>
            </div>
          ) : imagensDaGaleria.length > 0 ? ( // SENÃO, se não houver tazo mas houver imagens na galeria...
            // Mostra a primeira imagem da galeria como imagem principal.
            <img
              src={imagensDaGaleria[0]}
              alt={`Foto principal de ${nomeComumPrincipal}`}
              className={`${styles.detailImageLarge} ${styles.galleryImageClickable}`}
              onClick={() => abrirImagemNoLightbox(imagensDaGaleria[0])}
              onError={(e) => { e.target.style.display = 'none'; }}
              loading="lazy"
              title="Clique para ampliar a imagem"
            />
          ) : ( // SENÃO, se não houver NENHUMA imagem (nem tazo, nem galeria)...
            // Mostra um placeholder genérico.
            <div className={styles.imagePlaceholder} style={{height: '200px', width: '100%', maxWidth: '300px', margin: '0 auto 1.5rem auto'}}>
              Nenhuma imagem principal disponível para {nomeComumPrincipal}.
            </div>
          )}

          {/* Nome Comum e Científico do Animal */}
          <h1 className={styles.animalNameTitle}>
            {nomeComumPrincipal}
            <span className={styles.scientificNameDetail}>
              (<em>{nomeCientificoPrincipal}</em>)
            </span>
          </h1>

          {/* Banner com o Status de Extinção */}
          <div className={styles.extinctionBanner} style={{ backgroundColor: corDoStatusHex }}>
            <h2>{categoriaExtincao} - {descricaoExtincao}</h2>
          </div>

          {/* Escala Visual dos Níveis de Extinção */}
          {/* Só renderiza a escala se 'escalaExtincao' for um array com itens. */}
          {escalaExtincao.length > 0 && (
            <div className={styles.extinctionScaleVisual}>
              {escalaExtincao.map((nivel) => (
                <div
                  key={get(nivel, "sigla", Math.random())} // Usa sigla como key, ou fallback aleatório se sigla faltar.
                  className={`${styles.scaleLevel} ${
                    get(nivel, "sigla") === categoriaExtincao ? styles.scaleLevelCurrent : "" // Destaca o nível atual.
                  }`}
                  style={{ backgroundColor: getExtinctionHexColor(get(nivel, "sigla")) }} // Cor de fundo para cada nível.
                  title={get(nivel, "descricao")} // Tooltip com a descrição completa do nível.
                >
                  {get(nivel, "sigla", "?")} {/* Sigla do nível (ex: LC, EN), ou "?" se faltar. */}
                </div>
              ))}
            </div>
          )}
        </header> {/* Fim do .detailHeader */}


        {/* --- SEÇÕES DE CONTEÚDO DETALHADO --- */}
        {/* Cada seção abaixo usa o componente auxiliar 'DetailSectionContent'
            para manter um padrão visual e de fallback para dados ausentes. */}

        <DetailSectionContent
          title="Outros Nomes Comuns"
          icon="🗣️" // Emoji de "cabeça falante"
          condition={Object.keys(nomesComunsParaExibicao).length > 0} // Só mostra se houver nomes em outros idiomas.
        >
          {renderizarListaDeDefinicaoDetalhada(nomesComunsParaExibicao)}
        </DetailSectionContent>

        <DetailSectionContent
          title="Galeria de Fotos Adicionais"
          icon="🖼️" // Emoji de "moldura com paisagem"
          condition={imagensDaGaleria.length > 0} // Só mostra se houver imagens na galeria.
        >
          <p className={styles.galleryHint}>
            Clique nas imagens abaixo para ampliar e navegar na galeria.
          </p>
          <div className={styles.galleryContainer}>
            {imagensDaGaleria.map((urlDaImagem, indice) => (
              <img
                key={`${urlDaImagem}-${indice}`} // Chave única para cada imagem.
                src={urlDaImagem}
                alt={`Foto ${indice + 1} de ${nomeComumPrincipal}`} // Texto alternativo descritivo.
                className={`${styles.galleryImage} ${styles.galleryImageClickable}`} // Classes para estilo e interatividade.
                onClick={() => abrirImagemNoLightbox(urlDaImagem)} // Ação de clique para abrir no lightbox.
                onError={(e) => { e.target.style.display = 'none'; }} // Oculta se a imagem falhar.
                loading="lazy" // Carregamento preguiçoso.
                title="Clique para ampliar esta imagem" // Dica ao passar o mouse.
              />
            ))}
          </div>
        </DetailSectionContent>

        <DetailSectionContent title="Classificação Científica (Taxonomia)" icon="👑">
          {renderizarListaDeDefinicaoDetalhada(get(animal, "classificacao_taxonomica", {}))}
        </DetailSectionContent>

        <DetailSectionContent title="Detalhes do Status de Conservação" icon="📊">
          <>
            {get(animal, "status_conservacao.categoria_global", "N/A") !== "N/A" && (
              <p><strong>Categoria Global (IUCN):</strong> {get(animal, "status_conservacao.categoria_global")}</p>
            )}
            {get(animal, "status_conservacao.tendencia_populacional", "N/A") !== "N/A" && (
              <p style={{ marginTop: "0.3rem" }}><strong>Tendência da População:</strong> {get(animal, "status_conservacao.tendencia_populacional")}</p>
            )}
            {get(animal, "status_conservacao.justificativa", "N/A") !== "N/A" && (
              <p className={styles.paragraphWithMargin} style={{ marginTop: "0.3rem" }}><strong>Justificativa do Status:</strong> {get(animal, "status_conservacao.justificativa")}</p>
            )}
            {/* Se todas as informações desta seção estiverem ausentes, o DetailSectionContent mostrará a mensagem padrão. */}
          </>
        </DetailSectionContent>

        {/* O Componente de Mapa, que recebe o objeto 'animal' para exibir sua distribuição. */}
        <MapComponent animal={animal} />

        <DetailSectionContent title="Habitat e Ecossistemas" icon="🌳">
          <>
            {get(animal, "habitat.descricao", "N/A") !== "N/A" && (
              <p className={styles.paragraphWithMargin}>{get(animal, "habitat.descricao")}</p>
            )}
            {/* Verifica se 'habitats_principais' é um array e tem itens antes de tentar renderizar. */}
            {Array.isArray(get(animal, "habitat.habitats_principais", [])) && get(animal, "habitat.habitats_principais", []).length > 0 && (
              <>
                <h3 className={styles.sectionSubtitle}>Principais Tipos de Habitat:</h3>
                {renderizarListaDeItensSimples(get(animal, "habitat.habitats_principais", []), "🏞️")}
              </>
            )}
            {/* Se não houver descrição nem habitats principais, DetailSectionContent mostrará "Informação não disponível". */}
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
            {get(animal, "acoes_conservacao.protecao_legal", "N/A") !== "N/A" && (
                <p><strong>Medidas de Proteção Legal:</strong> {get(animal, "acoes_conservacao.protecao_legal")}</p>
            )}
            {Array.isArray(get(animal, "acoes_conservacao.acoes_recomendadas", [])) && get(animal, "acoes_conservacao.acoes_recomendadas", []).length > 0 && (
              <>
                <h3 className={styles.sectionSubtitle} style={{marginTop: get(animal, "acoes_conservacao.protecao_legal", "N/A") !== "N/A" ? '1rem' : '0'}}>
                  Ações Recomendadas para Conservação:
                </h3>
                {renderizarListaDeItensSimples(get(animal, "acoes_conservacao.acoes_recomendadas", []), "✅")}
              </>
            )}
          </>
        </DetailSectionContent>

        <DetailSectionContent title="Curiosidades e Fatos Interessantes" icon="✨">
          {renderizarListaDeItensSimples(get(animal, "curiosidades", []), "💡")}
        </DetailSectionContent>

        <DetailSectionContent title="Fonte das Informações" icon="🔗">
          <div className={styles.sourceSection}>
            {get(animal, "fonte.citacao", "N/A") !== "N/A" && (
              <p><strong>Citação:</strong> {get(animal, "fonte.citacao")}</p>
            )}
            {/* Verifica se o link existe e não é apenas "N/A" */}
            {get(animal, "fonte.link") && get(animal, "fonte.link") !== "N/A" && (
              <p>
                <strong>Link da Fonte:</strong>{" "}
                <a href={get(animal, "fonte.link")} target="_blank" rel="noopener noreferrer">
                  Visitar fonte original <span aria-label="(abre em nova aba)">↗️</span>
                </a>
              </p>
            )}
          </div>
        </DetailSectionContent>
      </article> {/* Fim do .detailContainer */}


      {/* --- SEÇÃO DO LIGHTBOX (VISUALIZADOR DE IMAGEM AMPLIADA) --- */}
      {/* O lightbox só é renderizado se 'lightboxInfo.index' for diferente de -1
          E se houver imagens na lista 'lightboxInfo.images'. */}
      {lightboxInfo.index !== -1 && lightboxInfo.images.length > 0 && (
        // O backdrop é o fundo escuro que cobre a tela.
        // Clicar no backdrop chama 'fecharLightbox'.
        <div
          className={styles.lightboxBackdrop}
          onClick={fecharLightbox}
          role="dialog" // Semântica para leitores de tela.
          aria-modal="true" // Indica que o conteúdo por trás está inativo.
          aria-label={`Visualizador de imagem: ${nomeComumPrincipal}`} // Um rótulo geral para o diálogo.
        >
          {/* Wrapper do conteúdo do lightbox.
              Clicar DENTRO deste wrapper NÃO fecha o lightbox, graças a e.stopPropagation(). */}
          <div
            className={styles.lightboxContentWrapper}
            onClick={(e) => e.stopPropagation()} // Impede que o clique se propague para o backdrop.
          >
            {/* Botão "Anterior" (só aparece se houver mais de uma imagem para navegar) */}
            {lightboxInfo.images.length > 1 && (
              <button
                onClick={imagemAnteriorLightbox}
                className={`${styles.lightboxNavButton} ${styles.lightboxPrevButton}`}
                aria-label="Ver imagem anterior na galeria"
                title="Anterior (Seta Esquerda)"
              >
                &#10094; {/* Código HTML para seta esquerda (‹) */}
              </button>
            )}

            {/* Container da imagem ampliada */}
            <div className={styles.lightboxImageContainer}>
              <img
                src={lightboxInfo.images[lightboxInfo.index]} // A URL da imagem atual a ser exibida.
                alt={`Imagem ampliada ${lightboxInfo.index + 1} de ${lightboxInfo.images.length} do animal ${nomeComumPrincipal}`}
                className={styles.lightboxImage}
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
                &#10095; {/* Código HTML para seta direita (›) */}
              </button>
            )}

            {/* Botão para Fechar o Lightbox */}
            <button
              onClick={fecharLightbox}
              className={styles.lightboxCloseButton}
              aria-label="Fechar visualizador de imagem (Esc)"
              title="Fechar (Esc)"
            >
              &times; {/* Código HTML para o símbolo de multiplicação (X) */}
            </button>
          </div> {/* Fim do .lightboxContentWrapper */}
        </div> // Fim do .lightboxBackdrop
      )} {/* Fim da renderização condicional do Lightbox */}
    </> // Fim do Fragmento React
  );
}; // Fim do componente AnimalDetail

// Exporta o componente AnimalDetail para que possa ser usado no App.js.
export default AnimalDetail;