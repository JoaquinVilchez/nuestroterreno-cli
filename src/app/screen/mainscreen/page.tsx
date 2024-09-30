'use client';

import { Box, Image, Text } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent';
import { getFullName } from '@/utils/formatters';
import { TranslateCatalog } from '@/utils/catalogs';

export default function MainScreenPage() {
  const content = useSocketContent('mainScreen');

  const renderContent = () => {
    console.log('renderContent: ', content);

    switch (content.type) {
      case 'lastWinner': {
        if (content.data) {
          return (
            <Box
              id="nextDrawScreen"
              height="100vh"
              width="100vw"
              padding="50px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDir="column"
              bgImage="url('/trama_nuestro-terreno.png')"
              bgRepeat="repeat"
            >
              <Image
                src="/logo_nuestro-terreno.png"
                width="20%"
                alt="Logo Nuestro Terreno"
              />
              <Box>
                <Box>
                  <Text
                    fontSize="7xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                  >
                    ÚLTIMO GANADOR
                  </Text>
                  <Text
                    fontSize="6xl"
                    bg="#FA3232"
                    px="40"
                    mt={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    {`${content.data.participant.id} - ${getFullName(content.data.participant.firstName, content.data.participant.lastName)}`}
                  </Text>
                </Box>
                <Text
                  fontSize="5xl"
                  bg="#FA3232"
                  px="40"
                  mt={6}
                  textAlign="center"
                  sx={{ textStyle: 'customText' }}
                  color="white"
                >
                  {content.data.lot && content.data.lot.denomination
                    ? `${content.data.lot.denomination.toUpperCase()}`
                    : `SUPLENTE NRO: ${content.data.orderNumber}`}
                </Text>
                <Box display="flex" gap={4} mt={6}>
                  <Text
                    fontSize="5xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    GRUPO {content.data.group}
                  </Text>
                  <Text
                    fontSize="5xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    {content.data.drawType.toUpperCase()}
                  </Text>
                </Box>
              </Box>
              <Image
                src="/logo_mvt.png"
                width="10%"
                alt="Logo Nuestro Terreno"
              />
            </Box>
          );
        }
      }

      case 'winnerInfo': {
        if (content.data) {
          return (
            <Box
              id="winnerInfoScreen"
              height="100vh"
              width="100vw"
              padding="50px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDir="column"
              bgImage="url('/trama_nuestro-terreno.png')"
              bgRepeat="repeat"
            >
              <Image
                src="/logo_nuestro-terreno.png"
                width="20%"
                alt="Logo Nuestro Terreno"
              />
              <Box>
                <Box>
                  <Text
                    fontSize="8xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                  >
                    ¡FELICITACIONES!
                  </Text>
                  <Text
                    fontSize="7xl"
                    bg="#FA3232"
                    px="40"
                    mt={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    {`${content.data.participant.id} - ${getFullName(content.data.participant.firstName, content.data.participant.lastName)}`}
                  </Text>
                </Box>
                <Box display="flex" gap={4} mt={6}>
                  <Text
                    fontSize="4xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                  >
                    {content.data.lot && content.data.lot.denomination
                      ? `${content.data.lot.denomination.toUpperCase()}`
                      : `SUPLENTE NRO: ${content.data.orderNumber}`}
                  </Text>
                  <Text
                    fontSize="4xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    GRUPO {content.data.group}
                  </Text>
                  <Text
                    fontSize="4xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    {content.data.drawType.toUpperCase()}
                  </Text>
                </Box>
              </Box>
              <Image
                src="/logo_mvt.png"
                width="10%"
                alt="Logo Nuestro Terreno"
              />
            </Box>
          );
        }
      }

      case 'nextDraw': {
        if (content.data) {
          return (
            <Box
              id="nextDrawScreen"
              height="100vh"
              width="100vw"
              padding="50px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDir="column"
              bgImage="url('/trama_nuestro-terreno.png')"
              bgRepeat="repeat"
            >
              <Image
                src="/logo_nuestro-terreno.png"
                width="20%"
                alt="Logo Nuestro Terreno"
              />
              <Box>
                <Box>
                  <Text
                    fontSize="7xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                  >
                    PRÓXIMO SORTEO
                  </Text>
                  <Text
                    fontSize="7xl"
                    bg="#FA3232"
                    px="40"
                    mt={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    {content.data.lot && content.data.lot.denomination
                      ? `${content.data.lot.denomination.toUpperCase()}`
                      : `SUPLENTE NRO: ${content.data.orderNumber}`}
                  </Text>
                </Box>
                <Box display="flex" gap={4} mt={6}>
                  <Text
                    fontSize="6xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    GRUPO {content.data.group}
                  </Text>
                  <Text
                    fontSize="6xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    color="white"
                  >
                    {content.data.drawType}
                  </Text>
                </Box>
              </Box>
              <Image
                src="/logo_mvt.png"
                width="10%"
                alt="Logo Nuestro Terreno"
              />
            </Box>
          );
        }
      }

      case 'nextCategory': {
        if (content.data) {
          return (
            <Box
              id="nextDrawScreen"
              height="100vh"
              width="100vw"
              padding="50px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDir="column"
              bgImage="url('/trama_nuestro-terreno.png')"
              bgRepeat="repeat"
            >
              <Image
                src="/logo_nuestro-terreno.png"
                width="20%"
                alt="Logo Nuestro Terreno"
              />
              <Box display="flex" flexDirection="column" gap={4} mt={6}>
                <Text
                  fontSize="7xl"
                  mb={0}
                  textAlign="center"
                  sx={{ textStyle: 'customText' }}
                >
                  PRÓXIMA CATEGORÍA
                </Text>
                <Text
                  fontSize="7xl"
                  bg="#FA3232"
                  px="40"
                  mt={0}
                  textAlign="center"
                  sx={{ textStyle: 'customText' }}
                  color="white"
                >
                  {content.data.group === '1'
                    ? 'GRUPO 1 - FAMILIAR '
                    : 'GRUPO 2 - INDIVIDUAL'}
                </Text>
                <Text
                  fontSize="6xl"
                  bg="#FA3232"
                  px="10"
                  w="100%"
                  textAlign="center"
                  sx={{ textStyle: 'customText' }}
                  color="white"
                >
                  {content.data.drawType === 'CPD'
                    ? 'CUPO POR DISCAPACIDAD'
                    : 'GENERAL'}
                </Text>
                <Text
                  fontSize="6xl"
                  bg="#FA3232"
                  px="10"
                  w="100%"
                  textAlign="center"
                  sx={{ textStyle: 'customText' }}
                  color="white"
                >
                  {content.data.resultType === 'incumbent'
                    ? 'TITULARES'
                    : 'SUPLENTES'}
                </Text>
              </Box>
              <Image
                src="/logo_mvt.png"
                width="10%"
                alt="Logo Nuestro Terreno"
              />
            </Box>
          );
        }
      }

      case 'lastResults': {
        if (content.data) {
          return (
            <Box
              id="lastResultsScreen"
              height="100vh"
              width="100%"
              padding="50px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDir="column"
              bgImage="url('/trama_nuestro-terreno.png')"
              bgRepeat="repeat"
            >
              <Image
                src="/logo_nuestro-terreno.png"
                width="20%"
                alt="Logo Nuestro Terreno"
              />
              <Box w="90%">
                <Box>
                  <Text
                    fontSize="6xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                  >
                    ÚLTIMOS RESULTADOS
                  </Text>
                  <Box display="flex" gap={4} mt={6}>
                    {content.data.params.resultType && (
                      <Text
                        fontSize="2xl"
                        bg="#11929b"
                        w="100%"
                        textAlign="center"
                        color="white"
                      >
                        {TranslateCatalog[
                          content.data.params.resultType
                        ].toUpperCase()}
                      </Text>
                    )}
                    {content.data.params.group && (
                      <Text
                        fontSize="2xl"
                        bg="#11929b"
                        w="100%"
                        textAlign="center"
                        color="white"
                      >
                        GRUPO {content.data.params.group}
                      </Text>
                    )}
                    {content.data.params.drawType && (
                      <Text
                        fontSize="2xl"
                        bg="#11929b"
                        w="100%"
                        textAlign="center"
                        color="white"
                      >
                        {content.data.params.drawType.toUpperCase()}
                      </Text>
                    )}
                  </Box>
                  {content.data.results.map((winner: any, index: number) => (
                    <Box
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                      mt={4}
                      minH="100px"
                      bg="#FA3232"
                      key={index} // Aquí agregas la prop `key`
                    >
                      <Text
                        fontSize="4xl"
                        w="60%"
                        textAlign="left"
                        px="50px"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                      >
                        {`${winner.participant.id} - ${getFullName(winner.participant.firstName, winner.participant.lastName)}`}
                      </Text>
                      <Text
                        alignItems="center"
                        color="white"
                        display="flex"
                        fontSize="4xl"
                        justifyContent="center"
                        pr="50px"
                        textAlign="center"
                        w="20%"
                      >
                        {winner.drawType.toUpperCase()}
                      </Text>
                      <Text
                        fontSize="4xl"
                        textAlign="left"
                        w="20%"
                        pr="50px"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {winner.lot?.denomination
                          ? `${winner.lot.denomination.toUpperCase()}`
                          : `ORDEN: ${winner.orderNumber}`}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Image
                src="/logo_mvt.png"
                width="10%"
                alt="Logo Nuestro Terreno"
              />
            </Box>
          );
        }
      }

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

  return (
    <Box height="100vh" fontFamily="MADE Outer Sans Alt, sans-serif">
      {renderContent()}
    </Box>
  );
}
