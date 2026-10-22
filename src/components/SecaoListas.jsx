/**
 * SecaoListas — Demonstra Listas e Keys no React.
 * Demonstra: map(), filter(), key, busca interativa, renderização condicional (empty state).
 */
import { useState } from 'react'

// Dataset de alunos — array de objetos com ID único para usar como key
const todosAlunos = [
  { id: 101, nome: 'Ana Silva', curso: 'ADS', nota: 9.5, status: 'aprovado' },
  { id: 102, nome: 'Bruno Costa', curso: 'ADS', nota: 5.8, status: 'recuperacao' },
  { id: 103, nome: 'Carla Mendes', curso: 'ADS', nota: 8.2, status: 'aprovado' },
  { id: 104, nome: 'Diego Lima', curso: 'ADS', nota: 3.1, status: 'reprovado' },
  { id: 105, nome: 'Erica Souza', curso: 'ADS', nota: 7.0, status: 'aprovado' },
  { id: 106, nome: 'Felipe Rocha', curso: 'ADS', nota: 6.4, status: 'recuperacao' },
  { id: 107, nome: 'Gabriela Nunes', curso: 'ADS', nota: 9.8, status: 'aprovado' },
  { id: 108, nome: 'Hugo Ferreira', curso: 'ADS', nota: 2.5, status: 'reprovado' },
]

// Mapeamento de label por status
const statusConfig = {
  aprovado: { label: '✅ Aprovado', className: 'aprovado' },
  recuperacao: { label: '⚠️ Recuperação', className: 'recuperacao' },
  reprovado: { label: '❌ Reprovado', className: 'reprovado' },
}

// ---------- Subcomponente: StudentItem ----------
// Recebe um objeto aluno via props — demonstra Props + JSX
function StudentItem({ aluno, index }) {
  const { nome, curso, nota, status } = aluno
  const config = statusConfig[status]
  const iniciais = nome.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <div
      className="student-item"
      style={{ animationDelay: `${index * 60}ms` }}
      id={`student-${aluno.id}`}
      role="listitem"
    >
      <div className="student-item__avatar" aria-hidden="true">{iniciais}</div>
      <div className="student-item__info">
        <div className="student-item__name">{nome}</div>
        <div className="student-item__course">
          {curso} — Nota: <strong>{nota.toFixed(1)}</strong>
        </div>
      </div>
      <span className={`student-item__status student-item__status--${config.className}`}>
        {config.label}
      </span>
    </div>
  )
}

// ---------- Subcomponente: EmptyState ----------
function EmptyState({ busca }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state__icon">🔍</div>
      <div className="empty-state__text">Nenhum aluno encontrado</div>
      {/* Renderização condicional: mostra o termo buscado */}
      {busca && (
        <div className="empty-state__subtext">
          Não há resultados para &ldquo;{busca}&rdquo;
        </div>
      )}
    </div>
  )
}

// ---------- Componente Principal ----------
function SecaoListas() {
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')

  // filter() + includes() — demonstra filtro de lista
  const alunosFiltrados = todosAlunos
    .filter((aluno) => {
      const matchBusca = aluno.nome.toLowerCase().includes(busca.toLowerCase())
      const matchStatus = filtroStatus === 'todos' || aluno.status === filtroStatus
      return matchBusca && matchStatus
    })

  // Estatísticas — derivadas via filter() + .length
  const totalAprovados = todosAlunos.filter((a) => a.status === 'aprovado').length
  const totalRecuperacao = todosAlunos.filter((a) => a.status === 'recuperacao').length
  const totalReprovados = todosAlunos.filter((a) => a.status === 'reprovado').length

  return (
    <section className="section" id="listas" aria-labelledby="listas-title">
      <div className="container">

        <div className="section__header">
          <div className="section__header-left">
            <div className="section__tag">📋 Listas & Keys</div>
            <h2 className="section__title" id="listas-title">
              Listas, Filtros e Keys
            </h2>
            <p className="section__description">
              Use map() para renderizar listas e filter() para filtrar. A prop key é obrigatória
              e deve ser única entre irmãos.
            </p>
          </div>
        </div>

        <div className="grid grid--2" style={{ alignItems: 'start', gap: '32px' }}>

          {/* Coluna 1: Lista Interativa */}
          <div>

            {/* Estatísticas rápidas */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '24px',
              }}
            >
              {[
                { label: 'Aprovados', value: totalAprovados, color: 'var(--color-success)' },
                { label: 'Recuperação', value: totalRecuperacao, color: 'var(--color-warning)' },
                { label: 'Reprovados', value: totalReprovados, color: 'var(--color-danger)' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    textAlign: 'center',
                    padding: '14px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: stat.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Campo de busca */}
            <div className="search-box">
              <input
                id="busca-aluno"
                className="search-box__input"
                type="search"
                placeholder="Buscar aluno pelo nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                aria-label="Buscar aluno"
              />
              <span className="search-box__icon" aria-hidden="true">🔍</span>
            </div>

            {/* Filtros por status */}
            <div className="filters" role="group" aria-label="Filtrar por status">
              {['todos', 'aprovado', 'recuperacao', 'reprovado'].map((status) => (
                <button
                  key={status}
                  id={`filtro-${status}`}
                  className={`filter-btn ${filtroStatus === status ? 'active' : ''}`}
                  onClick={() => setFiltroStatus(status)}
                >
                  {status === 'todos' ? 'Todos' : statusConfig[status]?.label ?? status}
                </button>
              ))}
            </div>

            {/* Contador de resultados */}
            <div
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginBottom: '12px',
              }}
              aria-live="polite"
            >
              {/* Renderização condicional: singular vs plural */}
              {alunosFiltrados.length === 0
                ? 'Nenhum resultado'
                : alunosFiltrados.length === 1
                ? '1 aluno encontrado'
                : `${alunosFiltrados.length} alunos encontrados`}
            </div>

            {/* Lista renderizada com map() + key */}
            <div className="student-list" role="list" aria-label="Lista de alunos">
              {alunosFiltrados.length > 0
                ? alunosFiltrados.map((aluno, index) => (
                    <StudentItem key={aluno.id} aluno={aluno} index={index} />
                  ))
                : <EmptyState busca={busca} />}
            </div>
          </div>

          {/* Coluna 2: Explicação e código */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              💻 Como funciona
            </div>

            <div className="code-block">
              <div className="code-block__label">JSX</div>
              <pre>
                <span className="code-comment">{'// Array de dados'}</span>{'\n'}
                <span className="code-keyword">const</span>
                {' alunos = ['}{'\n'}
                {'  { '}<span className="code-attr">id</span>
                {': '}
                <span className="code-value">101</span>
                {', '}
                <span className="code-attr">nome</span>
                {': '}
                <span className="code-string">"Ana"</span>
                {' },'}{'\n'}
                {'  ...'}
                {'\n]'}{'\n\n'}

                <span className="code-comment">{'// filter() + map() + key'}</span>{'\n'}
                {'alunos'}{'\n'}
                {'  .'}<span className="code-function">filter</span>
                {'(a => a.nota >= 7)'}{'\n'}
                {'  .'}<span className="code-function">map</span>
                {'(aluno => ('}{'\n'}
                {'    '}<span className="code-tag">{'<StudentItem'}</span>{'\n'}
                {'      '}<span className="code-attr">key</span>
                {'={'}<span className="code-value">{'{aluno.id}'}</span>{'\n'}
                {'      '}<span className="code-attr">aluno</span>
                {'={'}<span className="code-value">{'{aluno}'}</span>{'\n'}
                {'    '}<span className="code-tag">{'/>'}</span>{'\n'}
                {'  ))'}
              </pre>
            </div>

            <div className="info-panel" style={{ marginTop: '16px' }}>
              <strong>🔑 Por que key?</strong> O React usa a key para identificar qual item mudou.
              Sem key, o React precisa recriar toda a lista. Com key, só o item alterado é atualizado.
              <br /><br />
              <strong>⚠️ Evite:</strong> usar o índice do array como key quando a lista pode ser
              reordenada ou filtrada — prefira sempre um ID único.
            </div>

            <div className="info-panel" style={{ marginTop: '12px', borderLeftColor: 'var(--color-secondary)' }}>
              <strong>🔀 Renderização Condicional aqui:</strong> o{' '}
              <code>{'<EmptyState />'}</code> só aparece quando o array filtrado está vazio —{' '}
              <code>{'{lista.length > 0 ? <Lista /> : <EmptyState />}'}</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecaoListas
