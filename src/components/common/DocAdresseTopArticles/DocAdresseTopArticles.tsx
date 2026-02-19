import { useContext } from 'react'
import { StyledDocAdresseTopArticles } from './DocAdresseTopArticles.styles'
import RouterHistoryContext from '../../../contexts/routerhistoryContext'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import SearchInput from '../SearchInput'
import { SearchItemType } from '../SearchInput/SearchInput'

interface DocAdresseTopArticlesProps {
  articles: {
    label: string
    url: string
  }[]
  path: string
}

type DocAdresseSearchHit = {
  url: string
  hierarchy: {
    lvl0?: string
    lvl1?: string
    lvl2?: string
    lvl3?: string
    lvl4?: string
    lvl5?: string
  }
}

const algoliaAppId = process.env.REACT_APP_ALGOLIA_APP_ID
const algoliaSearchKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY
const algoliaIndexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME

const createSearchAlgolia = () => {
  if (!algoliaAppId || !algoliaSearchKey || !algoliaIndexName) {
    return null
  }

  const searchClient = algoliasearch(algoliaAppId, algoliaSearchKey)

  return async (query: string): Promise<SearchItemType<{ path: string }>[]> => {
    const { results } = await searchClient.search<DocAdresseSearchHit>({
      requests: [
        {
          indexName: algoliaIndexName,
          query,
          hitsPerPage: 10,
        },
      ],
    })

    const getLabel = ({ hierarchy }: DocAdresseSearchHit) => {
      return (
        hierarchy.lvl5 ||
        hierarchy.lvl4 ||
        hierarchy.lvl3 ||
        hierarchy.lvl2 ||
        hierarchy.lvl1 ||
        hierarchy.lvl0 ||
        'Sans titre'
      )
    }

    const getPath = ({ url }: DocAdresseSearchHit) => {
      return `/docs/${url.split('/docs/')[1]}`
    }

    return (results[0] as unknown as { hits: DocAdresseSearchHit[] }).hits.map(
      (hit: DocAdresseSearchHit) => ({
        label: getLabel(hit),
        id: hit.url,
        path: getPath(hit),
      }),
    )
  }
}

const searchAlgolia = createSearchAlgolia()

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
      {searchAlgolia && (
        <SearchInput
          onSearch={searchAlgolia}
          onSelect={(hit?: SearchItemType<{ path: string }> | null) => {
            if (hit) {
              onSelectArticle(hit.path)
            }
          }}
          label='Rechercher dans la documentation'
          nativeInputProps={{ placeholder: 'Publier une Base Adresse Locale...' }}
        />
      )}
    </StyledDocAdresseTopArticles>
  )
}

export default DocAdresseTopArticles
