import React, { useEffect, useRef, useState } from 'react'
import { StyledCommuneAutocomplete } from './CommuneAutocomplete.styles'

export interface APIGeoCommune {
  nom: string
  code: string
}

interface CommuneAutocompleteProps {
  onChange: (value: APIGeoCommune) => void
}

function CommuneAutocomplete({ onChange }: CommuneAutocompleteProps) {
  const searchTimeoutRef = useRef({} as NodeJS.Timeout)
  const [hasFocus, setHasFocus] = useState(false)
  const [search, setSearch] = useState('')
  const [communes, setCommunes] = useState<APIGeoCommune[]>([])

  useEffect(() => {
    async function fetchCommunes() {
      if (search.length >= 3) {
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${search}&fields=nom,code&limit=10`,
        )
        const communes = await response.json()
        setCommunes(communes)
      } else {
        setCommunes([])
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
    <StyledCommuneAutocomplete>
      <div className='fr-search-bar' id='header-search' role='search'>
        <input
          className='fr-input'
          placeholder='Rechercher votre commune'
          onChange={onSearch}
          onFocus={() => setHasFocus(true)}
          onBlur={(e) => {
            if (e.relatedTarget instanceof Element && e.relatedTarget.className === 'commune-btn') {
              return
            }
            setHasFocus(false)
          }}
          type='search'
          id='commune-search'
          name='commune-search'
        />
        <button className='fr-btn' title='Rechercher'>
          Rechercher
        </button>
      </div>
      {hasFocus && (
        <div className='commune-results'>
          {communes.length > 0 &&
            communes.map((commune: APIGeoCommune) => (
              <div key={commune.code}>
                <button className='commune-btn' onClick={() => onChange(commune)}>
                  {commune.nom} ({commune.code})
                </button>
              </div>
            ))}
          {communes.length === 0 && search.length >= 3 && <p>Aucune commune trouvée</p>}
          {communes.length === 0 && search.length > 0 && search.length < 3 && (
            <p>Votre recherche doit comporter au moins 3 caractères</p>
          )}
        </div>
      )}
    </StyledCommuneAutocomplete>
  )
}

export default CommuneAutocomplete
