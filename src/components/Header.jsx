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

function Header({ activeSection, onNavigate }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">

          {/* Logo — componente de identidade visual */}
          <div className="header__logo">
            <div className="header__logo-icon" aria-label="React Logo">⚛️</div>
            <span className="header__logo-text">React Lab</span>
          </div>

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
