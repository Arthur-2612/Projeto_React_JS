/**
 * SecaoCondicional — Demonstra Renderização Condicional no React.
 * Demonstra: if/return, operador ternário, &&, estados de UI (carregando, erro, sucesso).
 */
import { useState } from 'react'

// ---------- Subcomponente: MensagemAcesso ----------
// Demonstra if/return para alternar JSX completamente diferente
function MensagemAcesso({ autenticado }) {
  if (autenticado) {
    return (
      <div className="message-box message-box--success" role="status">
        ✅ <strong>Bem-vindo de volta!</strong> Você está autenticado com sucesso.
      </div>
    )
  }
  return (
    <div className="message-box message-box--warning" role="status">
      🔒 <strong>Acesso restrito.</strong> Faça login para continuar.
    </div>
  )
}

// ---------- Subcomponente: ResultadoBusca ----------
// Demonstra operador ternário para alternar entre carregando/resultado
function ResultadoBusca({ carregando, encontrado }) {
  if (carregando) {
    return (
      <div className="message-box message-box--info" role="status" aria-live="polite">
        ⏳ <strong>Buscando...</strong> Aguarde um momento.
      </div>
    )
  }
  // Ternário: encontrado ou não
  return encontrado
    ? (
      <div className="message-box message-box--success" role="status">
        🎉 <strong>Encontrado!</strong> Resultado disponível para visualização.
      </div>
    )
    : (
      <div className="message-box message-box--danger" role="status">
        😔 <strong>Nenhum resultado.</strong> Tente com outros termos.
      </div>
    )
}

// ---------- Subcomponente: StatusNota ----------
// Demonstra múltiplas condicionais para diferentes estados
function StatusNota({ nota }) {
  // Determinação do status via expressão JS
  const getStatus = (n) => {
    if (n >= 9) return { label: '⭐ Excelente', type: 'success' }
    if (n >= 7) return { label: '✅ Aprovado', type: 'success' }
    if (n >= 5) return { label: '⚠️ Recuperação', type: 'warning' }
    return { label: '❌ Reprovado', type: 'danger' }
  }

  const status = getStatus(nota)

  return (
    <div className={`message-box message-box--${status.type}`} role="status">
      Nota <strong>{nota.toFixed(1)}</strong> → {status.label}
    </div>
  )
}

// ---------- Componente Principal ----------
function SecaoCondicional() {
  // Estado 1: Autenticação
  const [autenticado, setAutenticado] = useState(false)

  // Estado 2: Busca com loading
  const [carregando, setCarregando] = useState(false)
  const [encontrado, setEncontrado] = useState(null)

  // Estado 3: Nota
  const [nota, setNota] = useState(7.5)

  // Estado 4: Visibilidade de painel (&&)
  const [mostrarDica, setMostrarDica] = useState(false)

  // Simula uma busca assíncrona
  function simularBusca(resultado) {
    setCarregando(true)
    setEncontrado(null)
    setTimeout(() => {
      setCarregando(false)
      setEncontrado(resultado)
    }, 1500)
  }

  return (
    <section className="section" id="condicional" aria-labelledby="condicional-title">
      <div className="container">

        <div className="section__header">
          <div className="section__header-left">
            <div className="section__tag">🔀 Renderização Condicional</div>
            <h2 className="section__title" id="condicional-title">
              Controle de Exibição
            </h2>
            <p className="section__description">
              Mostre, oculte ou altere partes da interface com base em condições.
              Interaja com os exemplos abaixo!
            </p>
          </div>
        </div>

        <div className="grid grid--2" style={{ alignItems: 'start', gap: '32px' }}>

          {/* Coluna 1: Demos interativas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Demo 1: if/return */}
            <div className="demo-box">
              <div className="demo-box__title">1️⃣ if / return — Autenticação</div>
              <div className="demo-row">
                <span className="demo-label">Status atual:</span>
                <button
                  id="btn-autenticar"
                  className={`toggle-btn ${autenticado ? 'toggle-btn--on' : 'toggle-btn--off'}`}
                  onClick={() => setAutenticado(!autenticado)}
                  aria-pressed={autenticado}
                >
                  {autenticado ? '🟢 Autenticado' : '🔴 Não autenticado'}
                </button>
              </div>
              {/* Componente com if/return */}
              <MensagemAcesso autenticado={autenticado} />
            </div>

            {/* Demo 2: Ternário + Loading */}
            <div className="demo-box">
              <div className="demo-box__title">2️⃣ Ternário — Busca com Loading</div>
              <div className="demo-row" style={{ gap: '10px', flexWrap: 'wrap' }}>
                <button
                  id="btn-buscar-sucesso"
                  className="toggle-btn toggle-btn--on"
                  onClick={() => simularBusca(true)}
                  disabled={carregando}
                >
                  🔍 Buscar (com resultado)
                </button>
                <button
                  id="btn-buscar-vazio"
                  className="toggle-btn toggle-btn--off"
                  onClick={() => simularBusca(false)}
                  disabled={carregando}
                >
                  🔍 Buscar (vazio)
                </button>
              </div>
              {/* Renderização condicional: null = nada renderizado */}
              {encontrado !== null || carregando ? (
                <ResultadoBusca carregando={carregando} encontrado={encontrado} />
              ) : (
                <div className="message-box message-box--info">
                  👆 Clique em um dos botões para simular a busca.
                </div>
              )}
            </div>

            {/* Demo 3: Múltiplas condições */}
            <div className="demo-box">
              <div className="demo-box__title">3️⃣ Múltiplas Condições — Status de Nota</div>
              <div className="demo-row">
                <span className="demo-label">Nota: <strong>{nota.toFixed(1)}</strong></span>
                <input
                  id="slider-nota"
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={nota}
                  onChange={(e) => setNota(parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                  aria-label="Ajustar nota"
                />
              </div>
              <StatusNota nota={nota} />
            </div>

            {/* Demo 4: && */}
            <div className="demo-box">
              <div className="demo-box__title">4️⃣ Operador && — Mostrar/Ocultar</div>
              <div className="demo-row">
                <button
                  id="btn-dica"
                  className={`toggle-btn ${mostrarDica ? 'toggle-btn--on' : 'toggle-btn--off'}`}
                  onClick={() => setMostrarDica(!mostrarDica)}
                >
                  {mostrarDica ? '👁️ Ocultar Dica' : '💡 Mostrar Dica'}
                </button>
              </div>
              {/* && renderiza somente se a condição for verdadeira */}
              {mostrarDica && (
                <div className="message-box message-box--info" style={{ animation: 'fadeIn 0.3s ease' }}>
                  💡 <strong>Dica:</strong> O operador <code>&&</code> retorna o segundo valor apenas
                  se o primeiro for verdadeiro — ideal para exibir elementos opcionais!
                </div>
              )}
              {!mostrarDica && (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-subtle)' }}>
                  Clique no botão para revelar a dica.
                </div>
              )}
            </div>

          </div>

          {/* Coluna 2: Código e referência */}
          <div>
            <div className="section__tag" style={{ marginBottom: '16px' }}>
              💻 Padrões de Renderização Condicional
            </div>

            <div className="code-block">
              <div className="code-block__label">JSX</div>
              <pre>
                <span className="code-comment">{'// 1. if / return — interfaces muito diferentes'}</span>{'\n'}
                <span className="code-keyword">if</span>
                {' (autenticado) '}<span className="code-keyword">return</span>
                {' '}<span className="code-tag">{'<Dashboard />'}</span>{'\n'}
                <span className="code-keyword">return</span>
                {' '}<span className="code-tag">{'<Login />'}</span>{'\n\n'}

                <span className="code-comment">{'// 2. Ternário — alternância inline'}</span>{'\n'}
                <span className="code-value">{'{'}</span>
                {'carregando'}{'\n'}
                {'  ? '}<span className="code-tag">{'<Spinner />'}</span>{'\n'}
                {'  : '}<span className="code-tag">{'<Resultado />'}</span>
                <span className="code-value">{'}'}</span>{'\n\n'}

                <span className="code-comment">{'// 3. && — exibição condicional'}</span>{'\n'}
                <span className="code-value">{'{'}</span>
                {'mostrar && '}<span className="code-tag">{'<Dica />'}</span>
                <span className="code-value">{'}'}</span>
              </pre>
            </div>

            <div className="info-panel" style={{ marginTop: '20px' }}>
              <strong>📖 Quando usar cada um?</strong>
              <ul style={{ marginTop: '8px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                <li><strong>if/return</strong> — quando as interfaces são muito diferentes</li>
                <li><strong>Ternário (? :)</strong> — quando há exatamente duas opções</li>
                <li><strong>&amp;&amp;</strong> — quando o elemento é opcional (exibe ou nada)</li>
              </ul>
            </div>

            <div className="info-panel" style={{ marginTop: '12px', borderLeftColor: 'var(--color-secondary)' }}>
              <strong>⚠️ Cuidado com 0:</strong> em React, <code>{'{0 && <Comp />}'}</code> renderiza o
              número <code>0</code> na tela! Use <code>{'{num > 0 && <Comp />}'}</code> para evitar isso.
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default SecaoCondicional
