'use client';

import PageHeader from '@/app/components/PageHeader';
import SwitcherButton from '@/app/components/SwitcherButton';
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

export default function SwitcherPage() {
  interface ParamsType {
    group?: number;
    resultType?: string;
    drawType?: string;
    quantity?: number;
  }

  const [activeButtons, setActiveButtons] = useState<
    Record<ScreenType, ActionType | null>
  >({
    mainScreen: null,
    prompter: null,
    broadcast: null,
  });

  const [quantity, setQuantity] = useState('5');
  const [group, setGroup] = useState<number | undefined>(undefined);
  const [resultType, setResultType] = useState('');
  const [drawType, setDrawType] = useState('');

  useEffect(() => {
    initiateSocketConnection();
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleButton = (
    action: ActionType,
    screen: ScreenType,
    params?: ParamsType,
  ) => {
    emitEvent(`${screen}Action`, action, params);
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
                <SimpleGrid columns={5} spacing={4} mt={4}>
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
                    <SimpleGrid columns={5} spacing={4}>
                      <FormControl>
                        <FormLabel>Cantidad</FormLabel>
                        <Select onChange={(e) => setQuantity(e.target.value)}>
                          <option value="5">5</option>
                          <option value="3">3</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Grupo</FormLabel>
                        <Select
                          placeholder="Seleccione grupo"
                          onChange={(e) => {
                            // Establece el estado a `undefined` si el valor es la cadena vacía, de lo contrario conviértelo a número
                            setGroup(
                              e.target.value === ''
                                ? undefined
                                : Number(e.target.value),
                            );
                          }}
                        >
                          <option value="">Todos</option>
                          <option value="1">Grupo 1</option>
                          <option value="2">Grupo 2</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tipo de Ganador</FormLabel>
                        <Select
                          placeholder="Seleccione tipo de ganador"
                          onChange={(e) => setResultType(e.target.value)}
                        >
                          <option value="">Todos</option>
                          <option value="incumbent">Titular</option>
                          <option value="alternate">Suplente</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tipo de Sorteo</FormLabel>
                        <Select
                          placeholder="Seleccione tipo de sorteo"
                          onChange={(e) => setDrawType(e.target.value)}
                        >
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
                            handleButton('lastResults', 'mainScreen', {
                              group,
                              resultType,
                              drawType,
                              quantity: Number(quantity),
                            })
                          }
                          isActive={
                            activeButtons['mainScreen'] === 'lastResults'
                          }
                        >
                          Últimos Resultados
                        </SwitcherButton>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )}
                {screen.id === 'broadcast' && (
                  <Box
                    p={5}
                    mt={5}
                    boxShadow="md"
                    border="1px solid #EDF2F6"
                    borderRadius={5}
                  >
                    <SimpleGrid columns={5} spacing={4}>
                      <FormControl>
                        <FormLabel>Cantidad</FormLabel>
                        <Select>
                          <option value="3">3</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Grupo</FormLabel>
                        <Select
                          placeholder="Seleccione grupo"
                          onChange={(e) => {
                            // Establece el estado a `undefined` si el valor es la cadena vacía, de lo contrario conviértelo a número
                            setGroup(
                              e.target.value === ''
                                ? undefined
                                : Number(e.target.value),
                            );
                          }}
                        >
                          <option value="">Todos</option>
                          <option value="1">Grupo 1</option>
                          <option value="2">Grupo 2</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tipo de Ganador</FormLabel>
                        <Select
                          placeholder="Seleccione tipo de ganador"
                          onChange={(e) => setResultType(e.target.value)}
                        >
                          <option value="">Todos</option>
                          <option value="incumbent">Titular</option>
                          <option value="alternate">Suplente</option>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Tipo de Sorteo</FormLabel>
                        <Select
                          placeholder="Seleccione tipo de sorteo"
                          onChange={(e) => setDrawType(e.target.value)}
                        >
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
                            handleButton('lastResults', 'broadcast', {
                              group,
                              resultType,
                              drawType,
                              quantity: 3,
                            })
                          }
                          isActive={
                            activeButtons['broadcast'] === 'lastResults'
                          }
                        >
                          Últimos Resultados
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
