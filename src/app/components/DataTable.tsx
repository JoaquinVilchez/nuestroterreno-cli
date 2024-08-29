'use client';

import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
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
  InputRightElement,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from './ConfirmModal';
import useCustomToast from './Toast';
import { SearchIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { capitalizeFirstLetter } from '@/utils/formatters';

// Types and Interfaces
type WithId = { id: number };

interface DataType {
  type: string; // Para usar en el endpoint
  label: string; // Para usar en mensajes de éxito/error
}

interface Action<TData> {
  label: string;
  icon?: React.ReactElement;
  onClick: (row: TData) => void;
}

interface DataTableProps<TData extends WithId> {
  data: TData[];
  columns: ColumnDef<TData>[];
  actions?: Action<TData>[];
  disableDefaultActions?: string[];
  filter?: boolean;
  isLoading?: boolean;
  error?: Error | null;
  dataType: DataType;
}

// Main Component
export default function DataTable<TData extends WithId>({
  data,
  columns,
  actions = [],
  disableDefaultActions = [],
  filter = true,
  isLoading = false,
  error = null,
  dataType,
}: DataTableProps<TData>) {
  // States
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);
  // Hooks
  const router = useRouter();
  const showToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteClick = useCallback(
    (row: TData) => {
      setSelectedRow(row);
      onOpen();
    },
    [onOpen],
  );

  const confirmDelete = () => {
    if (selectedRow) {
      deleteAction(selectedRow);
      onClose();
    }
  };

  const cancelDelete = () => {
    if (selectedRow) {
      setSelectedRow(null);
      onClose();
    }
  };

  const deleteAction = useCallback(
    async (row: TData) => {
      try {
        console.log(`/admin/${dataType.type}/delete/${row.id}`);
        showToast({
          title: `${capitalizeFirstLetter(dataType.label)} eliminado`,
          description: `El ${dataType.label} ha sido eliminado exitosamente.`,
          status: 'success',
        });
      } catch {
        showToast({
          title: 'Error',
          description: `No se pudo eliminar el ${dataType.label}.`,
          status: 'error',
        });
      }
    },
    [dataType, showToast],
  );

  const editAction = useCallback(
    (row: TData) => {
      router.push(`/admin/${dataType.type}/edit/${row.id}`);
    },
    [dataType, router],
  );

  // Table Configuration
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil((data?.length || 0) / pageSize),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
      globalFilter,
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
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const combinedActions = useMemo(() => {
    const defaultActions: Action<TData>[] = [];

    if (!disableDefaultActions.includes('edit')) {
      defaultActions.push({
        label: 'Editar',
        icon: <EditIcon />,
        onClick: editAction,
      });
    }

    if (!disableDefaultActions.includes('delete')) {
      defaultActions.push({
        label: 'Eliminar',
        icon: <DeleteIcon />,
        onClick: handleDeleteClick,
      });
    }

    return [...defaultActions, ...actions];
  }, [actions, disableDefaultActions, editAction, handleDeleteClick]);

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

  const filteredRows = table.getRowModel().rows;

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
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            {globalFilter && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear search"
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setGlobalFilter('')}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </Box>
      )}

      {filteredRows.length === 0 ? (
        <Box p={4} textAlign="center">
          <Text>No se encontraron coincidencias.</Text>
        </Box>
      ) : (
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
              {filteredRows.map((row) => (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}

                  {combinedActions.length > 0 && (
                    <Td textAlign="right">
                      <HStack justifyContent="flex-end" spacing={2}>
                        {combinedActions.map((action, index) => (
                          <Tooltip label={action.label} key={index}>
                            <IconButton
                              aria-label={action.label}
                              icon={action.icon}
                              onClick={() => {
                                action.onClick(row.original);
                              }}
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
      )}

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
        isOpen={isOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}
