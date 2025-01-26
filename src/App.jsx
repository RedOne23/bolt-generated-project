import React, { useState, useMemo } from 'react'
import './index.css'

const frameworks = [
  {
    id: 1,
    name: 'Business Model Canvas',
    category: 'Stratégie',
    description: 'Outil visuel pour décrire, analyser et concevoir des modèles économiques.'
  },
  {
    id: 2,
    name: 'Lean Canvas',
    category: 'Startup',
    description: 'Version adaptée du Business Model Canvas pour les startups.'
  },
  {
    id: 3,
    name: 'SWOT',
    category: 'Analyse',
    description: 'Analyse des forces, faiblesses, opportunités et menaces.'
  },
  {
    id: 4,
    name: 'OKR',
    category: 'Gestion',
    description: 'Objectifs et résultats clés pour aligner les équipes.'
  },
  {
    id: 5,
    name: 'PESTEL',
    category: 'Analyse',
    description: 'Analyse des facteurs politiques, économiques, sociaux, technologiques, environnementaux et légaux.'
  },
  {
    id: 6,
    name: 'Value Proposition Canvas',
    category: 'Stratégie',
    description: 'Outil pour aligner les produits/services avec les besoins des clients.'
  },
  {
    id: 7,
    name: 'KPI',
    category: 'Gestion',
    description: 'Indicateurs clés de performance pour mesurer le succès.'
  }
]

const categories = [...new Set(frameworks.map(framework => framework.category))]

const FrameworkCard = React.memo(({ framework }) => (
  <div className="framework-card">
    <h3>{framework.name}</h3>
    <p><strong>Catégorie:</strong> {framework.category}</p>
    <p>{framework.description}</p>
  </div>
))

export default function App() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredFrameworks = useMemo(() => {
    return frameworks.filter(framework => {
      const matchesSearch = framework.name.toLowerCase().includes(search.toLowerCase()) ||
                            framework.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = selectedCategory ? framework.category === selectedCategory : true
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  return (
    <div className="container">
      <h1>Bibliothèque des Frameworks Business</h1>
      <div className="filters">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher un framework ou une catégorie..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="category-filter"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="framework-list">
        {filteredFrameworks.length > 0 ? (
          filteredFrameworks.map(framework => (
            <FrameworkCard key={framework.id} framework={framework} />
          ))
        ) : (
          <p className="no-results">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  )
}
