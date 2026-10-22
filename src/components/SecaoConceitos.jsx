/**
 * SecaoConceitos — Apresenta os conceitos centrais do React.
 * Demonstra: Componentes, Props, Listas e Keys, JSX.
 */

// Dados dos conceitos — array de objetos (demonstra Listas e Keys)
const conceitos = [
  {
    id: 1,
    icon: '📄',
    titulo: 'JSX',
    descricao:
      'Extensão de sintaxe que permite escrever estruturas semelhantes a HTML dentro do JavaScript. O JSX é transpilado para chamadas React.createElement().',
    tag: 'Sintaxe',
    tagType: 'primary',
    exemplo: '<h1>Olá, {nome}!</h1>',
  },
  {
    id: 2,
    icon: '🧩',
    titulo: 'Componentes',
    descricao:
      'Unidades independentes e reutilizáveis da interface. São funções JavaScript que retornam elementos React descritos com JSX.',
    tag: 'Estrutura',
    tagType: 'secondary',
    exemplo: 'function Card() { return <div /> }',
  },
  {
    id: 3,
    icon: '📬',
    titulo: 'Props',
    descricao:
      'Propriedades passadas de um componente pai para um filho. Permitem reutilizar componentes com dados diferentes, seguindo o fluxo unidirecional.',
    tag: 'Dados',
    tagType: 'accent',
    exemplo: '<Card titulo="React" cor="azul" />',
  },
  {
    id: 4,
    icon: '⚡',
    titulo: 'Virtual DOM',
    descricao:
      'Representação da interface em memória. O React calcula as diferenças (diffing) e atualiza apenas o que mudou no DOM real — mais eficiente.',
    tag: 'Performance',
    tagType: 'primary',
    exemplo: 'Mudança → Diff → Patch DOM',
  },
  {
    id: 5,
    icon: '📋',
    titulo: 'Listas & Keys',
    descricao:
      'O método map() transforma arrays em elementos JSX. A prop key ajuda o React a identificar quais itens foram adicionados, removidos ou reordenados.',
    tag: 'Coleções',
    tagType: 'secondary',
    exemplo: 'items.map(i => <li key={i.id}>{i.nome}</li>)',
  },
  {
    id: 6,
    icon: '🔀',
    titulo: 'Renderização Condicional',
    descricao:
      'Permite mostrar, ocultar ou alterar partes da interface conforme condições. Usa if/return, operador ternário ou &&.',
    tag: 'Controle',
    tagType: 'accent',
    exemplo: '{logado ? <Bem-Vindo /> : <Login />}',
  },
]

// ---------- Subcomponente: ConceptCard ----------
// Recebe via props: conceito (objeto com todos os dados do card)
// Demonstra: Componente reutilizável + Props (desestruturação) + JSX
function ConceptCard({ conceito }) {
  const { id, icon, titulo, descricao, tag, tagType, exemplo } = conceito

  return (
    <article className="concept-card" aria-label={`Conceito: ${titulo}`}>
      <div className="concept-card__number">
        {/* Expressão JS: formatação de número com padding */}
        {String(id).padStart(2, '0')} / {String(conceitos.length).padStart(2, '0')}
      </div>

      <h3 className="concept-card__title">
        {icon} {titulo}
      </h3>

      <p className="concept-card__description">{descricao}</p>

      {/* Bloco de código compacto */}
      <div
        className="code-block"
        style={{ padding: '10px 16px', marginTop: '12px', fontSize: '0.78rem' }}
        aria-label={`Exemplo de ${titulo}`}
      >
        <span className="code-tag">{exemplo}</span>
      </div>

      <div className="concept-card__footer">
        {/* Renderização condicional de tag — cada tagType tem cor diferente */}
        <span className={`card__tag card__tag--${tagType}`}>{tag}</span>
      </div>
    </article>
  )
}

// ---------- Componente Principal da Seção ----------
function SecaoConceitos() {
  return (
    <section className="section" id="conceitos" aria-labelledby="conceitos-title">
      <div className="container">

        <div className="section__header">
          <div className="section__header-left">
            <div className="section__tag">📚 Fundamentos</div>
            <h2 className="section__title" id="conceitos-title">
              Conceitos do React
            </h2>
            <p className="section__description">
              Os {conceitos.length} pilares essenciais estudados nesta aula, com exemplos práticos de cada um.
            </p>
          </div>
        </div>

        {/* Grid de cards — map() com key obrigatório (Listas e Keys) */}
        <div className="grid grid--3">
          {conceitos.map((conceito) => (
            <ConceptCard key={conceito.id} conceito={conceito} />
          ))}
        </div>

        <div className="info-panel" style={{ marginTop: '32px' }}>
          <strong>💡 Sobre os Componentes:</strong> cada card acima é uma instância do componente{' '}
          <code>ConceptCard</code>, reutilizado {conceitos.length} vezes com props diferentes — isso é a essência
          da reutilização em React!
        </div>

      </div>
    </section>
  )
}

export default SecaoConceitos
