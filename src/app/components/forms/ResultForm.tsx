'use client';

import ButtonComponent from '@/app/components/Button';
import FieldInfo from '@/app/components/FieldInfo';
import { useCreateOne } from '@/services/createOneService';
import { DrawType } from '@/types/drawType';
import {
  Box,
  FormControl,
  FormLabel,
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
import { ResultType } from '@/types/resultType';

type ResultData = {
  participant: number | undefined;
  lot: number | undefined;
  group: number | undefined;
  drawType: DrawType | undefined;
  resultType: ResultType | undefined;
};

export default function LotForm({ resultData }: { resultData?: ResultData }) {
  const { createOne } = useCreateOne();
  const { editOne } = useEditOne();
  const router = useRouter();
  const { id } = useParams();
  const { resultCatalog } = catalogs;
  const resultId = Array.isArray(id) ? id[0] : id;

  const isEditing = Boolean(resultData);

  const form = useForm<ResultData>({
    onSubmit: async ({ value }) => {
      try {
        if (isEditing) {
          await editOne(resultCatalog, resultId, value);
        } else {
          await createOne(resultCatalog, value);
        }
        router.push(`/admin/${resultCatalog.route}`);
      } catch {
        return;
      }
    },
    defaultValues: {
      participant: resultData?.participant || undefined,
      lot: resultData?.lot || undefined,
      group: resultData?.group || undefined,
      drawType: resultData?.drawType || undefined,
      resultType: resultData?.resultType || undefined,
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
          <SimpleGrid columns={2} spacing={4}>
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

            {/* Campo: Tipo de resultado */}
            <form.Field
              name="resultType"
              validators={{
                onChange: z.nativeEnum(ResultType),
              }}
              validatorAdapter={zodValidator()}
            >
              {(field) => (
                <FormControl isInvalid={!!field.state.meta.errors.length}>
                  <FormLabel htmlFor="resultType">Tipo de ganador</FormLabel>
                  <Select
                    id="resultType"
                    name="resultType"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as ResultType)
                    }
                  >
                    <option value="CPD">Titular</option>
                    <option value="GENERAL">Suplente</option>
                  </Select>
                  <FieldInfo field={field} />
                </FormControl>
              )}
            </form.Field>
          </SimpleGrid>

          <SimpleGrid columns={2} spacing={4}>
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
                    <option value="CPD">CPD</option>
                    <option value="GENERAL">GENERAL</option>
                  </Select>
                  <FieldInfo field={field} />
                </FormControl>
              )}
            </form.Field>

            {/* Campo: Lote */}
            <form.Field
              name="lot"
              validators={{
                onChange: z.string().min(1, 'Debe seleccionar un lote'),
              }}
              validatorAdapter={zodValidator()}
            >
              {(field) => (
                <FormControl isInvalid={!!field.state.meta.errors.length}>
                  <FormLabel htmlFor="lot">Lote</FormLabel>
                  <Select
                    id="lot"
                    name="lot"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  >
                    <option value={1}>Lote 1</option>
                    <option value={2}>Lote 2</option>
                    <option value={3}>Lote 3</option>
                    <option value={4}>Lote 4</option>
                  </Select>
                  <FieldInfo field={field} />
                </FormControl>
              )}
            </form.Field>
          </SimpleGrid>
          <SimpleGrid>
            {/* Campo: Lote */}
            <form.Field
              name="participant"
              validators={{
                onChange: z.string().min(1, 'Debe seleccionar un participante'),
              }}
              validatorAdapter={zodValidator()}
            >
              {(field) => (
                <FormControl isInvalid={!!field.state.meta.errors.length}>
                  <FormLabel htmlFor="participant">Participante</FormLabel>
                  <Select
                    id="participant"
                    name="participant"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  >
                    <option value={1}>Participante 1</option>
                    <option value={2}>Participante 2</option>
                    <option value={3}>Participante 3</option>
                    <option value={4}>Participante 4</option>
                  </Select>
                  <FieldInfo field={field} />
                </FormControl>
              )}
            </form.Field>
          </SimpleGrid>

          <ButtonComponent colorScheme="teal" type="submit" width="full">
            Registrar
          </ButtonComponent>
        </VStack>
      </form>
    </Box>
  );
}
