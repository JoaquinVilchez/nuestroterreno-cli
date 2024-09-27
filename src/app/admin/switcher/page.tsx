'use client';

import PageHeader from '@/app/components/PageHeader';
import SwitcherButton from '@/app/components/SwitcherButton';
import { waitState } from '@/atoms/waitSate';
import {
  actions,
  ActionType,
  screens,
  ScreenType,
} from '@/config/screenAndActions';
import {
  disconnectSocket,
  emitEvent,
  initiateSocketConnection,
} from '@/utils/socket';
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Select,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function SwitcherPage() {
  const [activeButtons, setActiveButtons] = useState<
    Record<ScreenType, ActionType | null>
  >({
    mainScreen: null,
    prompter: null,
    broadcast: null,
  });

  const [wait, setWait] = useRecoilState(waitState);

  useEffect(() => {
    initiateSocketConnection();
    return () => {
      disconnectSocket();
    };
  }, []);

  const toggleWait = () => {
    setWait(!wait);
  };

  const handleButton = (action: ActionType, screen: ScreenType) => {
    emitEvent(`${screen}Action`, action);
    setActiveButtons((prev) => ({ ...prev, [screen]: action }));
  };

  const renderButton = (
    actionId: ActionType,
    actionLabel: string,
    screenId: ScreenType,
  ) => {
    const action = actions.find((action) => action.id === actionId);
    if (action && action.hide && action.hide.includes(screenId)) {
      return null;
    }

    return (
      <SwitcherButton
        onClick={() => handleButton(actionId, screenId)}
        isActive={activeButtons[screenId] === actionId}
      >
        {actionLabel}
      </SwitcherButton>
    );
  };

  return (
    <Box>
      <PageHeader title="Switcher" />
      <Suspense fallback={<Spinner />}>
        <Tabs isFitted variant="enclosed" mt={8}>
          <TabList>
            {screens.map((screen) => (
              <Tab key={screen.id}>{screen.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {screens.map((screen) => (
              <TabPanel key={screen.id}>
                <Heading mt={4}>{screen.label}</Heading>
                {screen.id === 'prompter' && (
                  <Box>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} my={5}>
                      <SwitcherButton
                        w="100%"
                        onClick={toggleWait}
                        isActive={wait}
                      >
                        ESPERAR
                      </SwitcherButton>
                      <SwitcherButton
                        w="100%"
                        onClick={() => alert('hi')}
                        isActive={false}
                      >
                        ENVIAR MENSAJE
                      </SwitcherButton>
                    </Grid>
                    <hr />
                  </Box>
                )}
                <SimpleGrid columns={4} spacing={4} mt={4}>
                  {actions.map((action) =>
                    renderButton(action.id, action.label, screen.id),
                  )}
                </SimpleGrid>

                {screen.id === 'mainScreen' && (
                  <Box
                    p={5}
                    mt={5}
                    boxShadow="md"
                    border="1px solid #EDF2F6"
                    borderRadius={5}
                  >
                    <SimpleGrid columns={4} spacing={4}>
                      <FormControl>
                        <FormLabel>Cantidad</FormLabel>
                        <Select placeholder="Seleccione cantidad">
                          <option value="5">5</option>
                          <option value="4">3</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Grupo</FormLabel>
                        <Select placeholder="Seleccione grupo">
                          <option value="">Todos</option>
                          <option value="1">Grupo 1</option>
                          <option value="2">Grupo 2</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tipo de Sorteo</FormLabel>
                        <Select placeholder="Seleccione tipo de sorteo">
                          <option value="">Todos</option>
                          <option value="cpd">CPD</option>
                          <option value="general">General</option>
                        </Select>
                      </FormControl>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        mt={4}
                      >
                        <SwitcherButton
                          onClick={() =>
                            handleButton('lastResults', 'mainScreen')
                          }
                          isActive={
                            activeButtons['mainScreen'] === 'lastResults'
                          }
                        >
                          Últimos 5 resultados
                        </SwitcherButton>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Suspense>
    </Box>
  );
}
