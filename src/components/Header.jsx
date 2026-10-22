/**
 * Header — Componente de cabeçalho fixo da aplicação.
 * Recebe via props: activeSection (string) e onNavigate (função).
 * Demonstra: Componentes, Props, Renderização Condicional (active link).
 */

// Lista de seções para navegação — array de objetos para demonstrar Listas e Keys
const navItems = [
  { id: 'conceitos', label: 'Conceitos', icon: '📚' },
  { id: 'componentes', label: 'Componentes', icon: '🧩' },
  { id: 'props', label: 'Props', icon: '📬' },
  { id: 'listas', label: 'Listas & Keys', icon: '📋' },
  { id: 'condicional', label: 'Renderização', icon: '🔀' },
  { id: 'vdom', label: 'Virtual DOM', icon: '⚡' },
]

function Header({ activeSection, onNavigate, progress }) {
  return (
    <header className="header">
      <div className="reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className="container">
        <div className="header__inner">

          {/* Logo — componente de identidade visual */}
          <div className="header__logo">
            <div className="header__logo-icon" aria-label="React Logo">⚛️</div>
            <a className="header__logo-text" href="#hero" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>React Lab</a>
          </div>

          <span className="header__progress-label" aria-live="polite">Aula {Math.min(6, Math.floor((progress / 100) * 6) + 1)} de 6</span>

          {/* Navegação — renderização de lista com Keys + condicional de classe ativa */}
          <nav className="header__nav" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`header__nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

        </div>
      </div>
    </header>
  )
}

export default Header
