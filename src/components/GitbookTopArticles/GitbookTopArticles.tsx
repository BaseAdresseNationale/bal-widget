import React from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledGitBookTopArticles } from './GitbookTopArticles.styles'

const links = [
  {
    title: 'Comment publier ma BAL ?',
    path: '/mettre-a-jour-sa-base-adresse-locale/publier-une-base-adresse-locale',
  },
  {
    title: 'Pourquoi ma BAL ne se dépublie pas ?',
    path: '/mettre-a-jour-sa-base-adresse-locale/une-base-adresse-locale-ne-se-depublie-pas',
  },
]

function GitBookTopArticles() {
  const navigate = useNavigate()
  const onFocus = () => {
    navigate('/gitbook')
  }

  const onSelectArticle = (path: string) => {
    navigate('/gitbook?path=' + path, { replace: true })
  }

  return (
    <StyledGitBookTopArticles>
      <div className="links-wrapper">
        {links.map(({ title, path }) => (
          <button
            key={title}
            onClick={() => onSelectArticle(path)}
            className='fr-link'
          >
            {title}
          </button>
        ))}
      </div>
      <div className='fr-search-bar' id='header-search' role='search'>
        <label className='fr-label' htmlFor='gitbook-search'>
          Recherche
        </label>
        <input
          className='fr-input'
          placeholder='Rechercher dans la documentation'
          type='search'
          id='gitbook-search'
          name='gitbook-search'
          onFocus={onFocus}
        />
        <button className='fr-btn' title='Rechercher'>
          Rechercher
        </button>
      </div>
    </StyledGitBookTopArticles>
  )
}

export default GitBookTopArticles
