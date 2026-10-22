/**
 * SecaoVirtualDOM — Demonstra o conceito de Virtual DOM e Reconciliação.
 * Demonstra: Virtual DOM, Reconciliação, useState, atualização eficiente.
 */
import { useState } from 'react'

// Passos do ciclo de atualização do React
const passos = [
  {
    id: 'mudanca',
    icon: '🖱️',
    label: 'Mudança',
    sublabel: 'Estado ou interação',
    tipo: 'primary',
  },
  {
    id: 'renderizacao',
    icon: '🔄',
    label: 'Renderização',
    sublabel: 'Executa o componente',
    tipo: 'secondary',
  },
  {
    id: 'reconciliacao',
    icon: '⚖️',
    label: 'Reconciliação',
    sublabel: 'Compara (diffing)',
    tipo: 'accent',
  },
  {
    id: 'atualizacao',
    icon: '✅',
    label: 'Atualização',
    sublabel: 'Aplica no DOM real',
    tipo: 'success',
  },
]

// ---------- Subcomponente: Contador Interativo ----------
// Demonstra Virtual DOM na prática: estado → re-render → reconciliação
function ContadorInterativo() {
  const [contador, setContador] = useState(0)
  const [historico, setHistorico] = useState([])

  function incrementar() {
    const novoValor = contador + 1
    setContador((atual) => atual + 1)
    setHistorico((prev) => [
      { id: Date.now(), acao: '+1', valor: novoValor },
      ...prev.slice(0, 4),
    ])
  }

  function decrementar() {
    const novoValor = contador - 1
    setContador((atual) => atual - 1)
    setHistorico((prev) => [
      { id: Date.now(), acao: '-1', valor: novoValor },
      ...prev.slice(0, 4),
    ])
  }

  function resetar() {
    setContador(0)
    setHistorico((prev) => [
      { id: Date.now(), acao: 'reset', valor: 0 },
      ...prev.slice(0, 4),
    ])
  }

  // Renderização condicional: cor do contador muda conforme valor
  const corContador =
    contador > 0
      ? 'var(--color-success)'
      : contador < 0
      ? 'var(--color-danger)'
      : 'var(--color-primary)'

  return (
    <div>
      {/* Contador visual */}
      <div className="counter-demo" aria-label="Contador interativo">
        <div>
          <button
            id="btn-decrementar"
            className="counter-btn"
            onClick={decrementar}
            aria-label="Decrementar"
          >
            −
          </button>
        </div>

        <div className="counter-wrap">
          <div
            className="counter-value"
            style={{ color: corContador, WebkitTextFillColor: corContador }}
            aria-live="polite"
            aria-label={`Valor atual: ${contador}`}
          >
            {contador}
          </div>
          <div className="counter-label">Valor atual</div>
        </div>

        <div>
          <button
            id="btn-incrementar"
            className="counter-btn"
            onClick={incrementar}
            aria-label="Incrementar"
          >
            +
          </button>
        </div>
      </div>

      {/* Botão reset */}
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <button
          id="btn-resetar"
          onClick={resetar}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
            padding: '6px 20px',
            borderRadius: '999px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          ↺ Resetar
        </button>
      </div>

      {/* Histórico de ações — Listas e Keys + Renderização Condicional */}
      {historico.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-subtle)',
              marginBottom: '8px',
            }}
          >
            Histórico de atualizações
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {historico.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 14px',
                  background: idx === 0 ? 'rgba(97,218,251,0.06)' : 'var(--color-surface)',
                  border: `1px solid ${idx === 0 ? 'rgba(97,218,251,0.2)' : 'var(--color-border)'}`,
                  borderRadius: '8px',
                  animation: idx === 0 ? 'fadeIn 0.3s ease' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: item.acao === '+1' ? 'var(--color-success)' : item.acao === '-1' ? 'var(--color-danger)' : 'var(--color-text-muted)',
                    fontWeight: '700',
                    minWidth: '50px',
                  }}
                >
                  {item.acao}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  → Novo estado: <strong style={{ color: 'var(--color-text)' }}>{item.valor}</strong>
                </span>
                {idx === 0 && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.68rem',
                      color: 'var(--color-primary)',
                      fontWeight: '600',
                    }}
                  >
                    ✦ Atual
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ---------- Componente Principal ----------
function SecaoVirtualDOM() {
  return (
    <section className="section" id="vdom" aria-labelledby="vdom-title">
      <div className="container">

        <div className="section__header">
          <div className="section__header-left">
            <div className="section__tag">⚡ Virtual DOM</div>
            <h2 className="section__title" id="vdom-title">
              Virtual DOM & Reconciliação
            </h2>
            <p className="section__description">
              O React mantém uma cópia da interface em memória, calcula as diferenças e
              aplica apenas as mudanças necessárias no DOM real.
            </p>
          </div>
        </div>

        {/* Diagrama do ciclo de atualização */}
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-text-subtle)',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Ciclo de Atualização do React
          </div>

          <div className="vdom-steps" role="list" aria-label="Etapas do Virtual DOM">
            {passos.map((passo, index) => (
              <div key={passo.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }} role="listitem">
                <div className="vdom-step" style={{ flex: 'none', minWidth: 120 }}>
                  <div className={`vdom-step__bubble vdom-step__bubble--${passo.tipo}`} aria-hidden="true">
                    {passo.icon}
                  </div>
                  <div className="vdom-step__label">{passo.label}</div>
                  <div className="vdom-step__sublabel">{passo.sublabel}</div>
                </div>
                {/* Linha conectora — renderização condicional: não aparece no último */}
                {index < passos.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(97,218,251,0.3), rgba(167,139,250,0.3))',
                      marginBottom: '48px',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid--2" style={{ alignItems: 'start', gap: '32px' }}>

          {/* Coluna 1: Contador interativo */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              🧪 Virtual DOM na Prática
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: '1.65' }}>
              Cada clique agenda um novo estado. O componente renderiza novamente; o React reconcilia a nova árvore com a anterior e aplica as mudanças necessárias. Observe o valor e o histórico mudarem juntos.
            </p>
            <ContadorInterativo />
          </div>

          {/* Coluna 2: DOM vs Virtual DOM */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              ⚖️ DOM vs Virtual DOM
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                {
                  titulo: '🌐 DOM Real',
                  itens: [
                    'Representa a estrutura HTML no navegador',
                    'Modificações diretas são lentas em escala',
                    'Atualizar muitos elementos tem custo alto',
                  ],
                  cor: 'rgba(248,113,113,0.08)',
                  borda: 'rgba(248,113,113,0.2)',
                },
                {
                  titulo: '⚡ Virtual DOM',
                  itens: [
                    'Cópia leve da interface em memória',
                    'React calcula as diferenças (diffing)',
                    'Somente o que mudou é enviado ao DOM real',
                  ],
                  cor: 'rgba(52,211,153,0.08)',
                  borda: 'rgba(52,211,153,0.2)',
                },
              ].map((bloco) => (
                <div
                  key={bloco.titulo}
                  style={{
                    background: bloco.cor,
                    border: `1px solid ${bloco.borda}`,
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <div style={{ fontWeight: '700', marginBottom: '12px' }}>{bloco.titulo}</div>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {bloco.itens.map((item) => (
                      <li key={item} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="info-panel" style={{ marginTop: '16px' }}>
              <strong>🔍 Reconciliação:</strong> processo onde o React compara (diffing) a nova
              árvore de elementos com a anterior para determinar quais mudanças aplicar no DOM real.
              Keys ajudam na identificação de elementos em listas.
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SecaoVirtualDOM
