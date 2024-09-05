'use client';

import DataTable from '@/app/components/DataTable';
import PageHeader from '@/app/components/PageHeader';
import { useGetMany } from '@/services/getManyService';
import { Lot } from '@/types/lot';
import catalogs from '@/utils/catalogs';
import { Box, Spinner } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import { useQuery } from 'react-query';

export default function LotsPage() {
  const { getMany } = useGetMany();
  const { lotCatalog } = catalogs;

  // Hook useQuery para obtener los datos de lotes desde la API
  // 'lots' es la clave del cache, y fetchResults es la función que obtiene los datos
  const {
    data: lotsData,
    error,
    isLoading,
  } = useQuery(lotCatalog.key, () => getMany(lotCatalog));

  /**
   * Definición de columnas para TanStack Table
   * Cada columna se define con un accessorKey (la clave del objeto de datos) y un header (el nombre que se mostrará en la tabla)
   */
  const columns: ColumnDef<Lot>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'group', header: 'Grupo' },
    { accessorKey: 'drawType', header: 'Tipo de sorteo' },
    { accessorKey: 'denomination', header: 'Denominación' },
  ];

  return (
    <Box>
      <PageHeader
        title="Lotes"
        showButton={true}
        buttonText="Nuevo"
        href={`/admin/${lotCatalog.route}/new`}
      />
      <Suspense fallback={<Spinner />}>
        <Box mt={8}>
          <DataTable
            data={lotsData}
            columns={columns}
            isLoading={isLoading}
            error={error as Error}
            dataType={lotCatalog}
          />
        </Box>
      </Suspense>
    </Box>
  );
}
