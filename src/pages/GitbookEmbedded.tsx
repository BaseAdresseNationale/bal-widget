import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const iframeBaseSrc = 'https://doc.adresse.data.gouv.fr'

const StyledGitBookEmbededPage = styled.iframe`
  width: 100%;
  height: 100%;
`

function GitBookEmbededPage() {
  const location = useLocation()
  let iframeSrc = iframeBaseSrc
  const search = location.search
  if (search) {
    const searchParams = new URLSearchParams(search)
    const path = searchParams.get('path')
    console.log(path)
    iframeSrc += path
  } else {
    iframeSrc += '/?q='
  }

  return <StyledGitBookEmbededPage src={iframeSrc} />
}

export default GitBookEmbededPage
