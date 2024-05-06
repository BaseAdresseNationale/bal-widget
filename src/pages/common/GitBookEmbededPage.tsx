import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import AnimatedPage from '../../layouts/AnimatedPage'

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
    iframeSrc += path
  } else {
    iframeSrc += '/?q='
  }

  return (
    <AnimatedPage style={{ padding: 0, height: '100%' }}>
      <StyledGitBookEmbededPage src={iframeSrc} />
    </AnimatedPage>
  )
}

export default GitBookEmbededPage
