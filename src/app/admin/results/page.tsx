'use client';

import DataTable from '@/app/components/DataTable';
import PageHeader from '@/app/components/PageHeader';
import { useGetMany } from '@/services/getManyService';
import { Result } from '@/types/result';
import catalogs from '@/utils/catalogs';
import { getFullName } from '@/utils/formatters';
import { Box, Spinner } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import { useQuery } from 'react-query';

export default function ResultsPage() {
  const { getMany } = useGetMany();
  const { resultCatalog } = catalogs;

  // Hook useQuery para obtener los datos de resultados desde la API
  // 'results' es la clave del cache, y fetchResults es la función que obtiene los datos
  // const {
  //   data: resultsData,
  //   error,
  //   isLoading,
  // } = useQuery('results', () =>
  //   getMany('result', {
  //     includes: ['lot', 'participant'],
  //   }),
  // );

  const {
    data: resultData,
    error,
    isLoading,
  } = useQuery(resultCatalog.key, () =>
    getMany(resultCatalog, {
      includes: ['lot', 'participant'],
    }),
  );

  /**
   * Definición de columnas para TanStack Table
   * Cada columna se define con un accessorKey (la clave del objeto de datos) y un header (el nombre que se mostrará en la tabla)
   */
  const columns: ColumnDef<Result>[] = [
    {
      accessorKey: 'participant',
      header: 'Nombre completo',
      cell: ({ getValue }) => {
        const participant = getValue<Result['participant']>();
        return getFullName(participant.firstName, participant.lastName);
      },
    },
    {
      accessorKey: 'lot',
      header: 'Lote',
      cell: ({ getValue, row }) => {
        const lot = getValue<Result['lot']>();
        const ballNumber = row.original.orderNumber;

        return lot?.denomination
          ? lot.denomination.toUpperCase()
          : `SUPLENTE - NRO ${ballNumber}`;
      },
    },
    {
      accessorKey: 'group',
      header: 'Grupo',
    },
    {
      accessorKey: 'drawType',
      header: 'Tipo de sorteo',
    },
  ];

  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader
        title="Resultados"
        showButton={true}
        buttonText="Nuevo"
        href="/admin/draw"
      />
      <Suspense fallback={<Spinner />}>
        <Box mt={8}>
          {/* Tabla de datos con paginación, manejo de errores y estado de carga */}
          <DataTable
            data={resultData}
            columns={columns}
            isLoading={isLoading}
            error={error as Error}
            dataType={resultCatalog}
          ></DataTable>
        </Box>
      </Suspense>
    </Box>
  );
}
