'use client';

import {
  Box,
  chakra,
  Flex,
  Image,
  shouldForwardProp,
  Text,
} from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent'; // Importa el hook
import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion';
import { getFullName } from '@/utils/formatters';
import { TranslateCatalog } from '@/utils/catalogs';
import { ResultType } from '@/types/resultType';
import dynamic from 'next/dynamic';
import Lottie from 'lottie-react';
import confettiAnimation from '../../../../public/lottie/confettiAnimation.json';
const Clock = dynamic(() => import('react-live-clock'), {
  ssr: false, // Desactiva el renderizado del lado del servidor
});

export default function PrompterPage() {
  const content = useSocketContent('broadcast');

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
      case 'winnerInfo': {
        if (content.data) {
          return (
            <Box
              id="winnerInfoScreen"
              height="100vh"
              width="100vw"
              padding="50px"
              display="flex"
              justifyContent="end"
              alignItems="center"
              flexDir="column"
            >
              {/* Contenedor del contenido principal */}
              <Box zIndex={2}>
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="4xl"
                    mb={0}
                    textAlign="center"
                    bg="white"
                    color="black"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ¡FELICITACIONES!
                  </MotionText>

                  {/* Nombre del Participante */}
                  <MotionText
                    fontSize="3xl"
                    bg="#FA3232"
                    px="40"
                    mt={2}
                    textAlign="center"
                    color="white"
                    variants={fadeInUpVariants}
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
                <Box display="flex" gap={2} mt={2}>
                  <MotionText
                    fontSize="2xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {content.data.lot && content.data.lot.denomination
                      ? `${content.data.lot.denomination.toUpperCase()}`
                      : `SUPLENTE NRO: ${content.data.orderNumber}`}
                  </MotionText>
                  <MotionText
                    fontSize="2xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    GRUPO {content.data.group}
                  </MotionText>
                  <MotionText
                    fontSize="2xl"
                    bg="#FA3232"
                    w="100%"
                    textAlign="center"
                    color="white"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {content.data.drawType.toUpperCase()}
                  </MotionText>
                </Box>
              </Box>

              {/* 2. Envolver la animación de Lottie en un Box absolutamente posicionado */}
              <Box
                position="absolute"
                top="100px"
                left="0"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="end"
                pointerEvents="none" // 3. Permite que los clics pasen a través de la animación si es necesario
                zIndex="1" // Asegura que esté por encima de otros elementos
              >
                <Box position="absolute" right="350px">
                  <Lottie
                    animationData={confettiAnimation}
                    loop={true} // Reproduce la animación 3 veces
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
                <Box position="absolute" left="350px">
                  <Lottie
                    animationData={confettiAnimation}
                    loop={true} // Reproduce la animación 3 veces
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              </Box>
            </Box>
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
                justifyContent="end"
                alignItems="center"
                flexDir="column"
              >
                {/* Título animado */}
                <Box
                  w="100%"
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MotionText
                    fontSize="2xl"
                    bg="#fff"
                    mb={2}
                    px={5}
                    textAlign="center"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ÚLTIMOS GANADORES
                  </MotionText>
                  {/* Contenedor de filtros y resultados */}
                  <MotionBox
                    w="90%"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <MotionBox display="flex" gap={2}>
                        {content.data.params.resultType && (
                          <MotionText
                            fontSize="2xl"
                            bg="#11929b"
                            w="300px"
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
                            fontSize="2xl"
                            bg="#11929b"
                            w="300px"
                            textAlign="center"
                            color="white"
                            variants={fadeInUpVariants}
                          >
                            GRUPO {content.data.params.group}
                          </MotionText>
                        )}
                        {content.data.params.drawType && (
                          <MotionText
                            fontSize="2xl"
                            bg="#11929b"
                            w="300px"
                            textAlign="center"
                            color="white"
                            variants={fadeInUpVariants}
                          >
                            {content.data.params.drawType.toUpperCase()}
                          </MotionText>
                        )}
                      </MotionBox>
                    </Box>
                    {/* Lista de resultados animados */}
                    {content.data.results.map((winner: any, index: number) => (
                      <MotionBox
                        display="flex"
                        justifyContent="start"
                        alignItems="center"
                        mt={2}
                        minH="50px"
                        width="80%"
                        px="50px"
                        bg="#FA3232"
                        key={index}
                        variants={fadeInLeftVariants}
                      >
                        <Text
                          fontSize="22px"
                          textAlign="left"
                          color="white"
                          display="flex"
                          alignItems="center"
                          justifyContent="start"
                          width="50%"
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
                          fontSize="22px"
                          justifyContent="start"
                          textAlign="center"
                          width="25%"
                        >
                          {winner.drawType.toUpperCase()}
                        </Text>
                        <Text
                          fontSize="22px"
                          textAlign="left"
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
                padding={30}
                display="flex"
                justifyContent="end"
                alignItems="center"
                flexDir="column"
              >
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="3xl"
                    bg="#fff"
                    mb={2}
                    textAlign="center"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    PRÓXIMA CATEGORÍA
                  </MotionText>
                  {/* Contenedor de los elementos animados */}
                  <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Lote o Número de Suplente */}
                    <MotionText
                      fontSize="3xl"
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
                    {/* GRUPO y Tipo de Sorteo */}
                    <Box display="flex" gap={2} mt={2}>
                      <MotionText
                        fontSize="3xl"
                        bg="#FA3232"
                        w="100%"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        {content.data.drawType.toUpperCase() === 'CPD'
                          ? 'CPD'
                          : 'GENERAL'}
                      </MotionText>
                      <MotionText
                        fontSize="3xl"
                        bg="#FA3232"
                        w="100%"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        {content.data.resultType === 'incumbent'
                          ? 'TITULARES'
                          : 'SUPLENTES'}
                      </MotionText>
                    </Box>
                  </MotionBox>
                </Box>
              </Box>
            </motion.div>
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
                padding={30}
                display="flex"
                justifyContent="end"
                alignItems="center"
                flexDir="column"
              >
                <Box>
                  {/* Título animado */}
                  <MotionText
                    fontSize="3xl"
                    bg="#fff"
                    mb={2}
                    textAlign="center"
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
                      fontSize="3xl"
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
                    <Box display="flex" gap={2} mt={2}>
                      <MotionText
                        fontSize="3xl"
                        bg="#FA3232"
                        w="100%"
                        textAlign="center"
                        color="white"
                        variants={fadeInUpVariants}
                      >
                        GRUPO {content.data.group}
                      </MotionText>
                      <MotionText
                        fontSize="3xl"
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
              </Box>
            </motion.div>
          );
        }
      }

      case 'qrPage':
        return (
          <Flex
            flexDirection="column"
            alignItems="end"
            justifyContent="end"
            height="100vh"
            padding={30}
          >
            <MotionText
              fontSize="xl"
              bg="#FA3232"
              color="#fff"
              width="200px"
              mb={2}
              py={2}
              lineHeight={1}
              textAlign="center"
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
            >
              ACCEDE A LOS RESULTADOS
            </MotionText>
            <MotionImage
              src="/qrweb.png"
              width="200px"
              overflow="hidden" // Asegura que el contenido interno no se desborde del borde redondeado
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            />
          </Flex>
        );

      case 'hideContent':
        return;

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
    <Box
      height="100vh"
      width="100%"
      fontFamily="MADE Outer Sans Alt, sans-serif"
      position="relative"
    >
      {/* Primer Box - Izquierda */}
      <Box position="absolute" height="100vh" width="50%" p={30} left={0}>
        <MotionText
          width="200px"
          bg="#FA3232"
          color="#fff"
          fontSize="lg"
          px={5}
          textAlign="center"
        >
          EN VIVO
        </MotionText>
        <MotionText
          width="200px"
          fontSize="lg"
          bg="#fff"
          px={3}
          textAlign="center"
        >
          VELÓDROMO
        </MotionText>
        <Flex>
          <MotionText
            width="200px"
            fontSize="lg"
            bg="#11929b"
            color="#fff"
            px={5}
            textAlign="center"
          >
            <Clock
              format={'HH:mm'}
              ticking={true}
              timezone={'America/Argentina/Buenos_Aires'}
            />
          </MotionText>
        </Flex>
      </Box>

      <Box position="absolute" height="100vh" right={0} p={30}>
        <Image
          src="/logo_nuestro-terreno.png"
          width="225px"
          alt="Logo Nuestro Terreno"
        />
      </Box>

      {/* Contenido Animado */}
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </Box>
  );
}
