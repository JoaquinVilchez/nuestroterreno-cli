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

type LotData = {
  group: number;
  drawType: DrawType;
  denomination: string;
};

export default function LotForm({ lotData }: { lotData?: LotData }) {
  const { createOne } = useCreateOne();
  const { editOne } = useEditOne();
  const router = useRouter();
  const { id } = useParams();
  const { lotCatalog } = catalogs;
  const lotId = Array.isArray(id) ? id[0] : id;

  const isEditing = Boolean(lotData);

  const form = useForm<LotData>({
    onSubmit: async ({ value }) => {
      try {
        if (isEditing) {
          await editOne(lotCatalog, lotId, value);
        } else {
          await createOne(lotCatalog, value);
        }
        router.push(`/admin/${lotCatalog.route}`);
      } catch {
        return;
      }
    },
    defaultValues: {
      denomination: lotData?.denomination || '',
      group: lotData?.group || 1,
      drawType: lotData?.drawType || DrawType.CPD,
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
            {/* Campo: Denominacion */}
            <form.Field
              name="denomination"
              validators={{
                onChange: z
                  .string()
                  .min(1, 'La denominación es obligatoria')
                  .max(
                    50,
                    'La denominación no puede tener más de 50 caracteres',
                  ),
              }}
              validatorAdapter={zodValidator()}
            >
              {(field) => (
                <FormControl isInvalid={!!field.state.meta.errors.length}>
                  <FormLabel htmlFor="denomination">Denominacion</FormLabel>
                  <Input
                    id="denomination"
                    name="denomination"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Ingresa la denominación"
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
