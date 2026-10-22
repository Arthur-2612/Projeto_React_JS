/**
 * App — Componente raiz da aplicação React Lab.
 *
 * Esta aplicação demonstra todos os conceitos estudados na Aula 08:
 * ✅ JSX — sintaxe e expressões JavaScript
 * ✅ Componentes — criação, composição e reutilização
 * ✅ Props — passagem de dados entre componentes
 * ✅ Virtual DOM — renderização e reconciliação
 * ✅ Listas e Keys — renderização de coleções de dados
 * ✅ Renderização Condicional — controle de exibição da interface
 *
 * Disciplina: Frameworks Front-end
 * Prof. Me. Deivison S. Takatu — SENAI
 */
import { useState, useEffect } from 'react'

// Importação dos componentes — Árvore de componentes
import Header from './components/Header'
import Hero from './components/Hero'
import SecaoConceitos from './components/SecaoConceitos'
import SecaoComponentes from './components/SecaoComponentes'
import SecaoProps from './components/SecaoProps'
import SecaoListas from './components/SecaoListas'
import SecaoCondicional from './components/SecaoCondicional'
import SecaoVirtualDOM from './components/SecaoVirtualDOM'
import Footer from './components/Footer'

// IDs das seções para scroll e navegação — array para demonstrar Listas e Keys
const secoes = ['conceitos', 'componentes', 'props', 'listas', 'condicional', 'vdom']

function App() {
  // Estado: seção ativa na navegação — demonstra useState e renderização reativa
  const [secaoAtiva, setSecaoAtiva] = useState('conceitos')

  // Efeito: observa qual seção está visível no scroll (IntersectionObserver)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSecaoAtiva(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    // Seleciona todos os elementos de seção e observa
    secoes.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Função de navegação: scroll suave até a seção — passada como prop ao Header
  function handleNavigate(secaoId) {
    const elemento = document.getElementById(secaoId)
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setSecaoAtiva(secaoId)
  }

  return (
    <>
      {/*
       * ÁRVORE DE COMPONENTES — App
       * ├── Header (props: activeSection, onNavigate)
       * ├── main
       * │   ├── Hero
       * │   ├── SecaoConceitos
       * │   ├── SecaoComponentes
       * │   ├── SecaoProps
       * │   ├── SecaoListas
       * │   ├── SecaoCondicional
       * │   └── SecaoVirtualDOM
       * └── Footer
       */}

      {/* Header recebe props: activeSection e onNavigate */}
      <Header activeSection={secaoAtiva} onNavigate={handleNavigate} />

      <main id="main-content">
        {/* Hero: apresentação da aplicação */}
        <Hero />

        {/* Seção 1: Conceitos — Componentes + Props + Listas + Keys */}
        <SecaoConceitos />

        {/* Seção 2: Componentes — Composição + Árvore + Interatividade */}
        <SecaoComponentes />

        {/* Seção 3: Props — Passagem de dados + Tipos + Reutilização */}
        <SecaoProps />

        {/* Seção 4: Listas e Keys — map() + filter() + Busca + Empty State */}
        <SecaoListas />

        {/* Seção 5: Renderização Condicional — if/return + Ternário + && */}
        <SecaoCondicional />

        {/* Seção 6: Virtual DOM — Reconciliação + Contador + Histórico */}
        <SecaoVirtualDOM />
      </main>

      {/* Footer: rodapé com informações da aula */}
      <Footer />
    </>
  )
}

export default App
