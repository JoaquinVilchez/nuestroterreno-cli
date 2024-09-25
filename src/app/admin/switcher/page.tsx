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
  Grid,
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
  ) => (
    <SwitcherButton
      onClick={() => handleButton(actionId, screenId)}
      isActive={activeButtons[screenId] === actionId}
    >
      {actionLabel}
    </SwitcherButton>
  );

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
                <SimpleGrid columns={3} spacing={4} mt={4}>
                  {actions.map((action) =>
                    renderButton(action.id, action.label, screen.id),
                  )}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Suspense>
    </Box>
  );
}
