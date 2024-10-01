'use client';

import { Box, Grid, GridItem, Image, Progress, Text } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent'; // Importa el hook
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { waitState } from '@/atoms/waitSate';
import { TranslateCatalog } from '@/utils/catalogs';
import { getFullName } from '@/utils/formatters';
import { ResultType } from '@/types/resultType';
const Clock = dynamic(() => import('react-live-clock'), {
  ssr: false, // Desactiva el renderizado del lado del servidor
});

export default function PrompterPage() {
  const content = useSocketContent('prompter'); // Usa el hook para obtener el contenido específico para prompter
  const getColor = (wait: boolean) => (wait ? 'red' : 'green');
  const wait = useRecoilValue(waitState);
  const statusColor = getColor(wait);

  type DataKey = 'lot' | 'resultType' | 'group' | 'drawType';

  const renderContent = () => {
    console.log('renderContent: ', content);

    switch (content.type) {
      case 'lastWinner': {
        if (content.data) {
          return (
            <Box
              id="lastWinnerScreen"
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
                <Text fontSize="6xl" mb={0} textAlign="center">
                  ÚLTIMO GANADOR
                </Text>
                <Text
                  fontSize="8xl"
                  bg="red.500"
                  px="40"
                  mt={0}
                  textAlign="center"
                >
                  {`${content.data.participant.id} - ${getFullName(content.data.participant.firstName, content.data.participant.lastName)}`}
                </Text>
                <Box textAlign="center">
                  <Box gap={4} display="flex" mt={5}>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      {content.data.lot && content.data.lot.denomination
                        ? `${content.data.lot.denomination.toUpperCase()}`
                        : `SUPLENTE NRO: ${content.data.orderNumber}`}
                    </Text>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      GRUPO {content.data.group}
                    </Text>
                  </Box>
                  <Box gap={4} display="flex" mt={5}>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      {TranslateCatalog[
                        content.data.resultType as ResultType
                      ].toUpperCase()}
                    </Text>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      {content.data.drawType.toUpperCase()}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        }
      }

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
                <Text
                  fontSize="8xl"
                  bg="red.500"
                  px="40"
                  mt={0}
                  textAlign="center"
                >
                  {`${content.data.participant.id} - ${getFullName(content.data.participant.firstName, content.data.participant.lastName)}`}
                </Text>
                <Box textAlign="center">
                  <Box gap={4} display="flex" mt={5}>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      {content.data.lot && content.data.lot.denomination
                        ? `${content.data.lot.denomination.toUpperCase()}`
                        : `SUPLENTE NRO: ${content.data.orderNumber}`}
                    </Text>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      GRUPO {content.data.group}
                    </Text>
                  </Box>
                  <Box gap={4} display="flex" mt={5}>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      {TranslateCatalog[
                        content.data.resultType as ResultType
                      ].toUpperCase()}
                    </Text>
                    <Text fontSize="6xl" w="50%" bg="white" color="black">
                      {content.data.drawType.toUpperCase()}
                    </Text>
                  </Box>
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
          const data: Record<DataKey, string | number> = {
            lot: content.data.nextDraw.lot
              ? content.data.nextDraw.lot.denomination.toUpperCase()
              : content.data.nextDraw.orderNumber,
            resultType:
              TranslateCatalog[
                content.data.nextDraw.resultType as ResultType
              ].toUpperCase(),
            group: content.data.nextDraw.group,
            drawType: content.data.nextDraw.drawType,
          };

          const items: { key: DataKey; label: string }[] = [
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
                  border="4px solid white"
                  minHeight="500px"
                  p={4}
                >
                  <Text fontSize="4xl" textAlign="center">
                    ÚLTIMOS 5 GANADORES
                  </Text>
                  <Box overflowY="auto" maxH="calc(100vh - 150px)">
                    <Grid
                      templateColumns=".75fr 0.25fr .25fr .25fr 0.1fr"
                      bg="white"
                      p={2}
                    >
                      <Text color="black" fontSize="25px" fontWeight="bold">
                        Nombre
                      </Text>
                      <Text color="black" fontSize="25px" fontWeight="bold">
                        Lote
                      </Text>
                      <Text color="black" fontSize="25px" fontWeight="bold">
                        Tipo Ganador
                      </Text>
                      <Text color="black" fontSize="25px" fontWeight="bold">
                        Tipo Sorteo
                      </Text>
                      <Text color="black" fontSize="25px" fontWeight="bold">
                        Orden
                      </Text>
                    </Grid>
                    {content.data.lastResults.map(
                      (winner: any, index: number) => (
                        <Grid
                          key={index}
                          templateColumns=".75fr 0.25fr .25fr .25fr 0.1fr"
                          bg={index % 2 === 0 ? 'black.600' : 'black.700'}
                          p={2}
                        >
                          <GridItem>
                            <Text fontSize="4xl">
                              {`${winner.participant.id} - ${getFullName(winner.participant.firstName, winner.participant.lastName)}`}
                            </Text>
                          </GridItem>
                          <GridItem>
                            <Text fontSize="4xl">
                              {winner.lot?.denomination
                                ? winner.lot.denomination.toUpperCase()
                                : '-'}
                            </Text>
                          </GridItem>
                          <GridItem>
                            <Text fontSize="4xl">
                              {TranslateCatalog[
                                winner.resultType as ResultType
                              ].toUpperCase()}
                            </Text>
                          </GridItem>
                          <GridItem>
                            <Text fontSize="4xl">
                              {winner.drawType.toUpperCase()}
                            </Text>
                          </GridItem>
                          <GridItem>
                            <Text fontSize="4xl">
                              {winner.orderNumber ? winner.orderNumber : '-'}
                            </Text>
                          </GridItem>
                        </Grid>
                      ),
                    )}
                  </Box>
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
                <GridItem colSpan={4}>
                  <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(6, 1fr)"
                  >
                    <GridItem
                      colSpan={6}
                      rowSpan={1}
                      bg="black"
                      border="4px solid white"
                    >
                      <Text fontSize="6xl" textAlign="center">
                        {TranslateCatalog[
                          content.data.nextDraw.resultType as ResultType
                        ].toUpperCase()}
                      </Text>
                    </GridItem>
                    <GridItem
                      colSpan={4}
                      rowSpan={1}
                      bg="black"
                      border="4px solid white"
                    >
                      <Text fontSize="6xl" textAlign="center">
                        {`GRUPO ${content.data.nextDraw.group}`}
                      </Text>
                    </GridItem>
                    <GridItem
                      colSpan={2}
                      rowSpan={1}
                      bg="blue.700"
                      border="4px solid white"
                    >
                      <Text fontSize="4xl" textAlign="center" m="auto">
                        GRUPO
                      </Text>
                      <Text fontSize="6xl" textAlign="center" m="0">
                        {content.data.nextDraw.group} de 2
                      </Text>
                    </GridItem>
                    <GridItem
                      colSpan={4}
                      rowSpan={1}
                      bg="black"
                      border="4px solid white"
                    >
                      <Text fontSize="6xl" textAlign="center">
                        {content.data.nextDraw.drawType}
                      </Text>
                    </GridItem>
                    <GridItem
                      colSpan={2}
                      rowSpan={1}
                      bg="blue.700"
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
                  </Grid>
                  <GridItem
                    colSpan={4}
                    rowSpan={1}
                    height="100%"
                    bg="black"
                    border="4px solid white"
                  />
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
              src="/logo_mvt.png"
              width="30%"
              alt="Logo Municipalidad de Venado Tuerto"
            />
          </Box>
        );

      default:
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="black"
            height="100vh"
          >
            <Text fontSize="2xl" color="white" bg="red" px="15px">
              Sin Señal
            </Text>
          </Box>
        );
    }
  };

  return <Box>{renderContent()}</Box>;
}
