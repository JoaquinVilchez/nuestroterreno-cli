'use client';

import DataTable from '@/app/components/DataTable';
import PageHeader from '@/app/components/PageHeader';
import { getMany } from '@/services/getManyService';
import { Result } from '@/types/result';
import { Box, Spinner } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import { useQuery } from 'react-query';

export default function ResultsPage() {
  // Hook useQuery para obtener los datos de resultados desde la API
  // 'results' es la clave del cache, y fetchResults es la función que obtiene los datos
  const {
    data: resultsData,
    error,
    isLoading,
  } = useQuery('results', () =>
    getMany('result', {
      includes: ['lot', 'participant'],
    }),
  );

  /**
   * Definición de columnas para TanStack Table
   * Cada columna se define con un accessorKey (la clave del objeto de datos) y un header (el nombre que se mostrará en la tabla)
   */
  const columns: ColumnDef<Result>[] = [
    {
      accessorKey: 'participant.lastName', // Accede a la propiedad lastName de participant
      header: 'Apellido',
    },
    {
      accessorKey: 'participant.firstName', // Accede a la propiedad firstName de participant
      header: 'Nombre',
    },
    {
      accessorKey: 'lot.number', // Accede a la propiedad number de lot
      header: 'Número de lote',
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
        title="Results"
        showButton={true}
        buttonText="Nuevo"
        href="/admin/results/new"
      />
      <Suspense fallback={<Spinner />}>
        <Box mt={8}>
          {/* Tabla de datos con paginación, manejo de errores y estado de carga */}
          <DataTable
            data={resultsData}
            columns={columns}
            isLoading={isLoading}
            error={error as Error}
            dataType={{
              type: 'result',
              label: 'resultado',
            }}
          ></DataTable>
        </Box>
      </Suspense>
    </Box>
  );
}
