'use client';

import DataTable from '@/app/components/DataTable';
import PageHeader from '@/app/components/PageHeader';
import { fetchLots } from '@/services/lots';
import { Lot } from '@/types/lot';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Spinner } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense, useCallback } from 'react';
import { useQuery } from 'react-query';

export default function LotsPage() {
  // Hook useQuery para obtener los datos de lotes desde la API
  // 'lots' es la clave del cache, y fetchLots es la función que obtiene los datos
  const { data: lotsData, error, isLoading } = useQuery('lots', fetchLots);

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

  const editLot = useCallback((lot: Lot) => {
    console.log(`Editar Lote ${lot.id}`);
  }, []);

  const deleteLot = useCallback((lot: Lot) => {
    console.log(`Eliminar Lote ${lot.id}`);
  }, []);

  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título y un botón para agregar un nuevo lote */}
      <PageHeader
        title="Lotes"
        showButton={true}
        buttonText="Nuevo"
        href="/admin/lots/new"
      />
      <Suspense fallback={<Spinner />}>
        <Box mt={8}>
          {/* Tabla de datos con paginación, manejo de errores y estado de carga */}
          <DataTable
            data={lotsData}
            columns={columns}
            isLoading={isLoading}
            error={error as Error}
            actions={[
              {
                label: 'Editar',
                icon: <EditIcon />,
                onClick: editLot, // Función que se ejecuta al hacer clic en "Editar"
              },
              {
                label: 'Eliminar',
                icon: <DeleteIcon />,
                onClick: deleteLot, // Función que se ejecuta al hacer clic en "Eliminar"
              },
            ]}
          />
        </Box>
      </Suspense>
    </Box>
  );
}
