'use client';

import ButtonComponent from '@/app/components/Button';
import FieldInfo from '@/app/components/FieldInfo';
import { useCreateOne } from '@/services/createOneService';
import { DrawType } from '@/types/drawType';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
import ReactSelect from 'react-select';
import { useGetMany } from '@/services/getManyService';
import { useQuery } from 'react-query';
import { Lot } from '@/types/lot';
import { Participant } from '@/types/participant';
import { useEffect, useState } from 'react';

type ResultData = {
  participant: number | null;
  lot: number | null;
  group: number | null;
  drawType: DrawType | null;
  resultType: ResultType | null;
};

export default function ResultForm({
  resultData,
}: {
  resultData?: ResultData;
}) {
  const [selectedDrawType, setSelectedDrawType] = useState<DrawType | null>(
    null,
  );
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedResultType, setSelectedResultType] =
    useState<ResultType | null>(null);
  const { createOne } = useCreateOne();
  const { editOne } = useEditOne();
  const { getMany } = useGetMany();
  const { id } = useParams();
  const { resultCatalog, lotCatalog, participantCatalog } = catalogs;
  const isEditing = Boolean(resultData);
  const resultId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  const form = useForm<ResultData>({
    onSubmit: async ({ value }) => {
      try {
        if (isEditing) {
          console.log('editar', value, resultId);
          await editOne(resultCatalog, resultId, value);
        } else {
          console.log('crear', value);
          await createOne(resultCatalog, value);
        }
        router.push(`/admin/${resultCatalog.route}`);
      } catch {
        return;
      }
    },
    defaultValues: {
      participant: resultData?.participant || null,
      lot: resultData?.lot || null,
      group: resultData?.group || 1,
      drawType: resultData?.drawType || DrawType.GENERAL,
      resultType: resultData?.resultType || ResultType.INCUMBENT,
    },
  });

  useEffect(() => {
    // Solo cambiará el valor cuando alguno de los campos cambie
    setSelectedGroup(form.state.values.group);
    setSelectedDrawType(form.state.values.drawType);
    setSelectedResultType(form.state.values.resultType);
  }, [
    form.state.values.group,
    form.state.values.drawType,
    form.state.values.resultType,
  ]);

  // Resetear el valor de 'lot' cuando el tipo de resultado es 'Suplente'
  useEffect(() => {
    if (selectedResultType === ResultType.ALTERNATE) {
      form.setFieldValue('lot', null);
    }
  }, [form, selectedResultType]);

  const handleResultType = () => {
    return selectedResultType === ResultType.ALTERNATE;
  };

  const { data: lotsData, isLoading: isLoadingLots } = useQuery(
    ['lots', selectedGroup, selectedDrawType, selectedResultType],
    () =>
      getMany(lotCatalog, {
        group: selectedGroup || undefined,
        drawType: selectedDrawType || undefined,
        resultType: selectedResultType || undefined,
      }),
    { enabled: !!selectedGroup && !!selectedDrawType && !!selectedResultType },
  );

  const { data: participantsData, isLoading: isLoadingParticipants } = useQuery(
    ['participants', selectedGroup, selectedDrawType],
    () =>
      getMany(participantCatalog, {
        group: selectedGroup || undefined,
        drawType: selectedDrawType || undefined,
        forSelect: true,
      }),
    { enabled: !!selectedGroup && !!selectedDrawType },
  );

  return (
    <Box>
      <Box>
        <Alert status="warning">
          <AlertIcon />
          <Box>
            <AlertTitle>
              Falta mejorar notablemente las validaciones y experiencia de uso.
            </AlertTitle>
            <AlertDescription>
              <a href="https://app.clickup.com/t/86b24w8x0" target="_blank">
                Link tarea clickup
              </a>
            </AlertDescription>
          </Box>
        </Alert>
      </Box>

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
                      value={field.state.value || ''}
                      onChange={(e) => {
                        field.handleChange(Number(e.target.value));
                        setSelectedGroup(Number(e.target.value));
                      }}
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
                      value={field.state.value || ''}
                      onChange={(e) => {
                        field.handleChange(e.target.value as ResultType);
                        setSelectedResultType(form.state.values.resultType);
                      }}
                    >
                      <option value={ResultType.INCUMBENT}>Titular</option>
                      <option value={ResultType.ALTERNATE}>Suplente</option>
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
                      value={field.state.value || ''}
                      onChange={(e) => {
                        field.handleChange(e.target.value as DrawType);
                        setSelectedDrawType(form.state.values.drawType);
                      }}
                    >
                      <option value={DrawType.CPD}>CPD</option>
                      <option value={DrawType.GENERAL}>GENERAL</option>
                    </Select>
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>

              {/* Campo: Lote */}
              <form.Field
                name="lot"
                validators={{
                  onChange: z
                    .number()
                    .nullable()
                    .refine(
                      (value) => {
                        // Validación: Si es 'Titular', el lote es requerido. Si es 'Suplente', el lote debe ser null.
                        if (selectedResultType === ResultType.ALTERNATE) {
                          return value === null;
                        } else {
                          return value !== null && value > 0;
                        }
                      },
                      {
                        message:
                          selectedResultType === ResultType.ALTERNATE
                            ? 'El lote debe ser nulo para suplentes'
                            : 'Debe seleccionar un lote válido',
                      },
                    ),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="lot">Lote</FormLabel>
                    <ReactSelect
                      id="lot"
                      name="lot"
                      isDisabled={handleResultType()}
                      isLoading={isLoadingLots}
                      options={
                        lotsData
                          ? lotsData.map((lot: Lot) => ({
                              value: lot.id,
                              label: `Lote ${lot.id} - ${lot.denomination}`,
                            }))
                          : []
                      }
                      placeholder="Selecciona un lote"
                      value={
                        selectedResultType === ResultType.ALTERNATE
                          ? null
                          : lotsData?.find(
                              (option: { value: number; label: string }) =>
                                option.value === field.state.value,
                            )
                      }
                      onChange={(selectedOption) => {
                        if (selectedOption && selectedOption.value) {
                          form.setFieldValue('lot', selectedOption.value);
                        }
                      }}
                    />
                    <FieldInfo field={field} />
                  </FormControl>
                )}
              </form.Field>
            </SimpleGrid>
            <SimpleGrid>
              {/* Campo: Participante */}
              <form.Field
                name="participant"
                validators={{
                  onChange: z
                    .number()
                    .min(1, 'Debe seleccionar un participante'),
                }}
                validatorAdapter={zodValidator()}
              >
                {(field) => (
                  <FormControl isInvalid={!!field.state.meta.errors.length}>
                    <FormLabel htmlFor="participant">Participante</FormLabel>
                    <ReactSelect
                      id="participant"
                      name="participant"
                      isLoading={isLoadingParticipants}
                      isClearable
                      options={
                        participantsData
                          ? participantsData.map(
                              (participant: Participant) => ({
                                value: participant.id,
                                label: `${participant.id} - ${participant.lastName}, ${participant.firstName}`,
                              }),
                            )
                          : []
                      }
                      placeholder="Selecciona un participante"
                      value={participantsData?.find(
                        (option: { value: number; label: string }) =>
                          option.value === field.state.value,
                      )}
                      onChange={(selectedOption) => {
                        if (selectedOption && selectedOption.value) {
                          field.handleChange(selectedOption.value);
                        }
                      }}
                    />
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
    </Box>
  );
}
