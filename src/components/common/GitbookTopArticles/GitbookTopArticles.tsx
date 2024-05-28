import React, { useContext } from 'react'
import { StyledGitBookTopArticles } from './GitbookTopArticles.styles'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'

interface GitBookTopArticlesProps {
  articles: {
    label: string
    url: string
  }[]
  path: string
}

function GitBookTopArticles({ articles, path: pagePath }: GitBookTopArticlesProps) {
  const { navigate } = useContext(RouterHistoryContext)

  const onFocus = () => {
    navigate(pagePath)
  }

  const onSelectArticle = (path: string) => {
    navigate(`${pagePath}?path=` + path, { replace: true })
  }

  return (
    <StyledGitBookTopArticles>
      <div className='links-wrapper'>
        {articles.map(({ label, url }) => (
          <button key={label} onClick={() => onSelectArticle(url)} className='fr-link'>
            {label}
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
