'use client';

import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  HStack,
  Box,
  Button,
  Select,
  Tooltip,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Action<TData> {
  label: string;
  icon?: React.ReactElement;
  onClick: (row: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: Action<TData>[];
  isLoading?: boolean; // Prop para el estado de carga
  error?: Error | null; // Prop para manejar errores
}

export default function DataTable<TData>({
  data,
  columns,
  actions = [],
  isLoading = false,
  error = null,
}: DataTableProps<TData>) {
  // Estado para paginación
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil((data?.length || 0) / pageSize),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Si hay un error, lo mostramos
  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">Error al cargar los datos: {error.message}</Text>
      </Box>
    );
  }

  // Si está cargando, mostramos un spinner centrado
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  // Si no hay datos, mostramos un mensaje amigable
  if (!data || data.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text>No hay datos disponibles.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer w="100%">
        <Table variant="simple" size="sm">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                ))}
                {actions.length > 0 && <Th>Acciones</Th>}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
                {actions.length > 0 && (
                  <Td textAlign="right">
                    <HStack justifyContent="flex-end" spacing={2}>
                      {actions.map((action, index) => (
                        <Tooltip label={action.label} key={index}>
                          <IconButton
                            aria-label={action.label}
                            icon={action.icon}
                            onClick={() => action.onClick(row.original)}
                          />
                        </Tooltip>
                      ))}
                    </HStack>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Controles de paginación */}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
        <Box>
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </Box>
        <Box>
          <Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            width="fit-content"
          >
            {[10, 50, 100].map((size) => (
              <option key={size} value={size}>
                Mostrar {size}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
}
