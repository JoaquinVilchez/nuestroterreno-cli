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

export default function ResultsPage() {
  const [activeButton, setActiveButton] = useState<ButtonAction | null>(null);

  useEffect(() => {
    initiateSocketConnection();

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleButton = (action: ButtonAction) => {
    switch (action) {
      case 'lastResults':
        emitEvent('requestLastResults', 5);
        console.log('Emitido requestLastResults con cantidad 5');
        break;
      case 'nextLot':
        emitEvent('requestNextLot');
        console.log('Emitido requestNextLot');
        break;
      case 'defaultPage':
        emitEvent('requestDefaultPage');
        console.log('Logo MVT');
        break;
      default:
        console.warn('Acción desconocida');
    }
    setActiveButton(action); // Set the active button based on action
  };

  const renderButton = (action: ButtonAction, label: string) => (
    <SwitcherButton
      onClick={() => handleButton(action)}
      isActive={activeButton === action}
    >
      {label}
    </SwitcherButton>
  );

  return (
    <Box>
      <PageHeader title="Switcher" />
      <Suspense fallback={<Spinner />}>
        <Tabs isManual variant="enclosed" mt={8}>
          <TabList>
            <Tab>Pantalla principal</Tab>
            <Tab>Prompter</Tab>
            <Tab>Transmisión</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={3} spacing={4}>
                {renderButton('defaultPage', 'Placa básica')}
                {renderButton('nextLot', 'Próximo sorteo')}
                {renderButton('lastResults', 'Últimos 5 resultados')}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={3} spacing={4}>
                {renderButton('defaultPage', 'Placa básica')}
                {renderButton('nextLot', 'Próximo sorteo')}
                {renderButton('lastResults', 'Últimos 5 resultados')}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={3} spacing={4}>
                {renderButton('defaultPage', 'Placa básica')}
                {renderButton('nextLot', 'Próximo sorteo')}
                {renderButton('lastResults', 'Últimos 5 resultados')}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Suspense>
    </Box>
  );
}
