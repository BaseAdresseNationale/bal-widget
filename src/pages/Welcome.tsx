import React from 'react'
import HelpBlock from '../components/HelpBlock/HelpBlock'
import GitBookTopArticles from '../components/GitbookTopArticles/GitbookTopArticles'

function WecomePage() {
  return (
    <div style={{ padding: 10 }}>
      <HelpBlock label='Vous êtes ?'>
        <div style={{display: "flex", flexDirection: "column"}}>
          <button style={{textAlign: "left"}} className='fr-link fr-icon-arrow-right-line fr-link--icon-right'>Un EPCI</button>
          <button style={{textAlign: "left"}} className='fr-link fr-icon-arrow-right-line fr-link--icon-right'>
            Une commune
          </button>
        </div>
      </HelpBlock>
      <HelpBlock label='Ces articles pourraient vous aider :'>
        <GitBookTopArticles />
      </HelpBlock>
    </div>
  )
}

export default WecomePage
