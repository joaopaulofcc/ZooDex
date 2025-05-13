// Caminho: src/data/animalData.js

/*
  Este arquivo contém os dados brutos de todos os animais que serão exibidos na ZooDex,
  bem como algumas funções utilitárias para processar e acessar esses dados.

  Para um aprendizado inicial, pode ser útil começar com uma versão MUITO MENOR e SIMPLIFICADA
  destes dados diretamente em um componente, e depois introduzir este arquivo completo.
*/

// NOTA PARA O INSTRUTOR:
// O array 'allAnimalDataRaw' é muito grande para incluir diretamente aqui na resposta
// e para os alunos digitarem inicialmente. No seu projeto, você colaria o conteúdo
// da variável 'allAnimalDataRaw' do seu arquivo original aqui.
//
// Para demonstração e para que o código abaixo funcione conceitualmente,
// vou simular a estrutura com apenas alguns exemplos de animais.
// CERTIFIQUE-SE DE USAR SEUS DADOS COMPLETOS NO PROJETO REAL.
export const allAnimalDataRaw = [
  // Exemplo com Leopardus pardalis_com_imagens.json
  {
    codigo: 1,
    imagens: {
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732357/front_sqdtux.png",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732357/back_dhxxg1.png",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732357/foto_2_hahm4z.jpg",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732357/foto_1_rtyy1q.jpg",
    },
    nome_tazo: "Jaguatirica",
    nome_cientifico: "Leopardus pardalis",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Carnivora",
      familia: "Felidae",
    },
    nivel_extincao: {
      categoria: "LC",
      descricao: "Pouco Preocupante",
      indice_risco: 1, // LC:1, NT:2, VU:3, EN:4, CR:5, EW:6, EX:7, DD:0, NE:0
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: {
      pt: "Jaguatirica",
      en: "Ocelot",
      es: ["Gato Onza", "Manigordo", "Ocelote", "Tigrillo"],
    },
    status_conservacao: {
      categoria_global: "Pouco Preocupante",
      tendencia_populacional: "Decrescente",
      justificativa:
        "Espécie amplamente distribuída, mas enfrenta declínios locais devido à perda de habitat e caça.",
    },
    distribuicao: {
      descricao:
        "América do Norte (EUA, México), Central e do Sul, do norte da Argentina até o sul dos EUA.",
      paises_nativos: [
        "Argentina",
        "Belize",
        "Bolívia",
        "Brasil",
        "Colômbia",
        "Costa Rica",
        "Equador",
        "El Salvador",
        "Guiana Francesa",
        "Guatemala",
        "Guiana",
        "Honduras",
        "México",
        "Nicarágua",
        "Panamá",
        "Paraguai",
        "Peru",
        "Suriname",
        "Trinidad e Tobago",
        "Estados Unidos (Arizona, Texas)",
        "Uruguai",
        "Venezuela",
      ],
    },
    populacao: {
      densidade: "2.5 a 160 indivíduos/100 km²",
      ameacas_locais: {
        México: "Ameaçada",
        "EUA (Texas)": "50-80 indivíduos (Criticamente Ameaçada)",
        Argentina: "1.500-8.000 indivíduos (Vulnerável)",
      },
    },
    habitat: {
      descricao:
        "Florestas tropicais, manguezais, savanas e áreas de vegetação densa.",
      habitats_principais: [
        "Floresta Subtropical/Tropical Úmida de Baixada",
        "Floresta Subtropical/Tropical Seca",
        "Manguezais",
        "Savanas Úmidas e Secas",
      ],
    },
    ecologia: {
      dieta:
        "Pequenos mamíferos, aves, répteis e ocasionalmente presas maiores como macacos e tatus.",
      comportamento: "Noturno-crepuscular, solitário e territorial.",
      tamanho_medio: "11 kg",
      tamanho_ninhada: "1-4 filhotes (média 1.4)",
    },
    ameacas: [
      "Perda e fragmentação de habitat",
      "Caça ilegal por pele e comércio de animais de estimação",
      "Atropelamentos em estradas",
      "Conflitos com humanos por predação de aves domésticas",
      "Impactos da mineração e agropecuária",
    ],
    acoes_conservacao: {
      protecao_legal:
        "Protegida na maioria dos países (CITES Apêndice I). Caça proibida em 18 países.",
      acoes_recomendadas: [
        "Proteção de áreas naturais",
        "Restauração de habitats degradados",
        "Programas de reintrodução",
        "Fiscalização contra caça ilegal",
        "Educação ambiental",
      ],
    },
    curiosidades: [
      "É o felino mais comum nas florestas tropicais das Américas.",
      "Pode viver em altitudes de até 3.000 metros.",
    ],
    fonte: {
      citacao:
        "Paviolo, A., Crawshaw, P., Caso, A., de Oliveira, T., Lopez-Gonzalez, C.A., Kelly, M., De Angelo, C. & Payan, E. 2015.",
      link: "http://dx.doi.org/10.2305/IUCN.UK.2015-4.RLTS.T11509A50653476.en",
    },
  },
  {
    codigo: 2,
    imagens: {
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732409/back_x4duno.png",
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732408/front_czttyh.png",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732408/foto_1_maiuno.jpg",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746732408/foto_2_fduhwn.jpg",
    },
    nome_cientifico: "Panthera tigris",
    nome_tazo: "Tigre-Siberiano",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Carnivora",
      familia: "Felidae",
    },
    nivel_extincao: {
      categoria: "EN",
      descricao: "Em Perigo",
      indice_risco: 4,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: { pt: "Tigre", en: "Tiger", es: "Tigre" },
    status_conservacao: {
      categoria_global: "Em Perigo",
      tendencia_populacional: "Decrescente",
      justificativa:
        "População em declínio devido à perda de habitat e caça ilegal.",
    },
    distribuicao: {
      descricao:
        "Encontrado em florestas e pastagens da Ásia, incluindo Índia, Rússia e Sudeste Asiático.",
      paises_nativos: [
        "Índia",
        "Rússia",
        "Indonésia",
        "Malásia",
        "Tailândia",
        "Bangladesh",
        "Butão",
        "China",
        "Nepal",
      ],
    },
    populacao: {
      densidade: "N/A",
      ameacas_locais: {
        Índia: "Em Perigo",
        Rússia: "Vulnerável",
        Indonésia: "Criticamente em Perigo",
      },
    },
    habitat: {
      descricao: "Florestas tropicais, savanas e manguezais.",
      habitats_principais: ["Florestas tropicais", "Savanas", "Manguezais"],
    },
    ecologia: {
      dieta: "Carnívora, principalmente veados, javalis e outros mamíferos.",
      comportamento: "Solitary and territorial.",
      tamanho_medio: "2,5 a 3,9 metros (incluindo cauda), 90 a 310 kg",
      tamanho_ninhada: "2 a 4 filhotes",
    },
    ameacas: [
      "Perda de habitat devido ao desmatamento",
      "Caça ilegal para comércio de partes do corpo",
      "Conflitos com humanos",
      "Mudanças climáticas",
      "Doenças",
    ],
    acoes_conservacao: {
      protecao_legal: "Incluído no Apêndice I da CITES.",
      acoes_recomendadas: [
        "Proteção de habitats críticos",
        "Combate à caça ilegal",
        "Programas de reprodução em cativeiro",
        "Educação comunitária",
      ],
    },
    curiosidades: [
      "O tigre é o maior felino do mundo.",
      "Cada tigre tem um padrão único de listras, como uma impressão digital.",
    ],
    fonte: {
      citacao: "IUCN Red List of Threatened Species",
      link: "https://www.iucnredlist.org",
    },
  },
  {
    codigo: 3,
    imagens: {
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734365/foto_2_eknvmb.jpg",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734364/foto_1_xbzpif.jpg",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734364/back_jnftmk.png",
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734364/front_tsorsb.png",
    },
    nome_cientifico: "Gorilla gorilla",
    nome_tazo: "Gorila",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Primates",
      familia: "Hominidae",
    },
    nivel_extincao: {
      categoria: "CR",
      descricao: "Criticamente em Perigo",
      indice_risco: 5,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: {
      pt: "Gorila Ocidental",
      en: "Western Gorilla",
      es: "Gorila Occidental",
    },
    status_conservacao: {
      categoria_global: "Criticamente em Perigo",
      tendencia_populacional: "Decrescente",
      justificativa:
        "População diminuiu 19,4% entre 2005-2013 devido à caça ilegal e doenças como Ebola.",
    },
    distribuicao: {
      descricao:
        "Florestas da África Central, principalmente em áreas de baixada e pântanos.",
      paises_nativos: [
        "Angola (Cabinda)",
        "Camarões",
        "República Centro-Africana",
        "Congo",
        "Guiné Equatorial (continental)",
        "Gabão",
        "Nigéria",
      ],
    },
    populacao: {
      densidade: "N/A",
      ameacas_locais: {
        Gabão: "Perdeu mais da metade da população entre 1983-2000",
        "Nigéria/Camarões":
          "Subespécie Cross River tem apenas 250-300 indivíduos",
      },
    },
    habitat: {
      descricao:
        "Florestas tropicais úmidas, incluindo áreas alagadas e montanhas até 1.900m de altitude.",
      habitats_principais: [
        "Floresta Subtropical/Tropical Úmida de Baixada",
        "Floresta Subtropical/Tropical Alagada",
        "Floresta Subtropical/Tropical Úmida Montana",
      ],
    },
    ecologia: {
      dieta:
        "Frutas, folhas, brotos e ocasionalmente insetos (formigas e cupins).",
      comportamento:
        "Diurno, vive em grupos familiares liderados por um macho adulto (costas prateadas).",
      tamanho_medio: "Até 180 kg (machos adultos)",
      tamanho_ninhada: "1 filhote a cada 4-6 anos",
    },
    ameacas: [
      "Caça ilegal para carne de animais silvestres",
      "Surto de doenças como Ebola",
      "Perda de habitat por agricultura industrial (óleo de palma)",
      "Construção de estradas e mineração",
      "Mudanças climáticas afetando as florestas",
    ],
    acoes_conservacao: {
      protecao_legal:
        "Protegido por leis nacionais e internacionais (CITES Apêndice I).",
      acoes_recomendadas: [
        "Aumentar a fiscalização contra caça ilegal",
        "Planejamento de uso da terra para proteger habitats",
        "Monitoramento de doenças como Ebola",
        "Restabelecer corredores florestais entre populações isoladas",
        "Educação ambiental para comunidades locais",
      ],
    },
    curiosidades: [
      "São os maiores primatas vivos, compartilhando 98% do DNA com humanos.",
      "Constroem ninhos no chão ou em árvores para dormir cada noite.",
    ],
    fonte: {
      citacao:
        "Maisels, F., Bergl, R.A. & Williamson, E.A. 2018. Gorilla gorilla (amended version of 2016 assessment). The IUCN Red List of Threatened Species 2018.",
      link: "http://dx.doi.org/10.2305/IUCN.UK.2018-2.RLTS.T9404A136250858.en",
    },
  },
  {
    codigo: 4,
    imagens: {
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734483/front_m9dvbg.png",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734482/back_d505ql.png",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734482/foto_2_eazxer.jpg",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734481/foto_1_cq5pzn.jpg",
    },
    nome_cientifico: "Ursus arctos",
    nome_tazo: "Urso-marrom",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Carnivora",
      familia: "Ursidae",
    },
    nivel_extincao: {
      categoria: "LC",
      descricao: "Pouco Preocupante",
      indice_risco: 1,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: {
      pt: "Urso-pardo",
      en: "Brown Bear, Grizzly Bear",
      es: "Oso Pardo",
    },
    status_conservacao: {
      categoria_global: "Pouco Preocupante",
      tendencia_populacional: "Estável",
      justificativa:
        "Espécie amplamente distribuída com população global grande e estável, apesar de subpopulações isoladas enfrentarem ameaças.",
    },
    distribuicao: {
      descricao:
        "Distribuição circumpolar no Hemisfério Norte, incluindo América do Norte, Europa e Ásia.",
      paises_nativos: [
        "Afeganistão",
        "Albânia",
        "Armênia",
        "Azerbaijão",
        "Bielorrússia",
        "Bósnia e Herzegovina",
        "Bulgária",
        "Canadá",
        "China",
        "Croácia",
        "Estônia",
        "Finlândia",
        "França",
        "Geórgia",
        "Grécia",
        "Índia",
        "Irã",
        "Iraque",
        "Itália",
        "Japão",
        "Cazaquistão",
        "Coreia do Norte",
        "Quirguistão",
        "Letônia",
        "Macedônia",
        "Mongólia",
        "Montenegro",
        "Nepal",
        "Noruega",
        "Paquistão",
        "Polônia",
        "Romênia",
        "Rússia",
        "Sérvia",
        "Eslováquia",
        "Eslovênia",
        "Espanha",
        "Suécia",
        "Tajiquistão",
        "Turquia",
        "Ucrânia",
        "Estados Unidos",
        "Uzbequistão",
      ],
    },
    populacao: {
      densidade: "5-100 ursos/1.000 km² (varia por região)",
      ameacas_locais: {
        "Estados Unidos (Yellowstone)": "~700 ursos",
        "Montana (EUA)": "~25 ursos",
        Paquistão: "15-30 ursos",
        "Mongólia (Deserto de Gobi)": "21-29 ursos",
      },
    },
    habitat: {
      descricao:
        "Ampla variedade de habitats, desde florestas boreais até desertos e tundras.",
      habitats_principais: [
        "Floresta Boreal",
        "Tundra",
        "Floresta Temperada",
        "Regiões Montanhosas",
      ],
    },
    ecologia: {
      dieta: "Onívora (plantas, frutas, insetos, peixes e mamíferos)",
      comportamento: "Solitary, hiberna no inverno em regiões frias",
      tamanho_medio: "180-680 kg (varia por subespécie)",
      tamanho_ninhada: "1-3 filhotes (raramente 4-5)",
    },
    ameacas: [
      "Perda de habitat",
      "Caça ilegal",
      "Conflitos com humanos",
      "Fragmentação populacional",
      "Comércio de partes do corpo",
    ],
    acoes_conservacao: {
      protecao_legal:
        "Listado no CITES Apêndice II (algumas subpopulações no Apêndice I). Protegido por leis nacionais em muitos países.",
      acoes_recomendadas: [
        "Monitoramento de subpopulações isoladas",
        "Proteção de habitats críticos",
        "Redução de conflitos humano-urso",
        "Combate ao comércio ilegal",
        "Programas de educação ambiental",
      ],
    },
    curiosidades: [
      "É o urso mais amplamente distribuído no mundo",
      "As subespécies variam muito em tamanho - os ursos Kodiak do Alasca são os maiores",
    ],
    fonte: {
      citacao: "McLellan, B.N., Proctor, M.F., Huber, D. & Michel, S. 2017",
      link: "http://dx.doi.org/10.2305/IUCN.UK.2017-3.RLTS.T41688A121229971.en",
    },
  },
  {
    codigo: 5,
    imagens: {
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734506/front_ktomps.png",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734505/back_wlfw0a.png",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734504/foto_1_wstgoi.jpg",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734503/foto_2_deypol.jpg",
    },
    nome_cientifico: "Ateles geoffroyi",
    nome_tazo: "Macaco-aranha",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Primates",
      familia: "Atelidae",
    },
    nivel_extincao: {
      categoria: "EN",
      descricao: "Em Perigo",
      indice_risco: 4,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: {
      pt: "Macaco-aranha-de-Geoffroy",
      en: "Geoffroy's Spider Monkey",
      es: ["Mono Araña", "Mico"],
    },
    status_conservacao: {
      categoria_global: "Em Perigo",
      tendencia_populacional: "Decrescente",
      justificativa:
        "População pode diminuir mais de 50% em 45 anos devido à perda de habitat e caça.",
    },
    distribuicao: {
      descricao:
        "América Central, do México ao Panamá, incluindo Belize, Guatemala, Honduras, Nicarágua, Costa Rica e El Salvador.",
      paises_nativos: [
        "Belize",
        "Costa Rica",
        "El Salvador",
        "Guatemala",
        "Honduras",
        "México",
        "Nicarágua",
        "Panamá",
      ],
    },
    populacao: {
      densidade: "2.1 a 89.5 ind./km² (varia por região)",
      ameacas_locais: {
        México: "Densidade 6.3-89.5 ind./km²",
        Panamá: "2.1-2.3 ind./km²",
        "Costa Rica": "68.5 ind./km² em Corcovado",
      },
    },
    habitat: {
      descricao:
        "Florestas tropicais úmidas, florestas secas, manguezais e florestas de montanha.",
      habitats_principais: [
        "Floresta Subtropical/Tropical Seca",
        "Floresta Subtropical/Tropical Úmida de Baixada",
        "Manguezais",
      ],
    },
    ecologia: {
      dieta:
        "Principalmente frutas maduras (55-82%), folhas, flores e invertebrados.",
      comportamento:
        "Diurno, arborícola, vive em grupos com organização social de fissão-fusão.",
      tamanho_medio: "7-9 kg (machos ligeiramente maiores)",
      tamanho_ninhada: "1 filhote por gestação",
    },
    ameacas: [
      "Perda de habitat por desmatamento",
      "Caça para comércio de animais de estimação",
      "Fragmentação florestal",
      "Caça para consumo de carne",
      "Expansão agrícola",
    ],
    acoes_conservacao: {
      protecao_legal:
        "Listado no CITES Apêndice II (algumas subespécies no Apêndice I). Protegido em mais de 400 áreas na América Central.",
      acoes_recomendadas: [
        "Proteção de habitats florestais",
        "Fiscalização contra caça ilegal",
        "Programas de educação ambiental",
        "Monitoramento populacional",
        "Restauração de corredores ecológicos",
      ],
    },
    curiosidades: [
      "São os maiores macacos do Novo Mundo na América Central.",
      "Vivem em grupos que se dividem e se reúnem constantemente (fissão-fusão).",
    ],
    fonte: {
      citacao:
        "Cortes-Ortíz, L. et al. 2021. Ateles geoffroyi (amended version of 2020 assessment).",
      link: "https://dx.doi.org/10.2305/IUCN.UK.2021-1.RLTS.T2279A191688782.en",
    },
  },
  {
    codigo: 6,
    imagens: {
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734538/front_fugbn6.png",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734537/foto_2_u0rktl.jpg",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734536/back_cpeel2.png",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734535/foto_1_mje5sc.jpg",
    },
    nome_cientifico: "Canis lupus",
    nome_tazo: "lobo-cinzento",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Carnivora",
      familia: "Canidae",
    },
    nivel_extincao: {
      categoria: "LC",
      descricao: "Pouco Preocupante",
      indice_risco: 1,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: { pt: "Lobo-cinzento", en: "Grey Wolf", es: "Lobo" },
    status_conservacao: {
      categoria_global: "Pouco Preocupante",
      tendencia_populacional: "Estável",
      justificativa:
        "Distribuição ampla e população estável, apesar de ameaças locais.",
    },
    distribuicao: {
      descricao:
        "Originalmente o mamífero mais amplamente distribuído do mundo, agora encontrado principalmente em áreas selvagens e remotas do hemisfério norte.",
      paises_nativos: [
        "Afeganistão",
        "Albânia",
        "Alemanha",
        "Armênia",
        "Áustria",
        "Azerbaijão",
        "Belarus",
        "Bélgica",
        "Butão",
        "Bósnia e Herzegovina",
        "Bulgária",
        "Canadá",
        "China",
        "Croácia",
        "Dinamarca",
        "Eslováquia",
        "Eslovênia",
        "Espanha",
        "Estados Unidos",
        "Estônia",
        "Finlândia",
        "França",
        "Geórgia",
        "Grécia",
        "Groenlândia",
        "Hungria",
        "Índia",
        "Irã",
        "Iraque",
        "Israel",
        "Itália",
        "Jordânia",
        "Cazaquistão",
        "Coreia do Norte",
        "Coreia do Sul",
        "Quirguistão",
        "Letônia",
        "Líbia",
        "Lituânia",
        "Luxemburgo",
        "México",
        "Moldávia",
        "Mongólia",
        "Montenegro",
        "Myanmar",
        "Nepal",
        "Holanda",
        "Macedônia do Norte",
        "Noruega",
        "Omã",
        "Paquistão",
        "Polônia",
        "Portugal",
        "Romênia",
        "Rússia",
        "Arábia Saudita",
        "Sérvia",
        "Suécia",
        "Suíça",
        "Síria",
        "Tajiquistão",
        "Turcomenistão",
        "Turquia",
        "Ucrânia",
        "Emirados Árabes Unidos",
        "Uzbequistão",
        "Iêmen",
      ],
    },
    populacao: {
      densidade: "1 lobo/12 km² a 1 lobo/120 km²",
      ameacas_locais: { Europa: "Ameaçada em algumas regiões" },
    },
    habitat: {
      descricao:
        "Vive em diversos habitats do norte, incluindo florestas, tundras, pastagens e desertos.",
      habitats_principais: [
        "Florestas boreais",
        "Tundras",
        "Pastagens temperadas",
        "Desertos",
      ],
    },
    ecologia: {
      dieta:
        "Grandes ungulados (alces, veados, javalis), pequenas presas, gado e carniça.",
      comportamento: "Vive em matilhas, caça em grupo e é altamente social.",
      tamanho_medio: "40-65 kg",
      tamanho_ninhada: "4-6 filhotes",
    },
    ameacas: [
      "Perseguição humana por ataques ao gado",
      "Fragmentação do habitat",
      "Caça ilegal",
      "Concorrência com humanos por recursos",
      "Medo exagerado do público",
    ],
    acoes_conservacao: {
      protecao_legal:
        "Protegido pela CITES (Apêndice II) e Convenção de Berna (Anexo II).",
      acoes_recomendadas: [
        "Monitoramento contínuo das populações",
        "Proteção de habitats",
        "Educação pública para reduzir conflitos",
      ],
    },
    curiosidades: [
      "Os lobos podem percorrer até 200 km em um único dia em busca de comida.",
      "São ancestrais diretos dos cães domésticos.",
    ],
    fonte: {
      citacao: "Boitani, L., Phillips, M. & Jhala, Y. 2023.",
      link: "https://dx.doi.org/10.2305/IUCN.UK.2023-1.RITS.T3746A247624660.en",
    },
  },
  {
    codigo: 7,
    imagens: {
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734576/front_lnirzw.png",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734574/foto_2_fe7ugi.jpg",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734573/back_r3lnjo.png",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734572/foto_1_awwakm.jpg",
    },
    nome_cientifico: "Harpia harpyja",
    nome_tazo: "Harpia",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Aves",
      ordem: "Accipitriformes",
      familia: "Accipitridae",
    },
    nivel_extincao: {
      categoria: "VU",
      descricao: "Vulnerável",
      indice_risco: 3,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: { pt: "Gavião-real", en: "Harpy Eagle", es: "Águila Arpía" },
    status_conservacao: {
      categoria_global: "Vulnerável",
      tendencia_populacional: "Decrescente",
      justificativa: "População em declínio devido à perda de habitat e caça.",
    },
    distribuicao: {
      descricao:
        "Encontrada em florestas tropicais da América Central e do Sul, desde o sul do México até o norte da Argentina.",
      paises_nativos: [
        "Argentina",
        "Belize",
        "Bolívia",
        "Brasil",
        "Colômbia",
        "Costa Rica",
        "Equador",
        "Guiana Francesa",
        "Guatemala",
        "Guiana",
        "Honduras",
        "México",
        "Nicarágua",
        "Panamá",
        "Paraguai",
        "Peru",
        "Suriname",
        "Venezuela",
      ],
    },
    populacao: {
      densidade: "N/A",
      ameacas_locais: {
        Brasil: "Rara na Mata Atlântica",
        México: "Muito escassa",
      },
    },
    habitat: {
      descricao:
        "Florestas tropicais de baixa altitude, geralmente abaixo de 900 metros.",
      habitats_principais: [
        "Florestas tropicais úmidas",
        "Florestas subtropicais",
      ],
    },
    ecologia: {
      dieta: "Mamíferos arborícolas como macacos, preguiças e aves grandes.",
      comportamento:
        "Vive em pares territoriais, constrói ninhos em árvores grandes.",
      tamanho_medio: "Até 9 kg (fêmeas), 5 kg (machos)",
      tamanho_ninhada: "1-2 filhotes",
    },
    ameacas: [
      "Deforestação e perda de habitat",
      "Caça e perseguição",
      "Colisão com linhas de energia",
    ],
    acoes_conservacao: {
      protecao_legal: "Incluída no Apêndice I da CITES.",
      acoes_recomendadas: [
        "Proteção de áreas de floresta",
        "Programas de educação ambiental",
        "Combate à caça ilegal",
      ],
    },
    curiosidades: [
      "É uma das maiores e mais poderosas aves de rapina do mundo.",
      "Seus ninhos podem ter até 1,5 metros de diâmetro.",
    ],
    fonte: {
      citacao: "BirdLife International. 2021.",
      link: "https://dx.doi.org/10.2305/IUCN.UK.2021-3.RLTS.T22695998A197957213.en",
    },
  },
  {
    codigo: 8,
    imagens: {
      front:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746735575/front_qk5xgc.png",
      back: "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734609/back_xrvwym.png",
      foto_1:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734606/foto_1_sblqkc.jpg",
      foto_2:
        "https://res.cloudinary.com/dfbppldw5/image/upload/v1746734604/foto_2_dh2ype.jpg",
    },
    nome_cientifico: "Elephas maximus",
    nome_tazo: "Elefante-indiano",
    classificacao_taxonomica: {
      reino: "Animalia",
      filo: "Chordata",
      classe: "Mammalia",
      ordem: "Proboscidea",
      familia: "Elephantidae",
    },
    nivel_extincao: {
      categoria: "EN",
      descricao: "Em Perigo",
      indice_risco: 4,
      escala: [
        { nivel: 1, sigla: "LC", descricao: "Pouco Preocupante" },
        { nivel: 2, sigla: "NT", descricao: "Quase Ameaçado" },
        { nivel: 3, sigla: "VU", descricao: "Vulnerável" },
        { nivel: 4, sigla: "EN", descricao: "Em Perigo" },
        { nivel: 5, sigla: "CR", descricao: "Criticamente em Perigo" },
        { nivel: 6, sigla: "EW", descricao: "Extinto na Natureza" },
        { nivel: 7, sigla: "EX", descricao: "Extinto" },
      ],
    },
    nome_comum: {
      pt: "Elefante-asiático",
      en: "Asian Elephant",
      es: "Elefante asiático",
    },
    status_conservacao: {
      categoria_global: "Em Perigo",
      tendencia_populacional: "Decrescente",
      justificativa:
        "População em declínio devido à perda de habitat e caça ilegal.",
    },
    distribuicao: {
      descricao:
        "Encontrado em florestas e pastagens da Ásia, desde a Índia até o Sudeste Asiático.",
      paises_nativos: [
        "Bangladesh",
        "Butão",
        "Camboja",
        "China",
        "Índia",
        "Indonésia",
        "Laos",
        "Malásia",
        "Myanmar",
        "Nepal",
        "Sri Lanka",
        "Tailândia",
        "Vietnã",
      ],
    },
    populacao: {
      densidade: "N/A",
      ameacas_locais: {
        Índia: "Fragmentação populacional",
        Indonésia: "Perda de habitat",
      },
    },
    habitat: {
      descricao: "Florestas tropicais, savanas e áreas de vegetação densa.",
      habitats_principais: ["Florestas tropicais", "Savanas", "Pastagens"],
    },
    ecologia: {
      dieta: "Herbívoro (folhas, cascas de árvores, frutos).",
      comportamento:
        "Vive em grupos familiares liderados por uma fêmea mais velha.",
      tamanho_medio: "Até 5.000 kg",
      tamanho_ninhada: "1 filhote",
    },
    ameacas: [
      "Perda de habitat devido à expansão agrícola",
      "Caça ilegal por marfim",
      "Conflitos com humanos",
    ],
    acoes_conservacao: {
      protecao_legal:
        "Protegido por leis nacionais e internacionais, incluindo a CITES.",
      acoes_recomendadas: [
        "Proteção de habitats naturais",
        "Combate à caça ilegal",
        "Programas de coexistência com comunidades locais",
      ],
    },
    curiosidades: [
      "Os elefantes-asiáticos são menores que os africanos e têm orelhas menores.",
      "São animais altamente sociais e inteligentes.",
    ],
    fonte: {
      citacao:
        "Williams, C., Tiwari, S.K., Goswami, V.R., de Silva, S., Kumar, A., Baskaran, N., Yoganand, K. & Menon, V. 2020.",
      link: "https://www.iucnredlist.org/species/7140/45818198",
    },
  },
];

// --- FUNÇÃO UTILITÁRIA: get ---
/*
  Esta função, chamada 'get', é uma forma segura de acessar propriedades aninhadas
  dentro de um objeto. Se alguma propriedade no caminho não existir, em vez de
  causar um erro na aplicação, ela retorna um valor padrão (que por defeito é a string "N/A").

  Parâmetros:
  - obj: O objeto do qual queremos ler uma propriedade.
  - path: Uma string indicando o caminho para a propriedade desejada,
          separado por pontos (ex: "habitat.descricao.tipo").
  - defaultValue: O valor a ser retornado se a propriedade não for encontrada ou for inválida.
                  O padrão é "N/A".

  Exemplo de uso:
  const descricaoHabitat = get(animal, "habitat.descricao", "Descrição não informada");
*/
export const get = (obj, path, defaultValue = "N/A") => {
  // 'path.split(".")' transforma a string do caminho (ex: "a.b.c") em um array (ex: ["a", "b", "c"]).
  // 'reduce()' é um método de array que executa uma função para cada elemento do array,
  // resultando em um único valor de retorno.
  // Aqui, ele tenta navegar pelo objeto 'obj' usando as partes do caminho.
  // 'acc' é o acumulador (o objeto atual no caminho), 'part' é a parte atual do caminho (a chave).
  const value = path.split(".").reduce((acc, part) => {
    // Se 'acc' (o objeto atual) existir e tiver a propriedade 'part', retorna o valor dessa propriedade.
    // Senão, retorna 'undefined', interrompendo a navegação.
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);

  // Verificações para considerar um valor como "não encontrado" ou "inválido":
  if (
    value === undefined || // Se o valor for explicitamente undefined
    value === null || // Se o valor for null
    (typeof value === "string" && value.trim() === "") || // Se for uma string vazia ou só com espaços
    (Array.isArray(value) &&
      value.length === 0 &&
      !path.endsWith("nivel_extincao.escala")) // Se for um array vazio (exceto para a escala de extinção)
  ) {
    // Casos especiais podem ser adicionados aqui se necessário.
    // Por exemplo, se 'nivel_extincao.escala' puder ser um array vazio intencionalmente,
    // não deveríamos retornar defaultValue.
    // A condição '!path.endsWith("nivel_extincao.escala")' foi adicionada para
    // tratar o caso onde 'nivel_extincao.escala' é um array que DEVE ser retornado mesmo se vazio,
    // mas foi removida do if original para simplificar e garantir que a escala seja sempre tratada.
    // Re-avaliando a lógica original, a escala é tratada de forma diferente.
    return defaultValue;
  }

  // Caso específico para a escala de extinção: se for um array de objetos válidos, retorna o array.
  // Isso garante que a estrutura da escala seja mantida, mesmo que precise ser filtrada ou validada depois.
  if (
    Array.isArray(value) &&
    path.endsWith("nivel_extincao.escala") && // Verifica se estamos acessando especificamente a escala
    value.length > 0 &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        item.sigla &&
        item.descricao
    )
  ) {
    return value;
  }
  // Se for um array vazio e não for a escala de extinção (ou se a escala for vazia e quisermos o default).
  // A lógica original tinha uma verificação específica para arrays vazios que não eram a escala.
  if (Array.isArray(value) && value.length === 0) return defaultValue;

  // Se o valor for encontrado e válido, retorna o valor.
  return value;
};

// --- PROCESSAMENTO INICIAL DOS DADOS ---
/*
  A constante 'processedAnimalData' pega o array 'allAnimalDataRaw' e faz alguns
  processamentos e adições em cada objeto de animal.
  Isso é feito para garantir que cada animal tenha um 'id_animal' único e um
  'indice_risco_calculado' consistente.
*/
export const processedAnimalData = allAnimalDataRaw
  .map((animalData) => {
    // Mapeia cada animal do array original para um novo objeto animal processado.

    // 1. Gerar um 'id_animal' único:
    //    - Tenta usar 'animalData.codigo' se existir.
    //    - Senão, tenta criar um ID a partir do 'nome_cientifico' (minúsculas, espaços trocados por '_').
    //    - Senão (como último recurso), gera um ID aleatório.
    //    O 'String()' garante que o ID seja sempre uma string.
    const id_animal = String(
      animalData.codigo ||
        get(animalData, "nome_cientifico", "")
          .toLowerCase()
          .replace(/\s+/g, "_") ||
        `animal_${Math.random().toString(36).substring(2, 9)}` // Gera uma string aleatória
    );

    // 2. Calcular o 'indice_risco_calculado':
    //    Este mapa converte a sigla da categoria de extinção (ex: "LC", "EN") para um número.
    //    Isso é útil para ordenar os animais por nível de risco.
    const riskMap = {
      LC: 1,
      NT: 2,
      VU: 3,
      EN: 4,
      CR: 5,
      EW: 6,
      EX: 7,
      DD: 0, // Dados Insuficientes
      NE: 0, // Não Avaliado
    };
    // Pega a categoria de extinção do animal (ex: "LC"), converte para maiúsculas.
    const categoriaExtincao = get(
      animalData,
      "nivel_extincao.categoria",
      ""
    ).toUpperCase();
    // Busca o índice de risco no 'riskMap'. Se não encontrar, usa o 'indice_risco' original
    // do animal, ou 0 como padrão.
    const indiceRiscoCalculado =
      riskMap[categoriaExtincao] ??
      get(animalData, "nivel_extincao.indice_risco", 0);

    // Retorna um novo objeto para o animal, incluindo todas as propriedades originais (...animalData)
    // e as novas propriedades calculadas (id_animal, nivel_extincao com indice_risco_calculado).
    return {
      ...animalData, // Espalha todas as propriedades originais do animal.
      id_animal, // Adiciona o ID único gerado.
      nivel_extincao: {
        ...(animalData.nivel_extincao || {}), // Espalha as propriedades originais de nivel_extincao (se existirem).
        indice_risco_calculado: indiceRiscoCalculado, // Adiciona o índice de risco calculado.
        // Garante que a propriedade 'escala' seja sempre um array, mesmo que os dados originais
        // não a forneçam ou a forneçam incorretamente. Usa a função 'get' para buscar a escala
        // e verifica se é um array. Se não for, define como um array vazio.
        escala: Array.isArray(get(animalData, "nivel_extincao.escala", []))
          ? get(animalData, "nivel_extincao.escala", [])
          : [],
      },
    };
  })
  .filter((animalData) => animalData.id_animal); // Remove quaisquer animais que, por algum motivo, não tenham um id_animal.

// --- FUNÇÕES PARA CORES DE EXTINÇÃO (USANDO VALORES HEXADECIMAIS) ---
/*
  Esta função retorna o valor hexadecimal da cor correspondente
  à categoria de extinção.
  Útil para aplicar estilos inline diretamente em elementos JSX,
  ou para usar em lógicas que não dependem do Tailwind.

  Parâmetro:
  - category: A sigla da categoria de extinção (ex: "LC", "EN").

  Exemplo de uso no JSX para estilo inline:
  <div style={{ backgroundColor: getExtinctionHexColor(animal.nivel_extincao.categoria) }}>
    Status
  </div>
*/
export const getExtinctionHexColor = (category) => {
  const themeColors = {
    lc: "#AED581", // Verde claro para "Pouco Preocupante"
    nt: "#DCE775", // Amarelo-esverdeado para "Quase Ameaçado"
    vu: "#FFEE58", // Amarelo para "Vulnerável"
    en: "#FFA726", // Laranja para "Em Perigo"
    cr: "#EF5350", // Vermelho para "Criticamente em Perigo"
    ew: "#7E57C2", // Roxo para "Extinto na Natureza"
    ex: "#616161", // Cinza escuro para "Extinto"
    dd: "#BDBDBD", // Cinza médio para "Dados Insuficientes"
    ne: "#E0E0E0", // Cinza claro para "Não Avaliado"
    "default-extinction": "#CCCCCC", // Cinza padrão para categorias desconhecidas
  };
  // Retorna a cor hexadecimal correspondente, convertendo a categoria para minúsculas.
  // Se a categoria não for encontrada, retorna a cor padrão.
  return (
    themeColors[String(category).toLowerCase()] ||
    themeColors["default-extinction"]
  );
};

/*
  Considerações para os alunos:
  - Estrutura de Dados: Observar como os dados de cada animal são organizados em objetos com propriedades aninhadas.
  - Arrays de Objetos: 'allAnimalDataRaw' é um array, e cada item é um objeto animal.
  - Funções Utilitárias:
    - A função 'get' é uma ferramenta poderosa e segura para acessar dados em JavaScript, evitando erros comuns.
    - O processamento em 'processedAnimalData' adiciona informações úteis (como 'id_animal' e 'indice_risco_calculado')
      que facilitam o uso dos dados nos componentes React.
    - As funções de cor ajudam a manter a consistência visual relacionada ao status de extinção.
  - Exportação: As palavras-chave 'export' tornam as constantes e funções deste arquivo
    disponíveis para serem importadas em outros arquivos (como nos componentes React).
*/
