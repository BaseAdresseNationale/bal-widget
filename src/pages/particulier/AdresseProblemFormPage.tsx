import AnimatedPage from '../../layouts/AnimatedPage'
import AdresseProblemForm from '../../components/particulier/AdresseProblemForm/AdresseProblemForm'
import { useLocation } from 'react-router-dom'

function AdresseProblemFormPage() {
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const cityName = searchParams.get('cityName') || ''
  const cityCode = searchParams.get('cityCode') || ''
  const street = searchParams.get('street') || ''

  return (
    <AnimatedPage>
      <AdresseProblemForm city={{ name: cityName, code: cityCode }} street={street} />
    </AnimatedPage>
  )
}

export default AdresseProblemFormPage
