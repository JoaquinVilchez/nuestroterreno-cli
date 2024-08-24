'use client';

import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel, // Asegúrate de importar el modelo filtrado
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
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import useCustomToast from './Toast';
import { SearchIcon } from '@chakra-ui/icons';

interface Action<TData> {
  label: string;
  icon?: React.ReactElement;
  onClick: (row: TData) => void;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: Action<TData>[];
  filter?: boolean;
  isLoading?: boolean;
  error?: Error | null;
}

export default function DataTable<TData>({
  data,
  columns,
  actions = [],
  filter = true,
  isLoading = false,
  error = null,
}: DataTableProps<TData>) {
  // Estado para paginación
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState(''); // Estado para el término del filtro

  const showToast = useCustomToast();

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil((data?.length || 0) / pageSize),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
      globalFilter, // Pasamos el filtro global al estado de la tabla
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
    getFilteredRowModel: getFilteredRowModel(), // Asegura que el modelo filtrado esté incluido
    onGlobalFilterChange: setGlobalFilter, // Función que actualiza el filtro global
  });

  // Hook de Chakra para controlar la visibilidad del modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estado para guardar la fila seleccionada
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

  const handleDeleteClick = (row: TData) => {
    setSelectedRow(row);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedRow) {
      actions
        .find((action) => action.label === 'Eliminar')
        ?.onClick(selectedRow);
      onClose();
    }
  };

  if (error) {
    showToast({
      title: 'Error',
      description: `Error al cargar los datos: ${error.message}`,
      status: 'error',
    });
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">Error al cargar los datos: {error.message}</Text>
      </Box>
    );
  }

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

  if (!data || data.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text>No hay datos disponibles.</Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filtro Global */}
      {filter && (
        <Box mb={8} display="flex" alignItems="center">
          <InputGroup minWidth={100}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Buscar..."
              value={globalFilter ?? ''} // Se asegura de que el filtro sea una cadena vacía si es nulo o indefinido
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </InputGroup>
        </Box>
      )}
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
                {actions.length > 0 && <Th textAlign="right">Acciones</Th>}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                sx={{
                  _hover: {
                    backgroundColor: 'gray.50',
                  },
                }}
              >
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
                          {action.label === 'Eliminar' ? (
                            <IconButton
                              aria-label={action.label}
                              icon={action.icon}
                              onClick={() => handleDeleteClick(row.original)} // Abre el modal de confirmación
                            />
                          ) : (
                            <IconButton
                              aria-label={action.label}
                              icon={action.icon}
                              onClick={() => action.onClick(row.original)} // Ejecuta la función personalizada
                            />
                          )}
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
        <Box display="flex" gap={5}>
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
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={10}
        >
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

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        title="¿Estás seguro?"
        body={`¿Seguro que quieres eliminar el elemento seleccionado?`}
        isOpen={isOpen} // Controla la visibilidad del modal
        onClose={onClose} // Cierra el modal
        onConfirm={confirmDelete} // Confirma la eliminación
      />
    </Box>
  );
}
