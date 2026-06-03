import { useState } from 'react'
import { Button } from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'
import { Sondage, SondageQuestion, SondageQuestionType } from '../../../contexts/configContext'
import { StyledSondageForm } from './SondageForm.styles'

export type SondageAnswers = Record<string, string | number | boolean>

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
    case SondageQuestionType.RATING_5_STARS:
      return (
        <StarRating
          questionId={question.id}
          value={answers[question.id] as number | undefined}
          onChange={(value) => setAnswer(question.id, value)}
        />
      )
    case SondageQuestionType.FREE_TEXT:
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
    case SondageQuestionType.YES_NO: {
      const currentValue = answers[question.id] as string | undefined
      return (
        <RadioButtons
          legend=''
          aria-label={question.label}
          orientation='horizontal'
          options={[
            {
              label: 'Oui',
              nativeInputProps: {
                value: 'yes',
                checked: currentValue === 'yes',
                onChange: () => setAnswer(question.id, 'yes'),
              },
            },
            {
              label: 'Non',
              nativeInputProps: {
                value: 'no',
                checked: currentValue === 'no',
                onChange: () => setAnswer(question.id, 'no'),
              },
            },
          ]}
        />
      )
    }
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
    if (q.type === SondageQuestionType.RATING_5_STARS) {
      return typeof value !== 'number'
    }
    if (q.type === SondageQuestionType.FREE_TEXT) {
      return !value || (typeof value === 'string' && value.trim() === '')
    }
    if (q.type === SondageQuestionType.YES_NO) {
      return value !== 'yes' && value !== 'no'
    }
    return false
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const normalizedAnswers = sondage.questions.reduce<SondageAnswers>((acc, q) => {
      const value = answers[q.id]
      acc[q.id] = q.type === SondageQuestionType.YES_NO ? value === 'yes' : value
      return acc
    }, {})
    onSubmit(normalizedAnswers)
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
