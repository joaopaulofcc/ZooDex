// Caminho: src/components/MapComponent.jsx

// =================================================================================================
// ARQUIVO: MapComponent.jsx
// PROPÓSITO: Este componente é responsável por exibir um mapa interativo mostrando
//            a distribuição geográfica de um animal, com marcadores nos países nativos.
//            Ele utiliza a biblioteca 'React-Leaflet', que é uma interface React
//            para a popular biblioteca de mapas 'Leaflet.js'.
//
// CONCEITOS PRINCIPAIS DO REACT E BIBLIOTECAS EXTERNAS UTILIZADOS AQUI:
//  - Componentes Funcionais: A estrutura do nosso componente.
//  - Props: Recebe o objeto 'animal' do AnimalDetail.jsx para saber quais países exibir.
//  - useState: Para controlar qual país está destacado (quando o mouse passa sobre ele na lista).
//  - useEffect: Para lógica que precisa ser executada após a renderização ou quando
//               certas props/estados mudam (ex: verificar a API key, ajustar a visão do mapa).
//  - useRef: Para obter referências diretas a elementos do mapa (os marcadores),
//            embora no código original essa funcionalidade estivesse parcialmente comentada.
//  - React-Leaflet: Uma biblioteca externa. Aprenderemos a importar e usar seus componentes
//                   como <MapContainer>, <TileLayer>, <Marker>, <Popup>, e o hook 'useMap'.
//  - Leaflet.js (implícito): A biblioteca JavaScript subjacente que o React-Leaflet utiliza.
//  - Variáveis de Ambiente: Como o código tenta acessar uma API Key para o serviço de mapas.
//  - Manipulação de Dados: Processar a lista de países nativos e buscar suas coordenadas.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS E FUNÇÕES ---

// Importamos React e os Hooks 'useEffect', 'useState', e 'useRef'.
import React, { useEffect, useState, useRef } from "react";

// Importamos os componentes e hooks da biblioteca React-Leaflet.
// - MapContainer: O componente principal que cria o container do mapa.
// - TileLayer: Define a camada de "azulejos" (as imagens que formam o mapa base).
// - Marker: Usado para colocar um marcador (pino) em uma localização específica.
// - Popup: Uma pequena caixa de informação que pode aparecer ao clicar em um marcador.
// - useMap: Um hook do React-Leaflet que dá acesso direto à instância do mapa Leaflet subjacente,
//           permitindo chamar métodos da API do Leaflet (como setView, fitBounds).
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Importamos o arquivo CSS principal do Leaflet.
// Sem ele, o mapa não será estilizado corretamente (controles podem sumir, etc.).
// É crucial garantir que este CSS seja carregado (geralmente no index.html ou importado aqui/App.js).
import "leaflet/dist/leaflet.css";

// Importamos a biblioteca Leaflet diretamente (L).
// Isso é necessário para algumas customizações, como criar ícones personalizados.
import L from "leaflet";

// Importamos nossa função utilitária 'get' para acessar dados do animal de forma segura.
import { get } from "../data/animalData"; // Certifique-se que o caminho está correto.

// Importamos o objeto 'countryCoordinates' que mapeia nomes de países para suas coordenadas [latitude, longitude].
import { countryCoordinates } from "../data/countryCoordinates"; // Certifique-se que o caminho está correto.

// Importamos os estilos CSS Module para este componente.
import styles from "./MapComponent.module.css";

// --- 2. CONFIGURAÇÃO DE ÍCONES PERSONALIZADOS PARA MARCADORES (Leaflet) ---
// O Leaflet usa ícones para os marcadores. Podemos usar os padrões ou criar os nossos.
// Aqui, definimos dois ícones: um padrão e um para quando um país está "destacado".

// Ícone Padrão do Marcador (azul, fornecido pelo Leaflet)
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", // URL da imagem do ícone.
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", // URL para telas de alta resolução.
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", // URL da sombra do ícone.
  iconSize: [25, 41], // Tamanho do ícone em pixels [largura, altura].
  iconAnchor: [12, 41], // Ponto do ícone que corresponderá à coordenada do marcador (ponta inferior do pino).
  popupAnchor: [1, -34], // Ponto a partir do qual o popup deve abrir, relativo ao iconAnchor.
  shadowSize: [41, 41], // Tamanho da sombra.
});

// Ícone para Marcador Destacado (vermelho)
// Usamos um ícone vermelho de um repositório público para diferenciar.
const highlightedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// --- 3. COMPONENTE AUXILIAR INTERNO: ChangeView ---
// Este componente é um "truque" comum com React-Leaflet para controlar programaticamente
// a visão do mapa (centro, zoom, ou ajustar aos limites dos marcadores)
// em resposta a mudanças nas props.
// O <MapContainer> só define a visão inicial. Para mudá-la dinamicamente, precisamos de algo assim.
//
// Props que este componente espera:
//  - center: Um array [latitude, longitude] para centralizar o mapa.
//  - zoom: Um número para o nível de zoom.
//  - bounds: Um objeto L.LatLngBounds (do Leaflet) que define uma área retangular.
//            Se fornecido, o mapa tentará se ajustar para mostrar todos os pontos dentro desses limites.
const ChangeView = ({ center, zoom, bounds }) => {
  // O hook 'useMap()' nos dá acesso à instância do mapa Leaflet.
  const map = useMap();

  // Usamos 'useEffect' para aplicar as mudanças na visão do mapa.
  // Este efeito será executado sempre que 'center', 'zoom', 'bounds', ou 'map' mudarem.
  useEffect(() => {
    if (bounds && bounds.isValid && bounds.isValid()) {
      // Se 'bounds' (limites) for fornecido e for válido (contém pontos válidos)...
      // ...usamos 'map.fitBounds()' para ajustar a visão do mapa para mostrar todos os marcadores.
      // 'padding: [50, 50]' adiciona um preenchimento de 50px ao redor dos limites,
      // para que os marcadores não fiquem colados nas bordas do mapa.
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (
      center &&
      typeof center[0] === "number" &&
      typeof center[1] === "number"
    ) {
      // Senão, se 'center' for fornecido e for uma coordenada válida...
      // ...usamos 'map.setView()' para centralizar o mapa no 'center' com o 'zoom' especificado.
      map.setView(center, zoom);
    }
    // Se nem 'bounds' nem 'center' válidos forem fornecidos, a visão do mapa não é alterada por este componente.
  }, [center, zoom, bounds, map]); // Array de dependências do useEffect.

  return null; // Este componente não renderiza nada visualmente no DOM. Ele apenas interage com o mapa.
};

// --- 4. DEFINIÇÃO DO COMPONENTE PRINCIPAL 'MapComponent' ---
// Recebe o objeto 'animal' como prop para acessar sua lista de países nativos.
const MapComponent = ({ animal }) => {
  // --- A. VALORES PADRÃO PARA O MAPA ---
  // Usados se não pudermos calcular um centro/zoom específico com base nos marcadores.
  const centroPadraoDoMapa = [-10, -55]; // Centro aproximado da América do Sul.
  const zoomPadraoDoMapa = 3; // Nível de zoom inicial.

  // --- B. ESTADO DO COMPONENTE ---
  // 'paisDestacado' armazena o nome base do país que está atualmente destacado
  // (ex: quando o mouse passa sobre o nome do país na lista abaixo do mapa).
  // Começa como 'null' (nenhum país destacado).
  const [paisDestacado, definirPaisDestacado] = useState(null);

  // 'useRef' para armazenar referências aos elementos dos marcadores do mapa.
  // 'markerRefs.current' será um objeto onde as chaves são nomes de países e os valores
  // são as instâncias dos marcadores Leaflet.
  // No código original, o uso disso para abrir popups estava comentado.
  // Vamos mantê-lo para fins didáticos, mostrando como se pode acessar elementos do mapa.
  const markerRefs = useRef({}); // Inicializa como um objeto vazio.

  // --- C. ACESSO À API KEY DO MAPTILER ---
  // IMPORTANTE: Esta chave é necessária para usar os mapas do MapTiler.
  // 'process.env.REACT_APP_MAPTILER_API_KEY' tenta ler a chave de uma variável de ambiente.
  // Em projetos criados com Create React App, variáveis de ambiente devem começar com REACT_APP_.
  // Para projetos com Vite, seria 'import.meta.env.VITE_MAPTILER_API_KEY'.
  // É crucial que esta chave NÃO seja colocada diretamente no código e versionada no Git.
  // Ela deve estar em um arquivo .env (que é ignorado pelo Git) na raiz do projeto.
  // Exemplo de conteúdo do arquivo .env:
  // REACT_APP_MAPTILER_API_KEY=sua_chave_aqui
  const maptilerApiKey = process.env.REACT_APP_MAPTILER_API_KEY;

  // Este useEffect roda uma vez após a montagem do componente para verificar a API Key.
  useEffect(() => {
    if (!maptilerApiKey) {
      console.warn(
        "MapComponent: Chave da API do MapTiler não configurada! O mapa pode não funcionar ou usar um provedor alternativo." +
          " Verifique suas variáveis de ambiente (ex: REACT_APP_MAPTILER_API_KEY em um arquivo .env)." +
          " Para testes ou aprendizado, você pode usar um TileLayer gratuito, como o do OpenStreetMap."
      );
    }
  }, [maptilerApiKey]); // Dependência: maptilerApiKey (embora constante, é boa prática listar se usada no efeito).

  // --- D. VERIFICAÇÃO INICIAL E PREPARAÇÃO DOS DADOS DO MAPA ---

  // Se, por algum motivo, os dados do 'animal' não forem fornecidos,
  // renderizamos uma mensagem de erro e não tentamos mostrar o mapa.
  if (!animal) {
    return (
      <p className="error-message">
        Dados do animal não disponíveis para exibir o mapa de distribuição.
      </p>
    );
  }

  // Se a API Key não estiver disponível, podemos optar por mostrar uma mensagem de erro de configuração
  // ou tentar usar um mapa alternativo (veja sugestão no console.warn acima).
  // Para esta versão didática, vamos mostrar uma mensagem clara se a chave estiver faltando.
  if (!maptilerApiKey) {
    return (
      <section className={styles.mapSectionContainer}>
        <h2 className={styles.sectionTitle}>
          <span role="img" aria-label="Ícone de Mapa">
            🗺️
          </span>
          Distribuição Geográfica e Países Nativos
        </h2>
        <div
          className={styles.mapContainerWrapper}
          style={{
            textAlign: "center",
            padding: "20px",
            border: "1px dashed red",
          }}
        >
          <p style={{ color: "red", fontWeight: "bold", marginBottom: "10px" }}>
            ⚠️ Erro de Configuração do Mapa ⚠️
          </p>
          <p className={styles.textMuted}>
            A chave da API para o serviço de mapas (MapTiler) não foi
            encontrada. Por favor, verifique as configurações do projeto
            (arquivo <code>.env</code>) ou contate o administrador.
          </p>
          <p className={styles.textMuted} style={{ marginTop: "10px" }}>
            Como alternativa para desenvolvimento, você pode usar o TileLayer
            padrão do OpenStreetMap comentando a URL do MapTiler e descomentando
            a URL do OpenStreetMap no código deste componente.
          </p>
        </div>
      </section>
    );
  }

  // Extrai o nome comum do animal para usar em mensagens ou títulos.
  const nomeComumDoAnimal = get(
    animal,
    "nome_comum.pt",
    get(animal, "nome_cientifico")
  );
  // Pega a lista de países nativos do animal. Espera-se que seja um array de strings.
  const listaDePaisesNativos = get(animal, "distribuicao.paises_nativos", []);

  // Função auxiliar para extrair o nome base do país (remove detalhes em parênteses).
  // Ex: "Estados Unidos (Arizona, Texas)" -> "Estados Unidos"
  const obterNomeBaseDoPais = (nomeCompletoDoPais) => {
    const indiceParenteses = nomeCompletoDoPais.indexOf("(");
    if (indiceParenteses !== -1) {
      return nomeCompletoDoPais.substring(0, indiceParenteses).trim();
    }
    return nomeCompletoDoPais.trim();
  };

  // Processa a lista de países nativos para criar os marcadores do mapa:
  // Para cada nome de país na lista, busca suas coordenadas no nosso objeto 'countryCoordinates'.
  const marcadoresDosPaisesNativos = listaDePaisesNativos
    .map((nomeDoPaisNoArray) => {
      // Obtém o nome base para consulta no objeto de coordenadas.
      const nomeBaseDoPais = obterNomeBaseDoPais(nomeDoPaisNoArray);
      // Busca as coordenadas [latitude, longitude] para este nome base.
      const coordenadas = countryCoordinates[nomeBaseDoPais];

      if (coordenadas && coordenadas.length === 2) {
        // Se as coordenadas foram encontradas e são válidas (um array com 2 números)...
        return {
          name: nomeDoPaisNoArray, // Nome completo do país (pode ter detalhes em parênteses).
          position: coordenadas, // Array [latitude, longitude].
          baseName: nomeBaseDoPais, // Nome base, usado como chave para o estado 'paisDestacado'.
        };
      } else {
        // Se as coordenadas não foram encontradas, registra um aviso no console.
        console.warn(
          `MapComponent: Coordenadas não encontradas para o país "${nomeBaseDoPais}" (nome original: "${nomeDoPaisNoArray}"). Este país não será marcado no mapa.`
        );
        return null; // Retorna null para este país, será filtrado depois.
      }
    })
    .filter((marker) => marker !== null); // Remove os itens nulos (países sem coordenadas).

  // Calcula os limites (bounds) do mapa para ajustar a visão e mostrar todos os marcadores.
  // 'bounds' será um objeto L.LatLngBounds do Leaflet.
  let boundsParaOMapa = null;
  if (marcadoresDosPaisesNativos.length > 0) {
    // Se houver marcadores, extrai todas as posições [lat, lng].
    const posicoesLatLng = marcadoresDosPaisesNativos.map(
      (marcador) => marcador.position
    );
    // Cria um objeto LatLngBounds que engloba todas essas posições.
    boundsParaOMapa = L.latLngBounds(posicoesLatLng);
  }

  // --- E. FUNÇÕES DE CALLBACK PARA INTERAÇÃO (Lista de Países) ---

  // Chamada quando o mouse entra na área de um item da lista de países.
  const lidarComMouseEnterNoPaisDaLista = (nomeDoPais) => {
    const nomeBase = obterNomeBaseDoPais(nomeDoPais);
    definirPaisDestacado(nomeBase); // Define o estado para destacar o marcador correspondente no mapa.

    // Lógica opcional (originalmente comentada) para abrir o popup do marcador:
    // const markerInstance = markerRefs.current[nomeBase];
    // if (markerInstance) {
    //   markerInstance.openPopup();
    // }
  };

  // Chamada quando o mouse sai da área de um item da lista de países.
  const lidarComMouseLeaveDoPaisDaLista = () => {
    definirPaisDestacado(null); // Limpa o estado, nenhum país destacado.
    // Poderia fechar popups aqui também, se a lógica acima fosse usada.
  };

  // --- F. RENDERIZAÇÃO DO COMPONENTE MapComponent ---
  return (
    <section className={styles.mapSectionContainer}>
      <h2 className={styles.sectionTitle}>
        <span role="img" aria-label="Ícone de Globo Terrestre">
          🌍
        </span>{" "}
        {/* Melhor que mapa simples para distribuição */}
        Distribuição Geográfica e Países Nativos de {nomeComumDoAnimal}
      </h2>
      <p className={styles.mapIntroText}>
        O mapa abaixo destaca os países onde esta espécie pode ser encontrada
        naturalmente. Passe o mouse sobre os nomes dos países na lista para
        destacar o marcador no mapa.
      </p>
      <div className={styles.mapContainerWrapper}>
        {/* Container onde o mapa Leaflet será renderizado. */}
        <div className={styles.mapDisplay}>
          <MapContainer
            // 'key={animal.id_animal || animal.codigo}': FORÇA A RECRIAÇÃO do MapContainer
            // se o animal mudar. Isso é importante porque o MapContainer
            // não reage bem a mudanças dinâmicas de 'center' ou 'zoom' após a montagem inicial
            // sem usar truques como o componente ChangeView. Recriá-lo garante
            // que a visão inicial seja correta para o novo animal.
            key={get(animal, "id_animal", get(animal, "codigo", Math.random()))} // Fallback para chave aleatória se ID faltar.
            // Define o centro e zoom iniciais do mapa.
            // Se 'boundsParaOMapa' foi calculado, usa o centro desses limites.
            // Senão, usa os valores padrão.
            center={
              boundsParaOMapa && boundsParaOMapa.isValid()
                ? boundsParaOMapa.getCenter()
                : centroPadraoDoMapa
            }
            zoom={zoomPadraoDoMapa} // O zoom inicial é padrão; ChangeView pode ajustá-lo.
            scrollWheelZoom={true} // Permite zoom com a roda do mouse.
            style={{ height: "100%", width: "100%" }} // Faz o mapa ocupar todo o seu container.
            // placeholder={<p>Carregando mapa...</p>} // Opcional: um placeholder enquanto o mapa carrega.
          >
            {/* Componente para mudar a visão do mapa dinamicamente */}
            <ChangeView
              bounds={boundsParaOMapa}
              center={centroPadraoDoMapa} // Passa o centro padrão como fallback para ChangeView
              zoom={zoomPadraoDoMapa} // Passa o zoom padrão
            />

            {/* Camada de "Azulejos" (Tile Layer) - O mapa base visual. */}
            {/* USA A CHAVE DO MAPTILER: */}
            <TileLayer
              url={`https://api.maptiler.com/maps/aquarelle/{z}/{x}/{y}.png?key=${maptilerApiKey}`} // Estilo "aquarelle"
              // Outras opções de estilo do MapTiler:
              // `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerApiKey}`
              // `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpeg?key=${maptilerApiKey}` (satélite com rótulos)
              attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            />
            {/*
              ALTERNATIVA GRATUITA (SEM API KEY) - OpenStreetMap:
              Descomente a linha abaixo e comente a de cima se não tiver uma API Key do MapTiler.
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            */}

            {/* Renderiza um Marcador (<Marker>) para cada país nativo. */}
            {marcadoresDosPaisesNativos.map(({ name, position, baseName }) => (
              <Marker
                key={baseName} // Chave única para cada marcador.
                position={position} // Coordenadas [latitude, longitude].
                // Define o ícone do marcador: se o país estiver destacado, usa 'highlightedIcon', senão 'defaultIcon'.
                icon={
                  paisDestacado === baseName ? highlightedIcon : defaultIcon
                }
                // Guarda uma referência à instância do marcador Leaflet (opcional, para interações avançadas).
                ref={(el) => {
                  // 'el' é a instância do marcador Leaflet.
                  // Armazenamos no objeto markerRefs.current, usando o nome base do país como chave.
                  if (el) {
                    markerRefs.current[baseName] = el;
                  }
                }}
                // Eventos para o marcador (opcional):
                // eventHandlers={{
                //   mouseover: () => {
                //     definirPaisDestacado(baseName); // Destaca o país na lista ao passar o mouse no marcador.
                //     // markerRefs.current[baseName]?.openPopup(); // Abre o popup
                //   },
                //   mouseout: () => {
                //     definirPaisDestacado(null);
                //     // markerRefs.current[baseName]?.closePopup(); // Fecha o popup
                //   },
                //   // click: () => { /* Alguma ação ao clicar no marcador */ }
                // }}
              >
                {/* Popup que aparece ao clicar no marcador. */}
                <Popup>{name}</Popup>{" "}
                {/* Mostra o nome completo do país no popup. */}
              </Marker>
            ))}
          </MapContainer>
        </div>{" "}
        {/* Fim de .mapDisplay */}
        {/* Lista de Países Nativos (renderizada abaixo do mapa). */}
        <div className={styles.countryListFallback}>
          <h3 className={styles.countryListTitle}>
            Países onde o {nomeComumDoAnimal} é nativo:
          </h3>
          {/* Verifica se há países na lista para exibir. */}
          {Array.isArray(listaDePaisesNativos) &&
          listaDePaisesNativos.length > 0 ? (
            <ul className={styles.countryList}>
              {listaDePaisesNativos.map((nomeDoPais) => {
                const nomeBase = obterNomeBaseDoPais(nomeDoPais);
                return (
                  <li
                    key={nomeDoPais} // Usa o nome completo como chave (deve ser único na lista).
                    // Aplica a classe de destaque se este país for o 'paisDestacado' no estado.
                    className={`${styles.countryListItem} ${
                      paisDestacado === nomeBase
                        ? styles.countryListItemHighlighted
                        : ""
                    }`}
                    // Eventos para interatividade com o mapa.
                    onMouseEnter={() =>
                      lidarComMouseEnterNoPaisDaLista(nomeDoPais)
                    }
                    onMouseLeave={lidarComMouseLeaveDoPaisDaLista}
                    // Opcional: onClick para centralizar o mapa no país ou algo similar.
                    // onClick={() => {
                    //   const markerInfo = marcadoresDosPaisesNativos.find(m => m.baseName === nomeBase);
                    //   if (markerInfo && markerRefs.current[nomeBase]) {
                    //     const map = markerRefs.current[nomeBase]._map; // Acesso à instância do mapa (requer cuidado)
                    //     if(map) map.setView(markerInfo.position, 5); // Exemplo: centraliza e define zoom
                    //   }
                    // }}
                  >
                    {nomeDoPais}
                  </li>
                );
              })}
            </ul>
          ) : (
            // Mensagem se a lista de países nativos estiver vazia ou não disponível.
            <p className={styles.textMuted}>
              Informações sobre os países nativos não disponíveis para esta
              espécie.
            </p>
          )}
        </div>{" "}
        {/* Fim de .countryListFallback */}
      </div>{" "}
      {/* Fim de .mapContainerWrapper */}
    </section> // Fim de .mapSectionContainer
  );
};

export default MapComponent;
