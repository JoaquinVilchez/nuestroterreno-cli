import { Box, Text, SimpleGrid, Tooltip } from '@chakra-ui/react';

const boxColors = {
  notDrawn: 'gray.100',
  drawn: 'green.400',
};
const borderColors = {
  notDrawn: 'gray.300',
  drawn: 'green.500',
};
const tooltipColors = {
  notDrawn: 'red.500',
  drawn: 'green.500',
};
// Definimos un tipo para el objeto `group`
interface GroupType {
  incumbent: number;
  alternate: number;
  group: number;
}

interface DrawProgressProps {
  draws: {
    cpd: GroupType[];
    general: GroupType[];
  };
  drawed: number;
}

let blockId = 1; // Inicializamos el contador de IDs

// Función para renderizar los bloques de titulares y suplentes
const renderGroup = (group: GroupType, title: string, drawed: number) => {
  return (
    <Box key={group.group} mb={4}>
      <Text mb={2} fontWeight="bold">
        {title.toUpperCase()} - GRUPO {group.group}
      </Text>
      <SimpleGrid columns={60} spacing={0.5}>
        {Array.from({ length: group.incumbent }).map((_, i) =>
          renderBlock(i + 1, 'incumbent', drawed),
        )}
        {Array.from({ length: group.alternate }).map((_, i) =>
          renderBlock(i + 1 + group.incumbent, 'alternate', drawed),
        )}
      </SimpleGrid>
    </Box>
  );
};

// Función para cada bloque, con ID único
const renderBlock = (number: number, type: string, drawed: number) => {
  const tooltipColor =
    blockId <= drawed ? tooltipColors.drawn : tooltipColors.notDrawn;
  const boxColor = blockId <= drawed ? boxColors.drawn : boxColors.notDrawn;
  const borderColor =
    blockId <= drawed ? borderColors.drawn : borderColors.notDrawn;
  const textColor = blockId <= drawed ? 'white' : 'gray.500';
  const textLabel = `Sorteo ${number} - (${blockId})`;

  const block = (
    <Tooltip label={textLabel} key={blockId} color="white" bg={tooltipColor}>
      <Box
        key={blockId}
        w="15px"
        h="15px"
        bg={boxColor}
        color={textColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="4px"
        border="1px solid"
        borderColor={borderColor} // Definimos el color del borde aquí
      ></Box>
    </Tooltip>
  );

  blockId++; // Incrementamos el ID para el próximo bloque
  return block;
};

const DrawProgress = ({ draws, drawed = 0 }: DrawProgressProps) => {
  // Valor por defecto para drawed
  blockId = 1; // Reinicializamos el ID al renderizar el componente
  return (
    <Box maxW="6xl" mx="auto" p={4} boxShadow="lg" borderRadius="md" bg="white">
      {/* Grupo 1 - CPD */}
      {renderGroup(draws.cpd[0], 'CPD', drawed)}
      {/* Grupo 1 - Generales */}
      {renderGroup(draws.general[0], 'Generales', drawed)}
      {/* Grupo 2 - CPD */}
      {renderGroup(draws.cpd[1], 'CPD', drawed)}
      {/* Grupo 2 - Generales */}
      {renderGroup(draws.general[1], 'Generales', drawed)}
    </Box>
  );
};

export default DrawProgress;
