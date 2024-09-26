'use client';

import { Box, Grid, GridItem, Image, Progress, Text } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent'; // Importa el hook
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { waitState } from '@/atoms/waitSate';
import { TranslateCatalog } from '@/utils/catalogs';
import { getFullName } from '@/utils/formatters';
const Clock = dynamic(() => import('react-live-clock'), {
  ssr: false, // Desactiva el renderizado del lado del servidor
});

export default function PrompterPage() {
  const content = useSocketContent('prompter'); // Usa el hook para obtener el contenido específico para prompter
  const wait = useRecoilValue(waitState);
  const getColor = (wait: boolean) => (wait ? 'red' : 'green');
  const statusColor = getColor(wait);

  const renderContent = () => {
    console.log('renderContent: ', content);

    switch (content.type) {
      case 'winnerInfo': {
        if (content.data) {
          return (
            <Box
              id="winnerScreen"
              bg="black"
              color="white"
              height="100vh"
              width="100vw"
              overflow="hidden"
              padding="50px"
              fontWeight="bold"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box>
                <Text fontSize="4xl" mb={0} textAlign="center">
                  GANADOR
                </Text>
                <Text fontSize="8xl" bg="red.500" px="40" mt={0}>
                  {getFullName(
                    content.data.participant.firstName,
                    content.data.participant.lastName,
                  )}
                </Text>
                <Box textAlign="center">
                  <Text fontSize="6xl">
                    {content.data.drawType.toUpperCase()} -{' '}
                    {TranslateCatalog[content.data.resultType].toUpperCase()}
                  </Text>
                  <Text fontSize="2xl">
                    {content.data.lot && content.data.lot.denomination
                      ? `LOTE ${content.data.lot.denomination}`
                      : `SUPLENTE NRO: ${content.data.orderNumber}`}
                  </Text>
                </Box>
              </Box>
              <Progress
                value={60}
                size="lg"
                width="80%"
                height="75px"
                colorScheme="green"
                position="absolute"
                bottom="10px"
              />
            </Box>
          );
        }
      }

      case 'fullInfo':
        if (content.data) {
          const data = {
            lot: content.data.nextDraw.lot
              ? content.data.nextDraw.lot.denomination
              : '-',
            resultType:
              TranslateCatalog[content.data.nextDraw.resultType].toUpperCase(),
            group: content.data.nextDraw.group,
            drawType: content.data.nextDraw.drawType,
          };

          const items = [
            {
              key: 'lot',
              label: content.data.nextDraw.lot ? 'LOTE' : 'NUMERO DE ORDEN',
            },
            { key: 'resultType', label: 'TIPO GANADOR' },
            { key: 'group', label: 'GRUPO' },
            { key: 'drawType', label: 'TIPO SORTEO' },
          ];

          return (
            <Box
              id="fullInfoScreen"
              bg={`${statusColor}.600`}
              color="white"
              height="100vh"
              width="100vw"
              overflow="hidden"
              padding="50px"
              fontWeight="bold"
            >
              <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
              >
                <GridItem
                  colSpan={6}
                  bg="black"
                  height="85px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="4px solid white"
                >
                  <Text fontSize="6xl" fontWeight="bold">
                    <Clock
                      format={'HH:mm:ss'}
                      ticking={true}
                      timezone={'America/Argentina/Buenos_Aires'}
                    />
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={6}
                  bg="black"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="4px solid white"
                >
                  <Text fontSize="8xl" textAlign="center">
                    {TranslateCatalog[
                      content.data.nextDraw.resultType
                    ].toUpperCase()}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={5}
                  bg="black"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="4px solid white"
                >
                  <Text fontSize="8xl" textAlign="center">
                    {`GRUPO ${content.data.nextDraw.group}`}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={1}
                  bg="blue.700"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  border="4px solid white"
                >
                  <Text fontSize="4xl" textAlign="center" m="0">
                    GRUPO
                  </Text>
                  <Text fontSize="6xl" textAlign="center" m="0">
                    {content.data.nextDraw.group} de 2
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={5}
                  bg="black"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="4px solid white"
                >
                  <Text fontSize="8xl" textAlign="center">
                    {content.data.nextDraw.drawType}
                  </Text>
                </GridItem>
                <GridItem
                  colSpan={1}
                  bg="blue.700"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  border="4px solid white"
                >
                  <Text fontSize="4xl" textAlign="center" m="0">
                    SORTEO
                  </Text>
                  <Text fontSize="6xl" textAlign="center" m="0">
                    {content.data.nextDraw.drawNumber} de{' '}
                    {content.data.nextDraw.quantity}
                  </Text>
                </GridItem>

                <GridItem
                  colSpan={2}
                  bg="blue.500"
                  border="4px solid white"
                  height="100vh"
                >
                  <Text fontSize="6xl" textAlign="center" my={4}>
                    PRÓXIMO SORTEO
                  </Text>
                  <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(2, 1fr)"
                    px="10"
                    gap={4}
                  >
                    {items.map((item, index) => (
                      <GridItem
                        key={index}
                        colSpan={1}
                        bg="blue.700"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        border="4px solid white"
                      >
                        <Text fontSize="2xl" textAlign="center" m="0">
                          {item.label}
                        </Text>
                        <Text fontSize="4xl" textAlign="center" m="0">
                          {data[item.key]}
                        </Text>
                      </GridItem>
                    ))}
                  </Grid>
                </GridItem>

                <GridItem
                  colSpan={4}
                  bg="black"
                  border="4px solid white"
                  height="100vh"
                  px={4}
                >
                  <Text fontSize="4xl" textAlign="center">
                    ÚLTIMOS 5 GANADORES
                  </Text>
                  <Box overflowY="auto" maxH="calc(100vh - 150px)">
                    <Grid
                      templateColumns="1fr 0.25fr .25fr .25fr 0.1fr"
                      bg="gray.800"
                      p={2}
                      border="1px solid white"
                    >
                      <Text fontWeight="bold">Nombre</Text>
                      <Text fontWeight="bold">Lote</Text>
                      <Text fontWeight="bold">Tipo Ganador</Text>
                      <Text fontWeight="bold">Tipo Sorteo</Text>
                      <Text fontWeight="bold">Orden</Text>
                    </Grid>
                    {content.data.lastResults.map((winner, index) => (
                      <Grid
                        key={index}
                        templateColumns="1fr 0.25fr .25fr .25fr 0.1fr"
                        bg={index % 2 === 0 ? 'black.600' : 'black.700'}
                        p={2}
                        border="1px solid white"
                      >
                        <GridItem>
                          <Text fontSize="2xl">
                            {`${winner.participant.lastName}, ${winner.participant.firstName}`}
                          </Text>
                        </GridItem>
                        <GridItem>
                          <Text fontSize="2xl">
                            {winner.lot?.denomination
                              ? winner.lot.denomination
                              : '-'}
                          </Text>
                        </GridItem>
                        <GridItem>
                          <Text fontSize="2xl">
                            {TranslateCatalog[winner.resultType].toUpperCase()}
                          </Text>
                        </GridItem>
                        <GridItem>
                          <Text fontSize="2xl">
                            {winner.drawType.toUpperCase()}
                          </Text>
                        </GridItem>
                        <GridItem>
                          <Text fontSize="2xl">
                            {winner.orderNumber ? winner.orderNumber : '-'}
                          </Text>
                        </GridItem>
                      </Grid>
                    ))}
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          );
        }
        break;

      case 'defaultPage':
        console.log('DEFAULTPAGE', content.data);

        return (
          <Box
            p={2}
            borderWidth={1}
            borderRadius="md"
            mb={2}
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/logo.png"
              width="30%"
              alt="Logo Municipalidad de Venado Tuerto"
            />
          </Box>
        );

      default:
        return <p>Dato no reconocido</p>;
    }
  };

  return <Box>{renderContent()}</Box>;
}
