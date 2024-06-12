import React, { useEffect, useRef, useState } from 'react'
import { StyledAutocomplete } from './Autocomplete.styles'

interface AutocompleteProps<T> {
  fetchResults: (search: string) => Promise<T[]>
  ResultCmp: React.FC<T>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const Autocomplete = <T extends { code: string }>({
  fetchResults,
  ResultCmp,
  inputProps,
}: AutocompleteProps<T>) => {
  const searchTimeoutRef = useRef({} as NodeJS.Timeout)
  const [hasFocus, setHasFocus] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<T[]>([])

  useEffect(() => {
    async function fetchCommunes() {
      if (search.length >= 3) {
        const results = await fetchResults(search)

        setResults(results)
      } else {
        setResults([])
      }
    }

    fetchCommunes()
  }, [search])

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 3) {
      setSearch(e.target.value)
    } else if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    searchTimeoutRef.current = setTimeout(() => {
      setSearch(e.target.value)
    }, 500)
  }

  return (
    <StyledAutocomplete>
      <div className='fr-search-bar' id='header-search' role='search'>
        <input
          className='fr-input'
          onChange={onSearch}
          onFocus={() => setHasFocus(true)}
          onBlur={(e) => {
            if (e.relatedTarget instanceof Element && e.relatedTarget.tagName === 'BUTTON') {
              return
            }
            setHasFocus(false)
          }}
          type='search'
          id='autocomplete-search'
          name='autocomplete-search'
          {...inputProps}
        />
        <button className='fr-btn' title='Rechercher' disabled={inputProps?.disabled}>
          Rechercher
        </button>
      </div>
      {hasFocus && (
        <div className='results'>
          {results.length > 0 &&
            results.map((result: T) => <ResultCmp key={result.code} {...result} />)}
          {results.length === 0 && search.length >= 3 && <p>Aucun résultat</p>}
          {results.length === 0 && search.length > 0 && search.length < 3 && (
            <p>Votre recherche doit comporter au moins 3 caractères</p>
          )}
        </div>
      )}
    </StyledAutocomplete>
  )
}

export default Autocomplete
