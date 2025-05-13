// Caminho: src/components/Footer.jsx

// =================================================================================================
// ARQUIVO: Footer.jsx
// PROPÓSITO: Este arquivo define o componente React chamado 'Footer'.
//            Um "componente" é uma peça fundamental na construção de interfaces com React.
//            Pense nele como um bloco de Lego: você cria vários blocos (componentes)
//            e depois os junta para montar sua página ou aplicação.
//
//            O componente 'Footer' (Rodapé) é a seção que geralmente aparece na
//            parte inferior de todas as páginas de um site. Ele costuma conter
//            informações como direitos autorais (copyright), créditos do desenvolvedor,
//            links para termos de serviço, política de privacidade, ou outras informações
//            relevantes que não fazem parte do conteúdo principal da página.
//
//            Este Footer específico é um exemplo de um componente "estático" e "presentacional":
//            - Estático: Seu conteúdo não muda com base em interações do usuário ou
//                        outros dados dinâmicos da aplicação (exceto o ano atual, que é
//                        calculado uma vez quando o componente é renderizado).
//            - Presentacional: Sua principal função é exibir informações e estrutura visual,
//                              sem muita lógica complexa de programação.
// =================================================================================================

// --- 1. IMPORTAÇÕES DE MÓDULOS ---

// Importamos a biblioteca 'React'.
// Esta linha é crucial porque:
//  a) Permite que usemos JSX (JavaScript XML) neste arquivo. JSX é a sintaxe
//     que se parece com HTML (ex: <p>, <div>) e que usamos para descrever
//     a estrutura da interface do nosso componente.
//  b) O JSX é transformado (compilado) pelo Babel (uma ferramenta que faz parte
//     do setup do Create React App) em chamadas de função do tipo `React.createElement(...)`.
//     Portanto, 'React' precisa estar no escopo para que essas chamadas funcionem.
// Em versões muito recentes do React (17+) com novas transformações JSX, essa importação
// explícita pode não ser estritamente necessária em TODOS os arquivos que usam JSX,
// mas é uma boa prática mantê-la, especialmente para fins de aprendizado e para garantir
// compatibilidade com diferentes configurações de build.
import React from "react";

// Importamos o objeto 'styles' do nosso arquivo CSS Module correspondente, 'Footer.module.css'.
// - 'styles': Este é um nome de variável que escolhemos (uma convenção comum).
//             Ele se tornará um objeto JavaScript.
// - './Footer.module.css': O './' indica que o arquivo CSS está localizado na MESMA PASTA
//                          que este arquivo Footer.jsx.
//                          A extensão '.module.css' é ESPECIAL. Ela diz ao sistema de build
//                          para processar este arquivo CSS como um "CSS Module".
// - CSS Modules: A principal vantagem é o ESCOPO LOCAL das classes CSS.
//                Isso significa que se você definir uma classe como '.meuEstilo'
//                em Footer.module.css, ela não entrará em conflito com uma classe
//                '.meuEstilo' definida em outro arquivo CSS de outro componente.
//                O sistema de build renomeia as classes para serem únicas globalmente
//                (ex: '.Footer_meuEstilo__AbCdE'). No nosso código JSX, acessaremos
//                essa classe através do objeto 'styles', como `styles.meuEstilo`.
import styles from "./Footer.module.css";

// --- 2. DEFINIÇÃO DO COMPONENTE FUNCIONAL 'Footer' ---

// 'Footer' é definido como um "componente funcional".
// Em React, um componente funcional é, em sua forma mais básica, uma função JavaScript
// que retorna elementos React (geralmente escritos em JSX) que descrevem o que
// deve ser renderizado (mostrado) na tela.
//
// Esta função não recebe nenhum argumento 'props' (propriedades) porque, neste caso,
// o conteúdo do rodapé é fixo e não depende de dados passados pelo componente pai.
// Se quiséssemos, por exemplo, que o nome da empresa no rodapé viesse de fora,
// poderíamos definir o componente como: const Footer = (props) => { ... }
// e acessar props.nomeDaEmpresa.
const Footer = () => {
  // --- A. LÓGICA DO COMPONENTE (JavaScript que roda ANTES do JSX ser retornado) ---

  // Para exibir o ano atual dinamicamente na mensagem de direitos autorais,
  // usamos o objeto 'Date' embutido no JavaScript.
  // 1. `new Date()`: Cria um novo objeto do tipo 'Date'. Quando chamado sem argumentos,
  //                  este objeto representa a data e hora EXATAS do momento em que
  //                  esta linha de código é executada.
  const dataHoraAtuais = new Date();

  // 2. `.getFullYear()`: Este é um método (uma função que pertence a um objeto)
  //                      do objeto 'Date'. Ele retorna o ano da data com quatro dígitos
  //                      (ex: 2023, 2024, 2025).
  const anoCorrente = dataHoraAtuais.getFullYear();

  // Não há mais lógica complexa neste componente, pois ele é principalmente para exibição.

  // --- B. RETORNO DO JSX (O QUE O COMPONENTE VAI MOSTRAR NA TELA) ---
  // A instrução 'return (...);' especifica a estrutura da interface do usuário
  // que este componente 'Footer' irá gerar. O código dentro dos parênteses é JSX.
  // JSX nos permite escrever uma estrutura parecida com HTML diretamente dentro do nosso JavaScript.

  return (
    // A tag `<footer />` é uma tag HTML5 semântica.
    // Usar tags HTML semânticas (como <header>, <nav>, <main>, <article>, <aside>, <footer>)
    // é uma boa prática porque ajuda:
    //  - Acessibilidade: Leitores de tela podem entender melhor a estrutura da página.
    //  - SEO (Search Engine Optimization): Mecanismos de busca podem indexar melhor o conteúdo.
    //  - Manutenção do código: Torna o código mais legível para outros desenvolvedores (e para você no futuro).
    //
    // `className={styles.footer}`:
    //   - `className`: Em JSX, usamos `className` em vez do atributo `class` do HTML puro.
    //                  Isso ocorre porque `class` é uma palavra reservada em JavaScript (usada para criar classes).
    //   - `{styles.footer}`: Aqui estamos acessando a propriedade `footer` do objeto `styles`
    //                        que importamos do nosso arquivo `Footer.module.css`.
    //                        Se em `Footer.module.css` tivermos `.footer { ... }`,
    //                        `styles.footer` conterá uma string com o nome da classe CSS
    //                        transformado e único (ex: "Footer_footer__u7X5r").
    //                        Isso aplica os estilos definidos para `.footer` no CSS Module
    //                        a este elemento `<footer>`.
    <footer className={styles.footer}>
      {/*
        Parágrafo para a mensagem de direitos autorais.
        - `&copy;`: É uma "entidade HTML" que representa o símbolo de copyright (©).
                    Entidades HTML são usadas para exibir caracteres especiais que podem ter
                    outro significado em HTML/XML ou que não são fáceis de digitar.
        - `{anoCorrente}`: Usamos chaves `{}` para "escapar" do JSX e embutir uma expressão
                           JavaScript. Aqui, estamos inserindo o valor da variável `anoCorrente`
                           (que calculamos acima para ser o ano atual) diretamente no texto.
        - `❤️`: Emojis são caracteres Unicode e podem ser usados diretamente no JSX/HTML.
      */}
      <p>Feito com amor e JavaScript ❤️ no Unilavras.</p>
      <p>
        Um projeto educacional inspirado nos tazos clássicos e na importância da
        conscientização sobre a fauna.
      </p>

      {/*
        Uma `<div>` (divisão) é usada aqui para agrupar a seção de "disclaimer"
        (avisos legais ou atribuições). Isso ajuda a aplicar estilos específicos
        a todo este bloco de informações.
        Aplicamos a classe `styles.disclaimer` a esta div.
      */}
      <div className={styles.disclaimer}>
        <p>Zaps "Coleção Animais em Extinção" &copy; Chicletes Ping Pong.</p>
        <p>Projeto com fins educacionais e não comerciais.</p>
        {/*
          Poderíamos adicionar mais informações aqui, como:
          - Links para as fontes dos dados dos animais.
          - Nomes dos desenvolvedores/alunos envolvidos.
          - Um link para o repositório do projeto no GitHub (se for público).
          Exemplo de link:
          <p>
            Veja o código no <a href="URL_DO_SEU_REPOSITORIO_GITHUB" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
          - 'target="_blank"': Faz o link abrir em uma nova aba/janela do navegador.
          - 'rel="noopener noreferrer"': São atributos de segurança importantes para links `target="_blank"`:
            - 'noopener': Previne que a nova página tenha acesso ao objeto `window` da página original
                          (uma medida de segurança contra phishing).
            - 'noreferrer': Previne que informações de referência (de onde o usuário veio)
                            sejam passadas para a nova página.
        */}
      </div>
    </footer> // Fim da tag <footer>
  ); // Fim da instrução return
}; // Fim da definição do componente funcional Footer

// --- 3. EXPORTAÇÃO DO COMPONENTE ---

// `export default Footer;`
// Esta linha torna o componente `Footer` disponível para ser importado e utilizado
// em outros arquivos/componentes da nossa aplicação (principalmente no `App.js`).
// - `export`: Palavra-chave do JavaScript (ES6 Modules) para exportar funcionalidades.
// - `default`: Indica que `Footer` é a exportação principal (padrão) deste arquivo.
//              Isso significa que, ao importar em outro arquivo, podemos dar qualquer nome
//              à variável que recebe o componente, embora seja convenção usar o mesmo nome.
//              Exemplo de importação no App.js:
//                `import RodapeCustomizado from './components/Footer';`
//                `// ... e depois usar <RodapeCustomizado /> no JSX do App.js`
//              Mas o mais comum é:
//                `import Footer from './components/Footer';`
export default Footer;
