import React from 'react'
import { StyledHelpBlock } from './HelpBlock.styles'

interface HelpBlockProps {
    label: string
    children: React.ReactNode
}

function HelpBlock({ label, children }: HelpBlockProps) {
  return (
    <StyledHelpBlock>
        <h2>{label}</h2>
        {children}
    </StyledHelpBlock>
  )
}

export default HelpBlock
