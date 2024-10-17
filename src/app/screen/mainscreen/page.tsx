'use client';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent';
import { getFullName } from '@/utils/formatters';
import { TranslateCatalog } from '@/utils/catalogs';
import { ResultType } from '@/types/resultType';
import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion';
import { chakra, shouldForwardProp } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import confettiAnimation from '../../../../public/lottie/confettiAnimation.json';

export default function MainScreenPage() {
  const content = useSocketContent('mainScreen');

  // Función auxiliar para crear componentes animados de Chakra UI
  const motionChakra = (component: any) =>
    chakra(motion(component), {
      shouldForwardProp: (prop) =>
        isValidMotionProp(prop) || shouldForwardProp(prop),
    });

  // Componentes animados
  const MotionBox = motionChakra(Box);
  const MotionText = motionChakra(Text);
  const MotionImage = motionChakra(Image);

  const energeticTextVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: [0, -5, 5, -5, 5, 0], // Rotación ligera
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        y: { type: 'spring', stiffness: 100 },
        rotate: {
          duration: 1.5,
          ease: 'easeInOut',
        },
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: { opacity: 1, scale: 1 },
    transition: {
      duration: 1, // Duración del fade-in y fade-out
      ease: 'easeInOut',
    },
  };

  const screenVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.75, // Comienza después de 1 segundo (después del título)
        staggerChildren: 0.35, // Intervalo de 0.5 segundos entre cada elemento
      },
    },
  };

  const renderContent = () => {
    switch (content.type) {
      case 'lastWinner': {
        if (content.data) {
          return (
            <motion.div
              key={`screen-${content.type}`}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
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
                {/* Logo superior sin animación */}
                <Image
                  src="/logo_nuestro-terreno.png"
                  width="20%"
                  alt="Logo Nuestro Terreno"
                />
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="7xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ÚLTIMO GANADOR
                  </MotionText>
                  {/* Contenedor de los elementos animados */}
                  <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    w="100%"
                  >
                    {/* Nombre del Participante */}
                    <MotionText
                      fontSize="6xl"
                      bg="#FA3232"
                      px="40"
                      mt={6}
                      textAlign="center"
                      color="white"
                      variants={fadeInUpVariants}
                    >
                      {`${content.data.participant.id} - ${getFullName(
                        content.data.participant.firstName,
                        content.data.participant.lastName,
                      )}`}
                    </MotionText>
                    {/* Lote o Número de Suplente */}
                    <MotionText
                      fontSize="5xl"
                      bg="#FA3232"
                      px="40"
                      mt={6}
                      textAlign="center"
                      color="white"
                      variants={fadeInUpVariants}
                    >
                      {content.data.lot && content.data.lot.denomination
                        ? `${content.data.lot.denomination.toUpperCase()}`
                        : `SUPLENTE NRO: ${content.data.orderNumber}`}
                    </MotionText>
                    {/* Caja flex para GRUPO y Tipo de Sorteo */}
                    <Box display="flex" gap={4} mt={6} w="100%">
                      {/* GRUPO */}
                      <MotionText
                        fontSize="5xl"
                        bg="#FA3232"
                        flex="1"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        GRUPO {content.data.group}
                      </MotionText>
                      {/* Tipo de Sorteo */}
                      <MotionText
                        fontSize="5xl"
                        bg="#FA3232"
                        flex="1"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        {content.data.drawType.toUpperCase()}
                      </MotionText>
                    </Box>
                  </MotionBox>
                </Box>
                <Image
                  src="/logo_mvt.png"
                  width="10%"
                  alt="Logo Nuestro Terreno"
                />
              </Box>
              {/* Logo inferior sin animación */}
            </motion.div>
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
              position="relative" // 1. Añadido para establecer el contexto de posicionamiento
            >
              {/* Logo superior sin animación */}
              <Image
                src="/logo_nuestro-terreno.png"
                width="20%"
                alt="Logo Nuestro Terreno"
              />

              {/* Contenedor del contenido principal */}
              <Box>
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="8xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    variants={energeticTextVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ¡FELICITACIONES!
                  </MotionText>

                  {/* Nombre del Participante */}
                  <MotionText
                    fontSize="7xl"
                    bg="#FA3232"
                    px="40"
                    mt={6}
                    textAlign="center"
                    color="white"
                    variants={energeticTextVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {`${content.data.participant.id} - ${getFullName(
                      content.data.participant.firstName,
                      content.data.participant.lastName,
                    )}`}
                  </MotionText>
                </Box>

                {/* Información adicional */}
                <Box display="flex" gap={4} mt={6}>
                  <MotionText
                    fontSize="4xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                    variants={energeticTextVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {content.data.lot && content.data.lot.denomination
                      ? `${content.data.lot.denomination.toUpperCase()}`
                      : `SUPLENTE NRO: ${content.data.orderNumber}`}
                  </MotionText>
                  <MotionText
                    fontSize="4xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                    variants={energeticTextVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    GRUPO {content.data.group}
                  </MotionText>
                  <MotionText
                    fontSize="4xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                    variants={energeticTextVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {content.data.drawType.toUpperCase()}
                  </MotionText>
                </Box>
              </Box>

              {/* Logo inferior sin animación */}
              <Image
                src="/logo_mvt.png"
                width="10%"
                alt="Logo Municipalidad de Venado Tuerto"
              />

              {/* 2. Envolver la animación de Lottie en un Box absolutamente posicionado */}
              <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                pointerEvents="none" // 3. Permite que los clics pasen a través de la animación si es necesario
                zIndex="10" // Asegura que esté por encima de otros elementos
              >
                <Lottie
                  animationData={confettiAnimation}
                  loop={6} // Reproduce la animación 3 veces
                  style={{ width: '150%', height: '150%' }}
                />
              </Box>
            </Box>
          );
        }
      }

      case 'nextDraw': {
        if (content.data) {
          return (
            <motion.div
              key={`screen-${content.type}`}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
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
                {/* Logo superior sin animación */}
                <Image
                  src="/logo_nuestro-terreno.png"
                  width="20%"
                  alt="Logo Nuestro Terreno"
                />
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="7xl"
                    mb={4}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    PRÓXIMO SORTEO
                  </MotionText>
                  {/* Contenedor de los elementos animados */}
                  <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Lote o Número de Suplente */}
                    <MotionText
                      fontSize="7xl"
                      bg="#FA3232"
                      px="40"
                      mt={0}
                      textAlign="center"
                      color="white"
                      variants={fadeInUpVariants}
                    >
                      {content.data.lot && content.data.lot.denomination
                        ? `${content.data.lot.denomination.toUpperCase()}`
                        : `SUPLENTE NRO: ${content.data.orderNumber}`}
                    </MotionText>
                    {/* GRUPO y Tipo de Sorteo */}
                    <Box display="flex" gap={4} mt={6}>
                      <MotionText
                        fontSize="6xl"
                        bg="#FA3232"
                        w="100%"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        GRUPO {content.data.group}
                      </MotionText>
                      <MotionText
                        fontSize="6xl"
                        bg="#FA3232"
                        w="100%"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        {content.data.drawType.toUpperCase()}
                      </MotionText>
                    </Box>
                  </MotionBox>
                </Box>
                {/* Logo inferior sin animación */}
                <Image
                  src="/logo_mvt.png"
                  width="10%"
                  alt="Logo Nuestro Terreno"
                />
              </Box>
            </motion.div>
          );
        }
      }

      case 'nextCategory': {
        if (content.data) {
          return (
            <motion.div
              key={`screen-${content.type}`}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
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
                {/* Logo superior sin animación */}
                <Image
                  src="/logo_nuestro-terreno.png"
                  width="20%"
                  alt="Logo Nuestro Terreno"
                />
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="7xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    PRÓXIMA CATEGORÍA
                  </MotionText>
                  {/* Contenedor de los elementos animados */}
                  <MotionBox
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    mt={6}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Grupo */}
                    <MotionText
                      fontSize="7xl"
                      bg="#FA3232"
                      px="40"
                      mt={0}
                      textAlign="center"
                      color="white"
                      variants={fadeInUpVariants}
                    >
                      {content.data.group === '1'
                        ? 'GRUPO 1 - FAMILIAR'
                        : 'GRUPO 2 - INDIVIDUAL'}
                    </MotionText>
                    {/* Tipo de Sorteo */}
                    <MotionText
                      fontSize="6xl"
                      bg="#FA3232"
                      px="10"
                      w="100%"
                      textAlign="center"
                      color="white"
                      variants={fadeInUpVariants}
                    >
                      {content.data.drawType.toUpperCase() === 'CPD'
                        ? 'CUPO POR DISCAPACIDAD'
                        : 'GENERAL'}
                    </MotionText>
                    {/* Tipo de Resultado */}
                    <MotionText
                      fontSize="6xl"
                      bg="#FA3232"
                      px="10"
                      w="100%"
                      textAlign="center"
                      color="white"
                      variants={fadeInUpVariants}
                    >
                      {content.data.resultType === 'incumbent'
                        ? 'TITULARES'
                        : 'SUPLENTES'}
                    </MotionText>
                  </MotionBox>
                </Box>
                {/* Logo inferior sin animación */}
                <Image
                  src="/logo_mvt.png"
                  width="10%"
                  alt="Logo Nuestro Terreno"
                />
              </Box>
            </motion.div>
          );
        }
      }

      case 'lastResults': {
        if (content.data) {
          return (
            <motion.div
              key={`screen-${content.type}`}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
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
                {/* Logo superior sin animación */}
                <Image
                  src="/logo_nuestro-terreno.png"
                  width="20%"
                  alt="Logo Nuestro Terreno"
                />
                {/* Título animado */}
                <Box
                  w="100%"
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MotionText
                    fontSize="6xl"
                    mb={0}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ÚLTIMOS RESULTADOS
                  </MotionText>
                  {/* Contenedor de filtros y resultados */}
                  <MotionBox
                    w="90%"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Filtros animados */}
                    <MotionBox display="flex" gap={4} mt={6}>
                      {content.data.params.resultType && (
                        <MotionText
                          fontSize="3xl"
                          bg="#11929b"
                          w="100%"
                          textAlign="center"
                          color="white"
                          variants={fadeInUpVariants}
                        >
                          {TranslateCatalog[
                            content.data.params.resultType as ResultType
                          ].toUpperCase()}
                        </MotionText>
                      )}
                      {content.data.params.group && (
                        <MotionText
                          fontSize="3xl"
                          bg="#11929b"
                          w="100%"
                          textAlign="center"
                          color="white"
                          variants={fadeInUpVariants}
                        >
                          GRUPO {content.data.params.group}
                        </MotionText>
                      )}
                      {content.data.params.drawType && (
                        <MotionText
                          fontSize="3xl"
                          bg="#11929b"
                          w="100%"
                          textAlign="center"
                          color="white"
                          variants={fadeInUpVariants}
                        >
                          {content.data.params.drawType.toUpperCase()}
                        </MotionText>
                      )}
                    </MotionBox>
                    {/* Lista de resultados animados */}
                    {content.data.results.map((winner: any, index: number) => (
                      <MotionBox
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                        mt={4}
                        minH="100px"
                        bg="#FA3232"
                        key={index}
                        variants={fadeInLeftVariants}
                      >
                        <Text
                          fontSize="32px"
                          w="60%"
                          textAlign="left"
                          px="50px"
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="start"
                        >
                          {`${winner.participant.id} - ${getFullName(
                            winner.participant.firstName,
                            winner.participant.lastName,
                          )}`}
                        </Text>
                        <Text
                          alignItems="center"
                          color="white"
                          display="flex"
                          fontSize="32px"
                          justifyContent="center"
                          pr="50px"
                          textAlign="center"
                          w="20%"
                        >
                          {winner.drawType.toUpperCase()}
                        </Text>
                        <Text
                          fontSize="32px"
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
                      </MotionBox>
                    ))}
                  </MotionBox>
                </Box>
                {/* Logo inferior sin animación */}
                <Image
                  src="/logo_mvt.png"
                  width="10%"
                  alt="Logo Nuestro Terreno"
                />
              </Box>
            </motion.div>
          );
        }
      }

      case 'defaultPage': {
        return (
          <motion.div
            key="defaultPage"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Box
              id="defaultPageScreen"
              height="100vh"
              width="100vw"
              padding="50px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              bgImage="url('/trama_nuestro-terreno.png')"
              bgRepeat="repeat"
            >
              <Flex alignItems="center" justifyContent="center" gap="100px">
                <MotionImage
                  src="/logo_nuestro-terreno.png"
                  width="500px"
                  alt="Logo Nuestro Terreno"
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <MotionImage
                  src="/logo_mvt.png"
                  width="450px"
                  alt="Logo Municipalidad de Venado Tuerto"
                  variants={logoVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
              </Flex>
            </Box>
          </motion.div>
        );
      }

      case 'qrPage': {
        return (
          <motion.div
            key="defaultPage"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Box>
              <Box
                id="defaultPageScreen"
                height="100vh"
                width="100vw"
                padding="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir="column"
                bgImage="url('/trama_nuestro-terreno.png')"
                bgRepeat="repeat"
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                >
                  <MotionText
                    fontSize="6xl"
                    mb={0}
                    lineHeight={1.5}
                    textAlign="center"
                    sx={{ textStyle: 'customText' }}
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ACCEDÉ A TODOS LOS RESULTADOS
                  </MotionText>
                  <MotionText
                    fontSize="5xl"
                    mb={0}
                    lineHeight={1.5}
                    textAlign="center"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    WWW.NUESTROTERRENO.COM.AR
                  </MotionText>
                  <MotionImage
                    src="/qrweb.png"
                    width="500px"
                    mt={10}
                    borderRadius="15px" // Aplica el radio del borde al contenedor
                    overflow="hidden" // Asegura que el contenido interno no se desborde del borde redondeado
                    boxShadow="24px 24px 0px #2AC5D3" // Aplica sombra al contenedor
                    variants={logoVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  />
                </Flex>
              </Box>
            </Box>
          </motion.div>
        );
      }

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
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </Box>
  );
}
