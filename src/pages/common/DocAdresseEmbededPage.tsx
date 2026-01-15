import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import AnimatedPage from '../../layouts/AnimatedPage'

const StyledDocAdresseEmbededPage = styled.iframe`
  width: 100%;
  height: 100%;
`

function DocAdresseEmbededPage() {
  const location = useLocation()
  let iframeSrc = `${process.env.REACT_APP_DOC_ADRESSE_URL}`
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
      <StyledDocAdresseEmbededPage src={iframeSrc} />
    </AnimatedPage>
  )
}

export default DocAdresseEmbededPage
