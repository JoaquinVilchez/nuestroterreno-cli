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

export default function SwitcherPage() {
  const [activeButtons, setActiveButtons] = useState<
    Record<ScreenType, ActionType | null>
  >({
    mainScreen: null,
    prompter: null,
    broadcast: null,
  });

  useEffect(() => {
    initiateSocketConnection();
    return () => {
      disconnectSocket();
    };
  }, []);

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
