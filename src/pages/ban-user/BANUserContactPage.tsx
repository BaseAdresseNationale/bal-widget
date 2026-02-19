import AnimatedPage from '../../layouts/AnimatedPage'
import ContactForm from '../../components/common/ContactForm/ContactForm'

function BANUserContactPage() {
  return (
    <AnimatedPage>
      <ContactForm subjects={['Question sur la donnée BAN', 'Autre']} />
    </AnimatedPage>
  )
}

export default BANUserContactPage
