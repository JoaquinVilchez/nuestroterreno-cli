'use client';

import ButtonComponent from '@/app/components/Button';
import PageHeader from '@/app/components/PageHeader';
import { DrawType } from '@/types/drawType';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FieldApi, useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

export default function NewParticipantPage() {
  type ParticipantData = {
    firstName: string;
    lastName: string;
    dni: string;
    group: number;
    type: DrawType;
  };

  const form = useForm<ParticipantData>({
    onSubmit: async ({ value }) => {
      await console.log('SUBMIT: ', value);
    },
    defaultValues: {
      firstName: '',
      lastName: '',
      dni: '',
      group: 1,
      type: DrawType.CPD,
    },
  });

  const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
    return (
      <>
        {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
          <Text color="red.400" fontSize="sm" mt={1}>
            {field.state.meta.errors.join(', ')}
          </Text>
        ) : null}
        {field.state.meta.isValidating ? 'Validating...' : null}
      </>
    );
  };

  return (
    <Box>
      x
      <PageHeader title="Nuevo participante" showButton={false} />
      <Box
        maxW="4xl"
        mx="auto"
        mt={10}
        p={4}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={2} spacing={4}>
              {/* Campo: Nombre */}
              <form.Field
                name="firstName"
                validators={{
                  onChange: z
                    .string()
                    .min(1, 'El nombre es obligatorio')
                    .max(50, 'El nombre no puede tener más de 50 caracteres')
                    .trim()
                    .regex(
                      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
                      'El nombre solo puede contener letras',
                    ),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="firstName">Nombre</FormLabel>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Ingresa el nombre"
                    />
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>

              {/* Campo: Apellido */}
              <form.Field
                name="lastName"
                validators={{
                  onChange: z
                    .string()
                    .min(1, 'El apellido es obligatorio')
                    .max(50, 'El apellido no puede tener más de 50 caracteres')
                    .trim()
                    .regex(
                      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
                      'El apellido solo puede contener letras',
                    ),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="lastName">Apellido</FormLabel>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Ingresa el apellido"
                    />
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>
            </SimpleGrid>

            <SimpleGrid columns={3} spacing={4}>
              {/* Campo: DNI */}
              <form.Field
                name="dni"
                validators={{
                  onChange: z
                    .string()
                    .length(8, 'El DNI debe tener 8 números')
                    .regex(/^\d{8}$/, 'El DNI solo puede contener números'),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="dni">DNI</FormLabel>
                    <Input
                      id="dni"
                      name="dni"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Ingresa el DNI"
                    />
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>

              {/* Campo: Grupo */}
              <form.Field
                name="group"
                validators={{
                  onChange: z.number().refine((val) => val === 1 || val === 2, {
                    message: 'El grupo debe ser 1 o 2',
                  }),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="group">Grupo</FormLabel>
                    <Select
                      id="group"
                      name="group"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </Select>
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>

              {/* Campo: Tipo de Sorteo */}
              <form.Field
                name="type"
                validators={{
                  onChange: z.nativeEnum(DrawType),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="type">Tipo de sorteo</FormLabel>
                    <Select
                      id="type"
                      name="type"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value as DrawType)
                      }
                    >
                      <option value="CPD">CPD</option>
                      <option value="GENERAL">GENERAL</option>
                    </Select>
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>
            </SimpleGrid>

            <ButtonComponent colorScheme="teal" type="submit" width="full">
              Enviar
            </ButtonComponent>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
