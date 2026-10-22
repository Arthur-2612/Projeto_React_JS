/**
 * Hero — Seção de apresentação da aplicação.
 * Demonstra: JSX, expressões JavaScript, componente sem props externas.
 */

// Dados estáticos calculados via expressões JS — demonstra JSX com expressões
const totalConceitos = 6
const totalExemplos = 12
const totalComponentes = 8

function Hero() {
  // Expressão JS dentro do JSX para calcular o ano
  const anoAtual = new Date().getFullYear()

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="container">

        {/* Badge de status */}
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          Aula 08 — Frameworks Front-end {anoAtual}
        </div>

        {/* Título principal com expressão JSX */}
        <h1 className="hero__title" id="hero-title">
          Aprenda <span>React</span>
          <br />na prática
        </h1>

        {/* Subtítulo */}
        <p className="hero__subtitle">
          Explore os fundamentos do React com exemplos interativos:
          JSX, Componentes, Props, Virtual DOM, Listas e Renderização Condicional.
        </p>

        {/* Estatísticas — JSX com expressões JavaScript */}
        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-value">{totalConceitos}</div>
            <div className="hero__stat-label">Conceitos</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">{totalExemplos}+</div>
            <div className="hero__stat-label">Exemplos</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">{totalComponentes}</div>
            <div className="hero__stat-label">Componentes</div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero
