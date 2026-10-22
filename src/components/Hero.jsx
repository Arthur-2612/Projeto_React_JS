/**
 * Hero — Seção de apresentação da aplicação.
 * Demonstra: JSX, expressões JavaScript, componente sem props externas.
 */

function Hero({ onNavigate }) {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="container">

        {/* Badge de status */}
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          UM GUIA PRÁTICO DE REACT · AULA 08
        </div>

        {/* Título principal com expressão JSX */}
        <h1 className="hero__title" id="hero-title">
          Da ideia ao <span>componente.</span>
        </h1>

        {/* Subtítulo */}
        <p className="hero__subtitle">
          Em vez de decorar definições, experimente cada conceito e veja como ele muda a interface. Comece pelo básico e avance no seu ritmo.
        </p>

        <div className="hero__actions">
          <button className="hero__start" onClick={() => onNavigate('conceitos')}>
            Começar pela primeira ideia <span aria-hidden="true">↓</span>
          </button>
          <span className="hero__note">6 tópicos · exemplos para testar</span>
        </div>

        {/* Estatísticas — JSX com expressões JavaScript */}
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-value">01</div>
            <div className="hero__stat-label">Entenda a ideia</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">02</div>
            <div className="hero__stat-label">Mude o exemplo</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">03</div>
            <div className="hero__stat-label">Veja o resultado</div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
