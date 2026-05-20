import { StyledMainButton } from './MainButton.styles'

interface MainButtonProps {
  onClick: () => void
  isExpanded: boolean
  isWizzing?: boolean
}

function MainButton({ onClick, isExpanded, isWizzing }: MainButtonProps) {
  return (
    <StyledMainButton
      onClick={onClick}
      $isWizzing={isWizzing}
      className={`fr-btn ${isExpanded ? 'fr-icon-close-line' : 'fr-icon-question-answer-fill'}`}
      title="J'ai besoin d'aide"
      aria-label="Ouvrir le centre d'aide"
      {...(isExpanded && { tabIndex: -1 })}
    />
  )
}

export default MainButton
