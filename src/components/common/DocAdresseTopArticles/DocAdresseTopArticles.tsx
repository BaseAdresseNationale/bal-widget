import { useContext } from 'react'
import { StyledDocAdresseTopArticles } from './DocAdresseTopArticles.styles'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch'
import type { Hit as AlgoliaHit } from 'instantsearch.js'

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

function CustomHit({
  hit,
  onSelectArticle,
}: {
  hit: AlgoliaHit
  onSelectArticle: (path: string) => void
}) {
  const { url, hierarchy } = hit
  const path = `/docs/${url.split('/docs/')[1]}`
  const label =
    hierarchy?.lvl6 ||
    hierarchy?.lvl5 ||
    hierarchy?.lvl4 ||
    hierarchy?.lvl3 ||
    hierarchy?.lvl2 ||
    hierarchy?.lvl1 ||
    hierarchy?.lvl0 ||
    'Article sans titre'

  return (
    <button key={label} onClick={() => onSelectArticle(path)} className='fr-link hit-item'>
      {label}
    </button>
  )
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
        <div className='fr-input-wrap fr-icon-search-line'>
          <SearchBox
            submitIconComponent={() => null}
            className='fr-input'
            placeholder='Rechercher dans la documentation'
            id='docadresse-search'
            inputProps={{ style: { width: '100%' } }}
          />
        </div>
        <Hits
          className='ais-Hits'
          hitComponent={(props) => <CustomHit onSelectArticle={onSelectArticle} {...props} />}
        />
      </InstantSearch>
    </StyledDocAdresseTopArticles>
  )
}

export default DocAdresseTopArticles
