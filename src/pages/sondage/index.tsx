import { useContext, useState } from 'react'
import AnimatedPage from '../../layouts/AnimatedPage'
import HelpBlock from '../../components/common/HelpBlock/HelpBlock'
import SondageForm, { SondageAnswers } from '../../components/common/SondageForm/SondageForm'
import ConfigContext from '../../contexts/configContext'
import { useBALAdmin } from '../../hooks/useBALAdmin'

function SondagePage() {
  const { availableSondage, markActiveSondageAsAnswered, setIsOpen } = useContext(ConfigContext)
  const { sendSondageResponses } = useBALAdmin()
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!availableSondage) {
    return (
      <AnimatedPage>
        <HelpBlock label='Sondage indisponible'>
          <p>Aucun sondage n’est actuellement disponible.</p>
        </HelpBlock>
      </AnimatedPage>
    )
  }

  const handleSubmit = async (answers: SondageAnswers) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await sendSondageResponses(availableSondage.id, answers)
      markActiveSondageAsAnswered()
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue lors de l’envoi de vos réponses.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatedPage>
      <HelpBlock label={availableSondage.name}>
        {submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p>Merci pour votre retour !</p>
            <button
              type='button'
              className='fr-btn fr-btn--secondary'
              onClick={() => setIsOpen(false)}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <SondageForm
              sondage={availableSondage}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            {error && (
              <p role='alert' style={{ color: 'red', marginTop: 10 }}>
                {error}
              </p>
            )}
          </>
        )}
      </HelpBlock>
    </AnimatedPage>
  )
}

export default SondagePage
