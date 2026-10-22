/**
 * SecaoProps — Demonstra o sistema de Props do React.
 * Demonstra: Props (tipos, passagem, desestruturação), Componentes reutilizáveis.
 */

// ---------- Subcomponente: Saudacao ----------
// Recebe: nome (string), cargo (string) — demonstra props com desestruturação
function Saudacao({ nome, cargo, destaque }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 18px',
        background: destaque
          ? 'rgba(97, 218, 251, 0.08)'
          : 'var(--color-surface)',
        border: `1px solid ${destaque ? 'rgba(97, 218, 251, 0.25)' : 'var(--color-border)'}`,
        borderRadius: '10px',
        transition: 'var(--transition)',
      }}
      id={`saudacao-${nome.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: destaque
            ? 'linear-gradient(135deg, #61dafb, #a78bfa)'
            : 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: '0.85rem',
          color: destaque ? '#0a0e1a' : 'var(--color-text)',
          flexShrink: 0,
        }}
      >
        {/* Expressão JS: inicial do nome */}
        {nome.charAt(0).toUpperCase()}
      </div>
      <div>
        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Olá, {nome}! 👋</div>
        {/* Renderização condicional: cargo só aparece se informado */}
        {cargo && (
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{cargo}</div>
        )}
      </div>
      {/* Renderização condicional: badge de destaque */}
      {destaque && (
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.7rem',
            fontWeight: '700',
            color: 'var(--color-primary)',
            background: 'rgba(97,218,251,0.1)',
            border: '1px solid rgba(97,218,251,0.2)',
            padding: '2px 10px',
            borderRadius: '999px',
          }}
        >
          ⭐ Destaque
        </span>
      )}
    </div>
  )
}

// ---------- Dados: array de alunos para demonstrar Props + Lista ----------
const alunos = [
  { id: 1, nome: 'Ana Silva', cargo: 'ADS — 2º Semestre', destaque: true },
  { id: 2, nome: 'Bruno Costa', cargo: 'ADS — 2º Semestre', destaque: false },
  { id: 3, nome: 'Carla Mendes', cargo: 'ADS — 2º Semestre', destaque: false },
  { id: 4, nome: 'Diego Lima', cargo: 'ADS — 2º Semestre', destaque: true },
]

// Tipos de props para documentação visual
const tiposProps = [
  { tipo: 'String', icone: '📝', exemplo: 'nome="João"', cor: 'primary' },
  { tipo: 'Number', icone: '🔢', exemplo: 'nota={9.5}', cor: 'secondary' },
  { tipo: 'Boolean', icone: '☑️', exemplo: 'destaque={true}', cor: 'success' },
  { tipo: 'Array', icone: '📋', exemplo: 'itens={[1, 2, 3]}', cor: 'accent' },
  { tipo: 'Object', icone: '🧩', exemplo: 'aluno={{ nome, id }}', cor: 'primary' },
  { tipo: 'Function', icone: '⚡', exemplo: 'onClick={handleClick}', cor: 'secondary' },
]

// ---------- Componente Principal ----------
function SecaoProps() {
  return (
    <section className="section" id="props" aria-labelledby="props-title">
      <div className="container">

        <div className="section__header">
          <div className="section__header-left">
            <div className="section__tag">📬 Props</div>
            <h2 className="section__title" id="props-title">
              Props — Passagem de Dados
            </h2>
            <p className="section__description">
              Props permitem que componentes pai enviem informações para filhos, tornando-os reutilizáveis
              e configuráveis.
            </p>
          </div>
        </div>

        <div className="grid grid--2" style={{ alignItems: 'start' }}>

          {/* Coluna 1: Exemplos de Saudacao com props diferentes */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              ♻️ Reutilização com Props Diferentes
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Listas e Keys: map() com key */}
              {alunos.map((aluno) => (
                <Saudacao
                  key={aluno.id}
                  nome={aluno.nome}
                  cargo={aluno.cargo}
                  destaque={aluno.destaque}
                />
              ))}
            </div>

            <div className="info-panel" style={{ marginTop: '20px' }}>
              <strong>🔑 Mesmo componente</strong> <code>{'<Saudacao />'}</code>, dados diferentes via props
              — isso é <strong>reutilização</strong>!
            </div>
          </div>

          {/* Coluna 2: Tipos de Props + Código */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              📊 Tipos de Props
            </div>

            <div className="props-showcase">
              {tiposProps.map((p) => (
                <div className="prop-item" key={p.tipo}>
                  <span className="prop-item__key">
                    {p.icone} {p.tipo}
                  </span>
                  <code className="prop-item__value" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    {p.exemplo}
                  </code>
                  <span className={`prop-item__type`}>{p.tipo}</span>
                </div>
              ))}
            </div>

            <div className="code-block" style={{ marginTop: '20px' }}>
              <div className="code-block__label">JSX</div>
              <pre>
                <span className="code-comment">{'// Declaração do componente'}</span>{'\n'}
                <span className="code-keyword">function</span>
                {' '}
                <span className="code-function">Saudacao</span>
                {'({ '}
                <span className="code-attr">nome</span>
                {', '}
                <span className="code-attr">cargo</span>
                {', '}
                <span className="code-attr">destaque</span>
                {' }) {'}{'\n'}
                {'  '}<span className="code-keyword">return</span>
                {' ('}{'\n'}
                {'    '}<span className="code-tag">{'<div>'}</span>{'\n'}
                {'      '}<span className="code-tag">{'<h3>'}</span>
                {'Olá, '}
                <span className="code-value">{'{nome}'}</span>
                <span className="code-tag">{'</h3>'}</span>{'\n'}
                {'      '}<span className="code-comment">{'// Renderização condicional'}</span>{'\n'}
                {'      '}
                <span className="code-value">{'{cargo && <p>{cargo}</p>}'}</span>{'\n'}
                {'    '}<span className="code-tag">{'</div>'}</span>{'\n'}
                {'  )'}{'\n'}
                {'}'}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SecaoProps
