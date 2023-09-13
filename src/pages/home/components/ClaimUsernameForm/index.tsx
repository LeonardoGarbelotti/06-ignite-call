import { Button, Text, TextInput } from '@ignite-ui/react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<claimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  async function handleClaimUsername(data: claimUsernameFormData) {
    console.log(data)
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
        <Button size="sm" type="submit">
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
