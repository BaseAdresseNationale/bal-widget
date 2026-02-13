import AnimatedPage from '../../layouts/AnimatedPage'
import ContactForm from '../../components/common/ContactForm/ContactForm'

interface ContactPageProps {
  subjects?: string[]
}

function ContactPage({ subjects = [] }: ContactPageProps) {
  return (
    <AnimatedPage>
      <ContactForm subjects={subjects} />
    </AnimatedPage>
  )
}

export default ContactPage
