'use client';

import PageHeader from '@/app/components/PageHeader';
import SwitcherButton from '@/app/components/SwitcherButton';
import {
  disconnectSocket,
  emitEvent,
  initiateSocketConnection,
} from '@/utils/socket';
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';

type ButtonAction = 'lastResults' | 'nextLot' | 'defaultPage';

export default function SwitcherPage() {
  const [mainScreenActiveButton, setMainScreenActiveButton] =
    useState<ButtonAction | null>(null);
  const [prompterActiveButton, setPrompterActiveButton] =
    useState<ButtonAction | null>(null);
  const [broadcastActiveButton, setBroadcastActiveButton] =
    useState<ButtonAction | null>(null);

  useEffect(() => {
    initiateSocketConnection();
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleButton = (
    action: ButtonAction,
    screen: 'mainScreen' | 'prompter' | 'broadcast',
  ) => {
    // Emitir eventos específicos para cada pestaña
    emitEvent(`${screen}Action`, action);
    console.log(`Emitido ${action} para ${screen}`);

    // Actualizar el estado activo específico de la pestaña
    if (screen === 'mainScreen') {
      setMainScreenActiveButton(action);
    } else if (screen === 'prompter') {
      setPrompterActiveButton(action);
    } else if (screen === 'broadcast') {
      setBroadcastActiveButton(action);
    }
  };

  const renderButton = (
    action: ButtonAction,
    label: string,
    screen: 'mainScreen' | 'prompter' | 'broadcast',
  ) => (
    <SwitcherButton
      onClick={() => handleButton(action, screen)}
      isActive={
        (screen === 'mainScreen' && mainScreenActiveButton === action) ||
        (screen === 'prompter' && prompterActiveButton === action) ||
        (screen === 'broadcast' && broadcastActiveButton === action)
      }
    >
      {label}
    </SwitcherButton>
  );

  return (
    <Box>
      <PageHeader title="Switcher" />
      <Suspense fallback={<Spinner />}>
        <Tabs isFitted variant="enclosed" mt={8}>
          <TabList>
            <Tab>Pantalla principal</Tab>
            <Tab>Prompter</Tab>
            <Tab>Transmisión</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading mt={4}>Pantalla principal</Heading>
              <SimpleGrid columns={3} spacing={4} mt={4}>
                {renderButton('defaultPage', 'Placa básica', 'mainScreen')}
                {renderButton('nextLot', 'Próximo sorteo', 'mainScreen')}
                {renderButton(
                  'lastResults',
                  'Últimos 5 resultados',
                  'mainScreen',
                )}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Heading mt={4}>Prompter</Heading>
              <SimpleGrid columns={3} spacing={4} mt={4}>
                {renderButton('defaultPage', 'Placa básica', 'prompter')}
                {renderButton('nextLot', 'Próximo sorteo', 'prompter')}
                {renderButton(
                  'lastResults',
                  'Últimos 5 resultados',
                  'prompter',
                )}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Heading mt={4}>Transmisión</Heading>
              <SimpleGrid columns={3} spacing={4} mt={4}>
                {renderButton('defaultPage', 'Placa básica', 'broadcast')}
                {renderButton('nextLot', 'Próximo sorteo', 'broadcast')}
                {renderButton(
                  'lastResults',
                  'Últimos 5 resultados',
                  'broadcast',
                )}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Suspense>
    </Box>
  );
}
