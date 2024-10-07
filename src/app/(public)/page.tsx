'use client';

import {
  Flex,
  Button,
  VStack,
  Text,
  Box,
  Image,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import DataTable from '../components/DataTable';
import { Suspense } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Result } from '@/types/result';
import { getFullName } from '@/utils/formatters';
import catalogs from '@/utils/catalogs';
import { useGetMany } from '@/services/getManyService';
import { useQuery } from 'react-query';

export default function LandingPage() {
  const { resultCatalog } = catalogs;
  const { getMany } = useGetMany();
  const { data, refetch, isFetching } = useQuery('resultsData', () =>
    getMany(resultCatalog, {
      orderBy: 'DESC',
      includes: ['lot', 'participant'],
    }),
  );

  const columns: ColumnDef<Result>[] = [
    {
      id: 'id',
      header: 'Bolilla',
      accessorFn: (row) => row.participant.id,
      cell: (info) => info.getValue(),
    },
    {
      id: 'fullName',
      header: 'Nombre completo',
      accessorFn: (row) =>
        getFullName(row.participant.firstName, row.participant.lastName),
      cell: (info) => info.getValue(),
    },
    {
      id: 'lote',
      header: 'Lote',
      accessorFn: (row) => {
        const lot = row.lot;
        const ballNumber = row.orderNumber;
        return lot?.denomination
          ? lot.denomination.toUpperCase()
          : `SUPLENTE - NRO ${ballNumber}`;
      },
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'group',
      header: 'Grupo',
    },
    {
      accessorKey: 'drawType',
      header: 'Tipo de sorteo',
    },
  ];

  const handleLink = () => {
    window.open(
      'https://drive.google.com/file/d/1uUYPlMDqkVpw72VTuSG5FOOlrx1ahmZ9/view?usp=sharing',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <VStack>
      {/* Banner superior */}
      <Flex
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        w="full"
        minH="600px"
        bgImage="url('/hero.jpeg')"
        bgSize="cover"
        bgPosition={{ center: 'center center', md: 'center -200px' }} // Desplaza la imagen 100px hacia abajo
        bgRepeat="no-repeat"
        position="relative"
        sx={{
          '@media(max-width: 768px)': {
            // Media query para dispositivos móviles
            minH: '500px', // Altura mínima más pequeña para dispositivos móviles
          },
        }}
      >
        {/* Capa de sombra */}
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          bg="blackAlpha.600"
          zIndex="0"
        />
        <Image
          src="/logo_nuestro-terreno.png"
          width={{ base: '100px', md: '200px' }} // 100px en móviles y 200px en pantallas más grandes
          alt="Logo Nuestro Terreno"
          zIndex="1"
        />
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          my={5}
          w="full"
          px={{ base: '5%', md: '0%' }} // Ajuste de padding horizontal para mejor control en móviles
          zIndex={1}
        >
          <Text
            fontSize={{ base: '1em', md: '2em' }}
            lineHeight="1em"
            color="white"
            sx={{ textStyle: 'designFont' }}
          >
            HOY PUEDE SER UN
          </Text>
          <Text
            fontSize={{ base: '2em', md: '4em' }}
            lineHeight=".8em"
            color="white"
            sx={{ textStyle: 'designFont' }}
          >
            ¡GRAN DÍA!
          </Text>
          <Text
            fontSize={{ base: '0.8em', md: '1.5em' }}
            width={{ base: '200px', md: '100%' }}
            textAlign="center"
            lineHeight="1em"
            mt={5}
            color="white"
          >
            ¡SORTEAMOS 100 LOTES Y UNO PUEDE SER TUYO!
          </Text>
        </Flex>
        <Button
          mt="5"
          size={{ base: 'md', md: 'lg' }}
          width={{ base: '300px', md: 'auto' }}
          onClick={handleLink}
        >
          Consultar Listado Definitivo
        </Button>
      </Flex>
      <Flex
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        w="full"
        minH={{ base: 'auto', md: '800px' }}
        bgImage="url('/trama_nuestro-terreno.png')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="relative"
        py={{ base: '50px', md: 100 }}
        px={5}
      >
        <Box
          borderRadius="15px" // Aplica el radio del borde al contenedor
          overflow="hidden" // Asegura que el contenido interno no se desborde del borde redondeado
          boxShadow="4px 4px 0px #2AC5D3" // Aplica sombra al contenedor
          width={{ base: '100%', md: '1280px' }}
          height={{ base: '300px', md: '720px' }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/2xd89B_vvRk?si=gn2DBmbePPTvv_uL"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{
              width: '100%', // Asegura que el iframe se ajuste al tamaño del contenedor Box
              height: '100%', // Asegura que el iframe se ajuste al tamaño del contenedor Box
            }}
          />
        </Box>
      </Flex>
      <Flex
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        w="full"
        py={50}
      >
        <Text
          sx={{ textStyle: 'bigTitle' }}
          fontSize={{ base: '3xl', md: '6xl' }}
          textAlign="center"
          lineHeight="1em"
        >
          ÚLTIMOS RESULTADOS
        </Text>
        <Flex
          w="100%"
          mt={8}
          px={5}
          direction="column"
          justifyContent="center"
          alignItems="center"
          id="results"
        >
          <Button onClick={() => refetch()} isLoading={isFetching} mb={8}>
            ACTUALIZAR RESULTADOS
          </Button>
          <Text fontSize={{ base: 'lg', md: '2xl' }} textAlign="center">
            CONSULTA POR TU NOMBRE O BOLILLA
          </Text>
          <Suspense fallback={<Spinner />}>
            <Box mt={2} w={{ base: '100%', md: '800px' }}>
              <DataTable
                data={data}
                columns={columns}
                dataType={resultCatalog}
                disableDefaultActions={['edit', 'delete']}
              />
            </Box>
          </Suspense>
        </Flex>
        <Box mt={20} textAlign="center" px={5}>
          <Text fontSize={{ base: 'lg', md: '2xl' }} mb={3}>
            ¿SALISTE SORTEADO?
          </Text>
          <Text
            maxW={{ base: '100%', md: '900px' }}
            fontSize={{ base: 'sm', md: 'md' }}
            sx={{ textStyle: 'bodyText' }}
            mb={2}
          >
            Si estás en el Parque, acercate al stand de Nuestro Terreno con tu
            DNI.
          </Text>
          <Text
            maxW={{ base: '100%', md: '900px' }}
            fontSize={{ base: 'sm', md: 'md' }}
            sx={{ textStyle: 'bodyText' }}
            mb={2}
          >
            Si no estas en el Parque, partir del lunes 7/10 comunicate por
            cualquiera de estos medios:
          </Text>
          <Text
            maxW={{ base: '100%', md: '900px' }}
            fontSize={{ base: 'sm', md: 'md' }}
            sx={{ textStyle: 'bodyText' }}
            mb={2}
            color="gray.600"
          >
            📱3462 585207 <br />
            📧programanuestroterreno@gmail.com <br />
            📌Dirección de Tierra y Hábitat (San Martín y Marconi) de lunes a
            viernes de 7 a 13 h.
          </Text>
        </Box>
      </Flex>
      <Box as="footer" py={4} w="full">
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          maxW="1200px"
          mx="auto"
          px={4}
        >
          <Link href="https://venadotuerto.gob.ar/" target="_blank">
            <Image
              src="/logo_mvt.png"
              alt="Logo del Gobierno de Venado Tuerto"
              h={{ base: '50px', md: '70px' }}
            />
          </Link>
          <Flex alignItems="center" flexDirection="column" mt={10} mb={5}>
            <Box mx={10} display="flex" alignItems="center">
              <Link
                href="https://www.facebook.com/VenadoTuertoGobierno"
                target="_blank"
                aria-label="Facebook"
              >
                <Icon as={FaFacebook} boxSize={5} mr={2} />{' '}
                {/* boxSize="5 equivale a 40px */}
              </Link>
              <Link
                href="https://www.instagram.com/venadotuertogob"
                target="_blank"
                aria-label="Instagram"
              >
                <Icon as={FaInstagram} boxSize={5} ml={2} />{' '}
                {/* boxSize="10" equivale a 40px */}
              </Link>
            </Box>
            <Box mt={5}>
              <Link
                href="https://venadotuerto.gob.ar/nuestroterreno/"
                target="_blank"
              >
                <Text fontSize={{ base: 'xs', md: 'md' }} textAlign="center">
                  Política de privacidad
                </Text>
              </Link>
            </Box>
          </Flex>
          <Text fontSize="sm">© Nuestro Terreno 2024</Text>
        </Flex>
      </Box>
    </VStack>
  );
}
