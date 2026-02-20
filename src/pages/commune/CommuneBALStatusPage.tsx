import AnimatedPage from '../../layouts/AnimatedPage'
import { useSearchParams } from '../../hooks/useSearchParams'
import { useCommuneInfos } from '../../hooks/useCommuneInfos'

function CommuneBALStatusPage() {
  const [codeCommune, nomCommune] = useSearchParams('code', 'nom')
  const { communeInfos, status } = useCommuneInfos(codeCommune)

  return (
    <AnimatedPage>
      <h2>
        {nomCommune} ({codeCommune})
      </h2>
      <div>
        {status === 'success' && communeInfos}
        {status === 'error' && (
          <div className='error-message'>
            Une erreur est survenue lors de la récupération des informations de la commune. Vous
            pouvez nous contacter en utilisant le formulaire de contact.
          </div>
        )}
      </div>
    </AnimatedPage>
  )
}

export default CommuneBALStatusPage
