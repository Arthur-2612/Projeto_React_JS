/**
 * Footer — Rodapé da aplicação.
 * Demonstra: Componente funcional, JSX com expressões.
 */

function Footer() {
  const anoAtual = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p className="footer__text">
          ⚛️ <strong>React Lab</strong> — Projeto da Aula 08 | Frameworks Front-end{' '}
          <strong>{anoAtual}</strong>
        </p>
        <p className="footer__text" style={{ marginTop: '6px' }}>
          Prof. Me. Deivison S. Takatu — SENAI
        </p>
        <p className="footer__text" style={{ marginTop: '6px', fontSize: '0.78rem' }}>
          Conceitos: JSX · Componentes · Props · Virtual DOM · Listas & Keys · Renderização Condicional
        </p>
      </div>
    </footer>
  )
}

export default Footer
