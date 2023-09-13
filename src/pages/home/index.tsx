import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'

import Image from 'next/image'
import previewImage from '@/assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="lg">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          em seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          alt="Imagem de Calendário que simboliza a aplicação em funcionamento"
          quality={100}
          priority
          height={400}
        />
      </Preview>
    </Container>
  )
}
