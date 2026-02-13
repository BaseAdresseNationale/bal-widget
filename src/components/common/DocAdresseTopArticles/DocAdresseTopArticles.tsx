import { useContext } from 'react'
import { StyledDocAdresseTopArticles } from './DocAdresseTopArticles.styles'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'

interface DocAdresseTopArticlesProps {
  articles: {
    label: string
    url: string
  }[]
  path: string
}

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID!,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY!,
)
const instantSearchProps = {
  indexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME,
  searchClient,
}

function DocAdresseTopArticles({ articles, path: pagePath }: DocAdresseTopArticlesProps) {
  const { navigate } = useContext(RouterHistoryContext)

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
      <InstantSearch {...instantSearchProps}>
        <SearchBox
          className='fr-input'
          placeholder='Rechercher dans la documentation'
          id='docadresse-search'
        />
        <Hits />
      </InstantSearch>
    </StyledDocAdresseTopArticles>
  )
}

export default DocAdresseTopArticles
