'use client';

import DataTable from '@/app/components/DataTable';
import PageHeader from '@/app/components/PageHeader';
import { fetchLots } from '@/services/lots';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery } from 'react-query';

export default function LotsPage() {
  // Utilizando React Query para obtener los datos de lotes
  const { data: lotsData, error, isLoading } = useQuery('lots', fetchLots);

  type Lot = {
    id: number;
    group: string;
    drawType: string;
    denomination: string;
  };

  const columns: ColumnDef<Lot>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'group', header: 'Grupo' },
    { accessorKey: 'drawType', header: 'Tipo de sorteo' },
    { accessorKey: 'denomination', header: 'Denominación' },
  ];

  // Funciones dinámicas para manejar acciones
  const editLot = (lot: Lot) => {
    console.log(`Editar Lote ${lot.id}`);
  };

  const deleteLot = (lot: Lot) => {
    console.log(`Eliminar Lote ${lot.id}`);
  };

  return (
    <Box mt={8}>
      <PageHeader
        title="Lotes"
        showButton={true}
        buttonText="Nuevo"
        href="/admin/lots/new"
      />
      <Box mt={8}>
        <DataTable
          data={lotsData}
          columns={columns}
          isLoading={isLoading}
          error={error as Error}
          actions={[
            {
              label: 'Editar',
              icon: <EditIcon />,
              onClick: editLot,
            },
            {
              label: 'Eliminar',
              icon: <DeleteIcon />,
              onClick: deleteLot,
            },
            {
              label: 'Ver',
              icon: <ViewIcon />,
              onClick: (lot) => {
                console.log(`Ver detalles del Lote ${lot.id}`);
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
}
