import React, { useContext } from 'react'
import { StyledDocAdresseTopArticles } from './DocAdresseTopArticles.styles'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'

interface DocAdresseTopArticlesProps {
  articles: {
    label: string
    url: string
  }[]
  path: string
}

function DocAdresseTopArticles({ articles, path: pagePath }: DocAdresseTopArticlesProps) {
  const { navigate } = useContext(RouterHistoryContext)

  const onFocus = () => {
    navigate(pagePath)
  }

  const onSelectArticle = (path: string) => {
    navigate(`${pagePath}?path=` + path, { replace: true })
  }

  return (
    <StyledDocAdresseTopArticles>
      <div className='links-wrapper'>
        {articles.map(({ label, url }) => (
          <button key={label} onClick={() => onSelectArticle(url)} className='fr-link'>
            {label}
          </button>
        ))}
      </div>
      <div className='fr-search-bar' id='header-search' role='search'>
        <label className='fr-label' htmlFor='docadresse-search'>
          Recherche
        </label>
        <input
          className='fr-input'
          placeholder='Rechercher dans la documentation'
          type='search'
          id='docadresse-search'
          name='docadresse-search'
          onFocus={onFocus}
        />
        <button className='fr-btn' title='Rechercher'>
          Rechercher
        </button>
      </div>
    </StyledDocAdresseTopArticles>
  )
}

export default DocAdresseTopArticles
