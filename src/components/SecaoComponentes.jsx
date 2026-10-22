/**
 * SecaoComponentes — Demonstra a estrutura e composição de componentes React.
 * Demonstra: Componentes funcionais, composição, árvore de componentes.
 */
import { useState } from 'react'

// ---------- Subcomponentes de demonstração ----------

// Componente Cabecalho de exemplo
function Cabecalho({ titulo, subtitulo }) {
  return (
    <header
      style={{
        background: 'rgba(97, 218, 251, 0.08)',
        border: '1px solid rgba(97, 218, 251, 0.2)',
        borderRadius: '10px',
        padding: '16px 20px',
        marginBottom: '8px',
      }}
    >
      <h3 style={{ color: 'var(--color-primary)', fontSize: '1rem', marginBottom: '4px' }}>
        ⚛️ {titulo}
      </h3>
      {/* Renderização condicional: subtítulo só aparece se informado */}
      {subtitulo && (
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{subtitulo}</p>
      )}
    </header>
  )
}

// Componente Card de produto/exemplo
function CardItem({ nome, descricao, emoji }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      type="button"
      className={`component-demo-card ${expanded ? 'is-expanded' : ''}`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '16px',
        transition: 'var(--transition)',
        cursor: 'pointer',
      }}
      onClick={() => setExpanded((atual) => !atual)}
      id={`card-item-${nome.replace(/\s+/g, '-').toLowerCase()}`}
      aria-expanded={expanded}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.4rem' }}>{emoji}</span>
          <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{nome}</span>
        </div>
        {/* Renderização condicional da seta */}
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Renderização condicional: descrição só aparece quando expandido */}
      {expanded && (
        <p
          style={{
            marginTop: '12px',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            lineHeight: '1.6',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {descricao}
        </p>
      )}
    </button>
  )
}

// Componente Rodape de exemplo
function Rodape({ texto }) {
  return (
    <footer
      style={{
        background: 'rgba(167, 139, 250, 0.06)',
        border: '1px solid rgba(167, 139, 250, 0.15)',
        borderRadius: '10px',
        padding: '12px 20px',
        marginTop: '8px',
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
      }}
    >
      {texto}
    </footer>
  )
}

// Itens de demonstração — array para renderizar lista
const itensDemo = [
  { id: 1, nome: 'JSX', emoji: '📄', descricao: 'Sintaxe que combina HTML e JavaScript para descrever interfaces de forma legível e intuitiva dentro do código JS.' },
  { id: 2, nome: 'Props', emoji: '📬', descricao: 'Mecanismo para passar dados de componente pai para filho, tornando componentes configuráveis e reutilizáveis.' },
  { id: 3, nome: 'State', emoji: '🔄', descricao: 'Estado interno de um componente que, quando atualizado, dispara uma nova renderização da interface.' },
]

// ---------- Componente Principal ----------
function SecaoComponentes() {
  return (
    <section className="section" id="componentes" aria-labelledby="componentes-title">
      <div className="container">

        <div className="section__header">
          <div className="section__header-left">
            <div className="section__tag">🧩 Componentes</div>
            <h2 className="section__title" id="componentes-title">
              Composição de Componentes
            </h2>
            <p className="section__description">
              Veja como componentes se compõem para formar interfaces completas. Clique nos cards para expandir.
            </p>
          </div>
        </div>

        <div className="grid grid--2" style={{ alignItems: 'start' }}>

          {/* Coluna 1: App composta por componentes */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              🌳 Aplicação Renderizada
            </div>

            {/* Composição: App = Cabecalho + Cards + Rodape */}
            <Cabecalho
              titulo="React Lab — Demo"
              subtitulo="Prof. Deivison S. Takatu | Frameworks Front-end"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Listas e Keys: map() nos itens de demo */}
              {itensDemo.map((item) => (
                <CardItem
                  key={item.id}
                  nome={item.nome}
                  emoji={item.emoji}
                  descricao={item.descricao}
                />
              ))}
            </div>

            <Rodape texto="Uma interface pequena, feita de peças que podem ser combinadas." />
          </div>

          {/* Coluna 2: Árvore de componentes e código */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              🏗️ Árvore de Componentes
            </div>

            <div className="code-block">
              <div className="code-block__label">JSX</div>
              <pre>
                <span className="code-tag">{'<App>'}</span>{'\n'}
                {'  '}<span className="code-tag">{'<Cabecalho'}</span>{' '}
                <span className="code-attr">titulo</span>
                <span className="code-value">="React Lab"</span>
                <span className="code-tag">{' />'}</span>{'\n'}
                {'  '}<span className="code-tag">{'<Lista>'}</span>{'\n'}
                {'    '}<span className="code-comment">{'// map() → key obrigatório'}</span>{'\n'}
                {'    '}<span className="code-tag">{'<CardItem'}</span>
                {' '}<span className="code-attr">key</span>
                <span className="code-value">={'{item.id}'}</span>
                <span className="code-tag">{' />'}</span>{'\n'}
                {'  '}<span className="code-tag">{'</Lista>'}</span>{'\n'}
                {'  '}<span className="code-tag">{'<Rodape'}</span>
                {' '}<span className="code-attr">texto</span>
                <span className="code-value">="..."</span>
                <span className="code-tag">{' />'}</span>{'\n'}
                <span className="code-tag">{'</App>'}</span>
              </pre>
            </div>

            <div className="info-panel">
              <strong>📌 Regras dos Componentes:</strong>
              <ul style={{ marginTop: '8px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Nome sempre com <strong>letra maiúscula</strong></li>
                <li>Pode retornar JSX, um <strong>Fragment</strong> ou outro nó React</li>
                <li>Dados externos vêm por <strong>props</strong></li>
                <li>Estado interno via <strong>useState</strong></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SecaoComponentes
