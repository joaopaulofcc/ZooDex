// Caminho: src/data/countryCoordinates.js

// =================================================================================================
// ARQUIVO: countryCoordinates.js
// PROPÓSITO: Este arquivo define e exporta um objeto JavaScript chamado 'countryCoordinates'.
//            Este objeto funciona como um grande "dicionário" ou "tabela de consulta"
//            onde:
//              - As CHAVES são strings contendo os nomes dos países (em português).
//              - Os VALORES são arrays de dois números, representando as coordenadas
//                geográficas aproximadas do centro de cada país: [latitude, longitude].
//
//            Estes dados são utilizados pelo componente 'MapComponent.jsx' para saber
//            onde posicionar os marcadores (pins) no mapa para cada país listado
//            na distribuição de um animal.
//
// CONCEITOS DE JAVASCRIPT DEMONSTRADOS AQUI:
//  - Objetos JavaScript: A estrutura fundamental usada para armazenar os dados (coleção de pares chave-valor).
//  - Strings: Usadas como chaves (nomes dos países).
//  - Arrays: Usados como valores (contendo a latitude e a longitude).
//  - Números: Usados para os valores de latitude e longitude.
//  - Exportação de Módulos ES6: A palavra-chave 'export' torna o objeto 'countryCoordinates'
//                              disponível para ser importado em outros arquivos (como MapComponent.jsx).
//
// NOTA SOBRE AS COORDENADAS:
//  - Latitude: Mede a distância ao norte ou ao sul da linha do Equador.
//              Valores positivos são para o Norte, negativos para o Sul.
//              Varia de -90° (Polo Sul) a +90° (Polo Norte).
//  - Longitude: Mede a distância a leste ou a oeste do Meridiano de Greenwich.
//               Valores positivos são para Leste, negativos para Oeste.
//               Varia de -180° a +180°.
//  - As coordenadas aqui são aproximadas e geralmente se referem a um ponto central
//    ou à capital do país. Para mapas detalhados de distribuição de espécies,
//    dados mais precisos (como polígonos de ocorrência) seriam usados.
// =================================================================================================

// A palavra-chave 'export' torna a constante 'countryCoordinates'
// disponível para ser importada em outros arquivos JavaScript usando a sintaxe de importação de módulos ES6.
// Exemplo de importação em outro arquivo:
//   import { countryCoordinates } from './countryCoordinates';
//
// 'const' declara uma variável cujo valor não pode ser reatribuído após a inicialização.
// Neste caso, 'countryCoordinates' é um grande objeto.
export const countryCoordinates = {
  // Cada entrada no objeto é um par chave-valor:
  //   "NomeDoPaís": [latitude, longitude],
  //
  // A chave (ex: "Afeganistão") é uma string. É importante que os nomes dos países aqui
  // correspondam EXATAMENTE aos nomes dos países usados nos dados dos animais
  // (em `animalData.js`, na propriedade `distribuicao.paises_nativos`),
  // ou que haja uma lógica no MapComponent.jsx para normalizar os nomes antes da consulta.
  //
  // O valor (ex: [33, 65]) é um array com dois números:
  //   - O primeiro número é a LATITUDE.
  //   - O segundo número é a LONGITUDE.

  Afeganistão: [33, 65], // Latitude: 33° Norte, Longitude: 65° Leste
  Albânia: [41, 20],
  Alemanha: [51, 9],
  Alândia: [60.116667, 19.9],
  Andorra: [42.5, 1.5],
  Angola: [-12.5, 18.5],
  Anguilla: [18.25, -63.16666666],
  Antártida: [-90, 0],
  "Antígua e Barbuda": [17.05, -61.8],
  Argentina: [-34, -64],
  Argélia: [28, 3],
  Arménia: [40, 45],
  Aruba: [12.5, -69.96666666],
  "Arábia Saudita": [25, 45],
  Austrália: [-27, 133],
  Azerbeijão: [40.5, 47.5],
  Bahamas: [24.25, -76],
  Bahrein: [26, 50.55],
  Bangladesh: [24, 90],
  Barbados: [13.16666666, -59.53333333],
  Belize: [17.25, -88.75],
  Benin: [9.5, 2.25],
  Bermudas: [32.33333333, -64.75],
  Bielorússia: [53, 28],
  Bolívia: [-17, -65],
  Botswana: [-22, 24],
  Brasil: [-10, -55],
  Brunei: [4.5, 114.66666666],
  Bulgária: [43, 25],
  "Burkina Faso": [13, -2],
  Burundi: [-3.5, 30],
  Butão: [27.5, 90.5],
  Bélgica: [50.83333333, 4],
  "Bósnia e Herzegovina": [44, 18],
  "Cabo Verde": [16, -24],
  Camarões: [6, 12],
  Camboja: [13, 105],
  Canadá: [60, -95],
  Catar: [25.5, 51.25],
  Cazaquistão: [48, 68],
  Chade: [15, 19],
  Chile: [-30, -71],
  China: [35, 105],
  Chipre: [35, 33],
  Chéquia: [49.75, 15.5],
  "Cidade do Vaticano": [41.9, 12.45],
  Colômbia: [4, -72],
  Comores: [-12.16666666, 44.25],
  Congo: [-1, 15],
  "Coreia do Norte": [40, 127],
  "Coreia do Sul": [37, 127.5],
  "Costa Rica": [10, -84],
  "Costa do Marfim": [8, -5],
  Croácia: [45.16666666, 15.5],
  Cuba: [21.5, -80],
  Dinamarca: [56, 10],
  Djibouti: [11.5, 43],
  Dominica: [15.41666666, -61.33333333],
  Egito: [27, 30],
  "El Salvador": [13.83333333, -88.91666666],
  "Emirados Árabes Unidos": [24, 54],
  Equador: [-2, -77.5],
  Eritreia: [15, 39],
  Eslováquia: [48.66666666, 19.5],
  Eslovénia: [46.11666666, 14.81666666],
  Espanha: [40, -4],
  Essuatíni: [-26.5, 31.5],
  "Estados Unidos": [38, -97],
  Estónia: [59, 26],
  Etiópia: [8, 38],
  Fiji: [-18, 175],
  Filipinas: [13, 122],
  Finlândia: [64, 26],
  França: [46, 2],
  Gabão: [-1, 11.75],
  Gana: [8, -2],
  Geórgia: [42, 43.5],
  Gibraltar: [36.13333333, -5.35],
  Granada: [12.11666666, -61.66666666],
  Gronelândia: [72, -40],
  Grécia: [39, 22],
  Guadalupe: [16.25, -61.583333],
  Guam: [13.46666666, 144.78333333],
  Guatemala: [15.5, -90.25],
  Guernsey: [49.46666666, -2.58333333],
  Guiana: [5, -59],
  "Guiana Francesa": [4, -53],
  Guiné: [11, -10],
  "Guiné Equatorial": [2, 10],
  "Guiné-Bissau": [12, -15],
  Gâmbia: [13.46666666, -16.56666666],
  Haiti: [19, -72.41666666],
  Holanda: [52.5, 5.75],
  Honduras: [15, -86.5],
  "Hong Kong": [22.267, 114.188],
  Hungria: [47, 20],
  "Ilha Bouvet": [-54.43333333, 3.4],
  "Ilha Formosa": [23.5, 121],
  "Ilha Heard e Ilhas McDonald": [-53.1, 72.51666666],
  "Ilha Norfolk": [-29.03333333, 167.95],
  "Ilha de Man": [54.25, -4.5],
  "Ilha do Natal": [-10.5, 105.66666666],
  "Ilhas Caimão": [19.5, -80.5],
  "Ilhas Cocos (Keeling)": [-12.5, 96.83333333],
  "Ilhas Cook": [-21.23333333, -159.76666666],
  "Ilhas Faroé": [62, -7],
  "Ilhas Geórgia do Sul e Sandwich do Sul": [-54.5, -37],
  "Ilhas Malvinas": [-51.75, -59],
  "Ilhas Marshall": [9, 168],
  "Ilhas Menores Distantes dos Estados Unidos": [19.3, 166.633333],
  "Ilhas Pitcairn": [-25.06666666, -130.1],
  "Ilhas Salomão": [-8, 159],
  "Ilhas Svalbard e Jan Mayen": [78, 20],
  "Ilhas Turks e Caicos": [21.75, -71.58333333],
  "Ilhas Virgens": [18.431383, -64.62305],
  "Ilhas Virgens dos Estados Unidos": [18.35, -64.933333],
  Indonésia: [-5, 120],
  Iraque: [33, 44],
  Irlanda: [53, -8],
  Irão: [32, 53],
  Islândia: [65, -18],
  Israel: [31.47, 35.13],
  Itália: [42.83333333, 12.83333333],
  Iémen: [15, 48],
  Jamaica: [18.25, -77.5],
  Japão: [36, 138],
  Jersey: [49.25, -2.16666666],
  Jordânia: [31, 36],
  Kiribati: [1.41666666, 173],
  Kosovo: [42.666667, 21.166667],
  Kuwait: [29.5, 45.75],
  Laos: [18, 105],
  Lesoto: [-29.5, 28.5],
  Letónia: [57, 25],
  Libéria: [6.5, -9.5],
  Liechtenstein: [47.26666666, 9.53333333],
  Lituânia: [56, 24],
  Luxemburgo: [49.75, 6.16666666],
  Líbano: [33.83333333, 35.83333333],
  Líbia: [25, 17],
  Macau: [22.16666666, 113.55],
  "Macedónia do Norte": [41.83333333, 22],
  Madagáscar: [-20, 47],
  Malawi: [-13.5, 34],
  Maldivas: [3.25, 73],
  Mali: [17, -4],
  Malta: [35.83333333, 14.58333333],
  Malásia: [2.5, 112.5],
  "Marianas Setentrionais": [15.2, 145.75],
  Marrocos: [32, -5],
  Martinica: [14.666667, -61],
  Mauritânia: [20, -12],
  Maurício: [-20.28333333, 57.55],
  Mayotte: [-12.83333333, 45.16666666],
  Micronésia: [6.91666666, 158.25],
  Moldávia: [47, 29],
  Mongólia: [46, 105],
  Montenegro: [42.5, 19.3],
  Montserrat: [16.75, -62.2],
  Moçambique: [-18.25, 35],
  Myanmar: [22, 98],
  México: [23, -102],
  Mónaco: [43.73333333, 7.4],
  Namíbia: [-22, 17],
  Nauru: [-0.53333333, 166.91666666],
  Nepal: [28, 84],
  Nicarágua: [13, -85],
  Nigéria: [10, 8],
  Niue: [-19.03333333, -169.86666666],
  Noruega: [62, 10],
  "Nova Caledónia": [-21.5, 165.5],
  "Nova Zelândia": [-41, 174],
  Níger: [16, 8],
  Omã: [21, 57],
  Palau: [7.5, 134.5],
  Palestina: [31.9, 35.2],
  Panamá: [9, -80],
  "Papua Nova Guiné": [-6, 147],
  Paquistão: [30, 70],
  Paraguai: [-23, -58],
  "Países Baixos Caribenhos": [12.18, -68.25],
  Perú: [-10, -76],
  "Polinésia Francesa": [-15, -140],
  Polónia: [52, 20],
  "Porto Rico": [18.25, -66.5],
  Portugal: [39.5, -8],
  Quirguistão: [41, 75],
  Quénia: [1, 38],
  "Reino Unido": [54, -2],
  "República Centro-Africana": [7, 21],
  "República Democrática do Congo": [0, 25],
  "República Dominicana": [19, -70.66666666],
  Reunião: [-21.15, 55.5],
  Roménia: [46, 25],
  Ruanda: [-2, 30],
  Rússia: [60, 100],
  "Saara Ocidental": [24.5, -13],
  "Saint-Pierre e Miquelon": [46.83333333, -56.33333333],
  Samoa: [-13.58333333, -172.33333333],
  "Samoa Americana": [-14.33333333, -170],
  "San Marino": [43.76666666, 12.41666666],
  "Santa Helena, Ascensão e Tristão da Cunha": [-15.95, -5.72],
  "Santa Lúcia": [13.88333333, -60.96666666],
  Seicheles: [-4.58333333, 55.66666666],
  Senegal: [14, -14],
  "Serra Leoa": [8.5, -11.5],
  Singapura: [1.36666666, 103.8],
  Somália: [10, 49],
  "Sri Lanka": [7, 81],
  Sudão: [15, 30],
  "Sudão do Sul": [7, 30],
  Suriname: [4, -56],
  Suécia: [62, 15],
  Suíça: [47, 8],
  "São Bartolomeu": [18.5, -63.41666666],
  "São Cristóvão e Nevis": [17.33333333, -62.75],
  "São Martinho": [18.033333, -63.05],
  "São Tomé e Príncipe": [1, 7],
  "São Vincente e Granadinas": [13.25, -61.2],
  Sérvia: [44, 21],
  Síria: [35, 38],
  Tailândia: [15, 100],
  Tajiquistão: [39, 71],
  Tanzânia: [-6, 35],
  "Terras Austrais e Antárticas Francesas": [-49.25, 69.167],
  "Território Britânico do Oceano Índico": [-6, 71.5],
  "Timor-Leste": [-8.83333333, 125.91666666],
  Togo: [8, 1.16666666],
  Tokelau: [-9, -172],
  Tonga: [-20, -175],
  "Trinidade e Tobago": [11, -61],
  Tunísia: [34, 9],
  Turquemenistão: [40, 60],
  Turquia: [39, 35],
  Tuvalu: [-8, 178],
  Ucrânia: [49, 32],
  Uganda: [1, 32],
  Uruguai: [-33, -56],
  Uzbequistão: [41, 64],
  Vanuatu: [-16, 167],
  Venezuela: [8, -66],
  Vietname: [16.16666666, 107.83333333],
  "Wallis e Futuna": [-13.3, -176.2],
  Zimbabwe: [-20, 30],
  Zâmbia: [-15, 30],
  "ilha da Curação": [12.116667, -68.933333],
  "África do Sul": [-29, 24],
  Áustria: [47.33333333, 13.33333333],
  Índia: [20, 77],

  // Adicionar mais países e suas coordenadas conforme necessário.
  // É importante manter esta lista atualizada e o mais completa possível
  // para que a funcionalidade do mapa seja precisa.

  // NOTA PARA OS ALUNOS:
  // Manter uma lista como esta pode ser trabalhoso. Em aplicações maiores ou
  // mais dinâmicas, as coordenadas de países poderiam vir de:
  //   - Uma API externa de geocodificação (que converte nomes de lugares em coordenadas).
  //   - Um banco de dados.
  //   - Arquivos de dados geográficos mais complexos (como GeoJSON).
  // Para este projeto educacional, uma lista estática como esta é suficiente e mais simples.
}; // Fim do objeto countryCoordinates

/* =================================================================================================
   COMO USAR ESTE ARQUIVO:

   1. Importe o objeto em outro arquivo JavaScript:
      `import { countryCoordinates } from './countryCoordinates';`

   2. Acesse as coordenadas de um país específico usando o nome do país como chave:
      `const coordenadasDoBrasil = countryCoordinates["Brasil"];`
      `// coordenadasDoBrasil será: [-10, -55]`

      `const coordenadasDaFranca = countryCoordinates.França;` // Notação de ponto também funciona se a chave for um identificador válido.
      `// coordenadasDaFranca será: [46, 2]`

   3. Se tentar acessar um país que não está na lista, o resultado será 'undefined'.
      `const coordenadasDeAtlantida = countryCoordinates["Atlântida"];`
      `// coordenadasDeAtlantida será: undefined`
      Por isso, o MapComponent.jsx deve verificar se as coordenadas foram encontradas antes de usá-las.

   ATENÇÃO:
   - A precisão dos nomes dos países é crucial. "Brasil" é diferente de "brasil" ou "Brazil".
   - A ordem [latitude, longitude] é uma convenção comum, mas sempre verifique a documentação
     da biblioteca de mapas que você está usando (Leaflet espera [latitude, longitude]).
   ================================================================================================= */
