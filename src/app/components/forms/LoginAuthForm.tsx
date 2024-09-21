'use client';

import ButtonComponent from '@/app/components/Button';
import FieldInfo from '@/app/components/FieldInfo';
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import useCustomToast from '../Toast';

export default function LoginAuthForm() {
  const showToast = useCustomToast();

  const form = useForm({
    onSubmit: async ({ value }) => {
      const result = await signIn('credentials', {
        email: value.email,
        password: value.password,
        redirect: false,
      });
      if (result?.error) {
        // Mostrar mensaje de error
        showToast({
          title: `Error al iniciar sesion`,
          description: `El usuario no existe o las credenciales no son válidas`,
          status: 'error',
        });
      } else {
        // Redirigir a la página deseada
        window.location.href = '/admin/draw';
      }
    },
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Box p={4} boxShadow="lg" borderRadius="md" bg="white" w="100%">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Campo: Email */}
        <form.Field
          name="email"
          validators={{
            onChange: z.string().email().min(5),
          }}
          validatorAdapter={zodValidator()}
        >
          {(field) => (
            <FormControl isInvalid={!!field.state.meta.errors.length} mb={5}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ingresa un email"
              />
              <FieldInfo field={field} />
            </FormControl>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: z.string().refine(
              (val) => val.length >= 8,
              () => ({
                message: 'La contraseña debe tener al menos 8 caracteres',
              }),
            ),
          }}
          validatorAdapter={zodValidator()}
        >
          {(field) => (
            <FormControl isInvalid={!!field.state.meta.errors.length} mb={5}>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ingresa una contraseña"
              />
              <FieldInfo field={field} />
            </FormControl>
          )}
        </form.Field>

        <ButtonComponent colorScheme="teal" type="submit" width="full">
          Ingresar
        </ButtonComponent>
      </form>
    </Box>
  );
}
