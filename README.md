# ZooDex Unilavras 🐾

![ZooDex Demo GIF](https://github.com/joaopaulofcc/ZooDex/blob/main/gif_example.gif) Bem-vindo ao ZooDex Unilavras! Um projeto educacional interativo que apresenta informações fascinantes sobre diversos animais, com um foco especial em seus status de conservação. Inspirado nos clássicos "tazos", o ZooDex oferece uma forma divertida e visual de aprender sobre a fauna.

## ✨ Funcionalidades

* **Visualização de Cards de Animais:** Navegue por uma coleção de "tazos" de animais, cada um com uma imagem de frente e verso.
* **Detalhes do Animal:** Clique em um card para ver informações detalhadas, incluindo:
    * Nome comum e científico.
    * Classificação taxonômica.
    * Status de conservação (com escala visual e cores indicativas).
    * Distribuição geográfica com mapa interativo (Leaflet).
    * Informações sobre habitat, ecologia, ameaças e curiosidades.
    * Galeria de fotos adicionais.
* **Busca Inteligente:** Encontre animais rapidamente pelo nome comum ou científico.
* **Ordenação Flexível:** Organize a lista de animais por:
    * Nome (A-Z, Z-A)
    * Nível de Risco de Extinção (Menor para Maior, Maior para Menor)
    * Número do Tazo/Código (Crescente, Decrescente)
* **Animal Surpresa:** Descubra um animal aleatoriamente com um clique!
* **Design Responsivo:** Interface adaptável para visualização em desktops, tablets e smartphones.
* **Interatividade:** Efeitos de "flip" nos cards e lightbox para visualização de imagens ampliadas.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **[React](https://reactjs.org/):** Uma biblioteca JavaScript para construir interfaces de usuário.
    * Hooks (useState, useEffect, useCallback, useMemo)
    * Componentes Funcionais
    * CSS Modules para estilização escopada.
* **[React-Leaflet](https://react-leaflet.js.org/):** Componentes React para mapas interativos Leaflet.
* **[Leaflet.js](https://leafletjs.com/):** Uma biblioteca JavaScript de código aberto para mapas interativos mobile-friendly.
* **HTML5 e CSS3:** Para estrutura e estilização.
* **JavaScript (ES6+):** Linguagem de programação principal.
* **Variáveis de Ambiente:** Para gerenciamento de chaves de API (ex: MapTiler).

## 📂 Estrutura do Projeto

A estrutura de pastas do projeto está organizada da seguinte forma:

```text
zoodex/
├── build/                      # Arquivos da build de produção
├── public/                     # Arquivos estáticos (index.html, favicon, etc.)
│   └── index.html
├── src/
│   ├── components/             # Componentes React reutilizáveis
│   │   ├── AnimalCard.jsx
│   │   ├── AnimalCard.module.css
│   │   ├── AnimalDetail.jsx
│   │   ├── AnimalDetail.module.css
│   │   ├── AnimalList.jsx
│   │   ├── AnimalList.module.css
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── MapComponent.jsx
│   │   └── MapComponent.module.css
│   ├── data/                   # Dados estáticos da aplicação
│   │   ├── animalData.js       # Array com informações dos animais
│   │   └── countryCoordinates.js # Mapeamento de países para coordenadas
│   ├── App.js                  # Componente principal da aplicação
│   ├── index.css               # Estilos globais e variáveis CSS
│   └── index.js                # Ponto de entrada da aplicação React
├── .codesandbox/
│   └── tasks.json              # Configuração de tarefas para o CodeSandbox
├── .eslintrc.json              # Configuração do ESLint
├── package.json                # Metadados do projeto e dependências
├── pnpm-lock.yaml              # Lockfile do PNPM (gerenciador de pacotes)
└── README.md                   # Este arquivo!
```

## 🛠️ Configuração e Instalação

Para rodar este projeto localmente, siga os passos abaixo:

1.  **Clone o Repositório:**
    ```bash
    git clone https_ou_ssh_do_seu_repositório_aqui
    cd zoodex
    ```

2.  **Instale as Dependências:**
    O projeto utiliza `pnpm` como gerenciador de pacotes (conforme `pnpm-lock.yaml`).
    ```bash
    pnpm install
    ```
    Se preferir `npm` ou `yarn`, delete `pnpm-lock.yaml` e `node_modules` (se existir) e rode `npm install` ou `yarn install`.

3.  **Configure as Variáveis de Ambiente:**
    Este projeto utiliza uma chave de API para o serviço de mapas MapTiler.
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione a seguinte linha, substituindo `sua_chave_aqui` pela sua chave real:
        ```env
        REACT_APP_MAPTILER_API_KEY=sua_chave_aqui
        ```
    * Você pode obter uma chave de API gratuita no [site do MapTiler Cloud](https://cloud.maptiler.com/).

4.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    pnpm start
    ```
    Isso deve abrir a aplicação no seu navegador padrão, geralmente em `http://localhost:3000`.

## 📜 Scripts Disponíveis

No diretório do projeto, você pode executar:

* `pnpm start`: Roda a aplicação em modo de desenvolvimento.
* `pnpm build`: Cria a build de produção da aplicação na pasta `build/`.
* `pnpm test`: Inicia o executor de testes em modo interativo (se houver testes configurados).
* `pnpm eject`: Remove a dependência do `react-scripts` e copia os scripts de build e configurações para o seu projeto. **Atenção: esta é uma operação irreversível!**

## 🎨 Estilização

* **CSS Modules:** Cada componente possui seu próprio arquivo `.module.css`, garantindo que os estilos sejam escopados localmente e evitando conflitos globais.
* **Variáveis CSS Globais:** Definidas em `src/index.css` (no seletor `:root`) para cores, fontes e espaçamentos, promovendo consistência visual.
* **Design Responsivo:** Utilização de Flexbox, CSS Grid e Media Queries para adaptar a interface a diferentes tamanhos de tela.

## 🗺️ Funcionalidade do Mapa (MapComponent)

* O componente `MapComponent.jsx` utiliza `react-leaflet` para renderizar um mapa interativo.
* Ele exibe marcadores para os países nativos de cada animal, usando dados de `countryCoordinates.js`.
* A camada base do mapa (tiles) é fornecida pelo MapTiler (requer API Key).
* Uma lista interativa de países permite destacar o marcador correspondente no mapa ao passar o mouse.

## 🧠 Lógica Principal (App.js)

O componente `App.js` é o cérebro da aplicação, gerenciando:
* A lista completa de animais.
* O estado do animal selecionado para visualização detalhada.
* A lógica de filtragem por termo de busca.
* A lógica de ordenação da lista de animais.
* A lógica de paginação para exibir os animais em blocos.

## 💡 Ideias para Melhorias Futuras

* [ ] Adicionar o restante dos 80 tazos/animais.
* [ ] Integração com uma API real para buscar dados dos animais, em vez de dados estáticos.
* [ ] Implementar animações mais sofisticadas para transições de página/componente.
* [ ] Implementar paginação.
* [ ] Opção de favoritar animais.
* [ ] Temas claro/escuro.

## 📄 Licença

Este projeto é distribuído sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes (se existir, caso contrário, adicione um).
As imagens dos tazos "Coleção Animais em Extinção - 1998" são © Chicletes Ping Pong e usadas aqui para fins educacionais e não comerciais.

---

Criado com ❤️ e muito JavaScript no Unilavras.
