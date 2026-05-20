import { useState } from 'react'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { Sondage, SondageQuestion } from '../../../contexts/configContext'
import { StyledSondageForm } from './SondageForm.styles'

export type SondageAnswers = Record<string, string | number>

interface SondageFormProps {
  sondage: Sondage
  onSubmit: (answers: SondageAnswers) => void
  isSubmitting?: boolean
}

interface StarRatingProps {
  questionId: string
  value: number | undefined
  onChange: (value: number) => void
}

function StarRating({ questionId, value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const displayedValue = hovered ?? value ?? 0
  const isHovering = hovered !== null

  return (
    <div
      className='stars'
      role='radiogroup'
      aria-label='Note de 1 à 5 étoiles'
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= displayedValue
        const isPreview = isHovering && filled
        return (
          <button
            key={n}
            type='button'
            role='radio'
            aria-checked={value === n}
            aria-label={`${n} étoile${n > 1 ? 's' : ''}`}
            className={`star-btn${filled ? ' is-filled' : ''}${isPreview ? ' is-preview' : ''}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onFocus={() => setHovered(n)}
            onBlur={() => setHovered(null)}
            id={`${questionId}-${n}`}
          >
            {filled ? '★' : '☆'}
          </button>
        )
      })}
    </div>
  )
}

function renderQuestion(
  question: SondageQuestion,
  answers: SondageAnswers,
  setAnswer: (id: string, value: string | number) => void,
) {
  switch (question.type) {
    case 'rating-5-stars':
      return (
        <StarRating
          questionId={question.id}
          value={answers[question.id] as number | undefined}
          onChange={(value) => setAnswer(question.id, value)}
        />
      )
    case 'free-text':
      return (
        <Input
          label=''
          textArea
          nativeTextAreaProps={{
            rows: 4,
            value: (answers[question.id] as string) || '',
            onChange: (e) => setAnswer(question.id, e.target.value),
            'aria-label': question.label,
          }}
        />
      )
    default:
      return null
  }
}

function SondageForm({ sondage, onSubmit, isSubmitting }: SondageFormProps) {
  const [answers, setAnswers] = useState<SondageAnswers>({})

  const setAnswer = (id: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const isSubmitDisabled = sondage.questions.some((q) => {
    const value = answers[q.id]
    if (q.type === 'rating-5-stars') {
      return typeof value !== 'number'
    }
    if (q.type === 'free-text') {
      return !value || (typeof value === 'string' && value.trim() === '')
    }
    return false
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(answers)
  }

  return (
    <StyledSondageForm onSubmit={handleSubmit}>
      {sondage.questions.map((question) => (
        <div key={question.id} className='question'>
          <p className='question-label'>{question.label}</p>
          {renderQuestion(question, answers, setAnswer)}
        </div>
      ))}
      <div className='submit-row'>
        <Button
          type='submit'
          disabled={isSubmitDisabled || isSubmitting}
          iconId='fr-icon-send-plane-fill'
          iconPosition='right'
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </Button>
      </div>
    </StyledSondageForm>
  )
}

export default SondageForm
