import { Button, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

// cria objeto do formulário no zod
const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínimo de 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário pode conter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})

// infere a tipagem do objeto
type claimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<claimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  // redireciona o usuário para continuar o cadastro na plataforma
  async function handleClaimUsername(data: claimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          crossOrigin=""
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Agendar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Informe o nome do usuário'}
        </Text>
      </FormAnnotation>
    </>
  )
}
