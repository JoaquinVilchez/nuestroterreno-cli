'use client';

import ButtonComponent from '@/app/components/Button';
import FieldInfo from '@/app/components/FieldInfo';
import { useCreateOne } from '@/services/createOneService';
import { DrawType } from '@/types/drawType';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { useParams, useRouter } from 'next/navigation';
import catalogs from '@/utils/catalogs';
import { useEditOne } from '@/services/editOneService';

type ParticipantData = {
  firstName: string;
  lastName: string;
  ballNumber: number;
  dni: string;
  group: number;
  drawType: DrawType;
};

export default function ParticipantForm({
  participantData,
}: {
  participantData?: ParticipantData;
}) {
  const { createOne } = useCreateOne();
  const { editOne } = useEditOne();
  const router = useRouter();
  const { id } = useParams();
  const { participantCatalog } = catalogs;
  const participantId = Array.isArray(id) ? id[0] : id;

  const isEditing = Boolean(participantData);

  const form = useForm<ParticipantData>({
    onSubmit: async ({ value }) => {
      try {
        if (isEditing) {
          await editOne(participantCatalog, participantId, value);
        } else {
          await createOne(participantCatalog, value);
        }
        router.push(`/admin/${participantCatalog.route}`);
      } catch {
        return;
      }
    },
    defaultValues: {
      firstName: participantData?.firstName || '',
      lastName: participantData?.lastName || '',
      ballNumber: participantData?.ballNumber ?? 0,
      dni: participantData?.dni || '',
      group: participantData?.group || 1,
      drawType: participantData?.drawType || DrawType.CPD,
    },
  });
  return (
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
          <SimpleGrid columns={3} spacing={4}>
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

            {/* Campo: Número de bolilla */}
            <form.Field
              name="ballNumber"
              validators={{
                onChange: z
                  .number()
                  .min(1, 'El número de bolilla debe ser mayor a 0')
                  .max(
                    10000,
                    'El número de bolilla no puede ser mayor a 10000',
                  ),
              }}
              validatorAdapter={zodValidator()}
            >
              {(field) => (
                <FormControl isInvalid={!!field.state.meta.errors.length}>
                  <FormLabel htmlFor="ballNumber">Número de bolilla</FormLabel>
                  <NumberInput
                    value={field.state.value || 0} // Aseguramos que sea un número válido
                    onChange={(valueAsString, valueAsNumber) =>
                      field.handleChange(valueAsNumber)
                    }
                  >
                    <NumberInputField id="ballNumber" name="ballNumber" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
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
                    onChange={(e) => field.handleChange(Number(e.target.value))}
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
              name="drawType"
              validators={{
                onChange: z.nativeEnum(DrawType),
              }}
              validatorAdapter={zodValidator()}
            >
              {(field) => (
                <FormControl isInvalid={!!field.state.meta.errors.length}>
                  <FormLabel htmlFor="drawType">Tipo de sorteo</FormLabel>
                  <Select
                    id="drawType"
                    name="drawType"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as DrawType)
                    }
                  >
                    <option value={DrawType.CPD}>CPD</option>
                    <option value={DrawType.GENERAL}>GENERAL</option>
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
  );
}
