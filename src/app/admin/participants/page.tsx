'use client';

import DataTable from '@/app/components/DataTable';
import PageHeader from '@/app/components/PageHeader';
import { useGetMany } from '@/services/getManyService';
import { Participant } from '@/types/participant';
import catalogs from '@/utils/catalogs';
import { Box, Spinner } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import { useQuery } from 'react-query';

export default function ParticipantsPage() {
  const { getMany } = useGetMany();
  const { participantCatalog } = catalogs;

  // Hook useQuery para obtener los datos de participantes desde la API
  // 'participants' es la clave del cache, y fetchResults es la función que obtiene los datos
  const {
    data: participantsData,
    error,
    isLoading,
  } = useQuery(participantCatalog.key, () => getMany(participantCatalog));

  /**
   * Definición de columnas para TanStack Table
   * Cada columna se define con un accessorKey (la clave del objeto de datos) y un header (el nombre que se mostrará en la tabla)
   */
  const columns: ColumnDef<Participant>[] = [
    { accessorKey: 'ballNumber', header: 'Bolilla' },
    { accessorKey: 'lastName', header: 'Apellido' },
    { accessorKey: 'firstName', header: 'Nombre' },
    { accessorKey: 'group', header: 'Grupo' },
    { accessorKey: 'type', header: 'Tipo de sorteo' },
  ];

  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader
        title="Participantes"
        showButton={true}
        buttonText="Nuevo"
        href={`/admin/${participantCatalog.route}/new`}
      />
      <Suspense fallback={<Spinner />}>
        <Box mt={8}>
          {/* Tabla de datos con paginación, manejo de errores y estado de carga */}
          <DataTable
            data={participantsData}
            columns={columns}
            isLoading={isLoading}
            error={error as Error}
            dataType={participantCatalog}
          ></DataTable>
        </Box>
      </Suspense>
    </Box>
  );
}
