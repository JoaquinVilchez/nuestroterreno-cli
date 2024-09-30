import { useState, useEffect } from 'react';
import {
  disconnectSocket,
  emitEvent,
  initiateSocketConnection,
  subscribeToEvent,
  unsubscribeFromEvent,
} from '@/utils/socket';
import { Result } from '@/types/result';
import { Lot } from '@/types/lot';

type EventType =
  | 'lastResults'
  | 'lastWinner'
  | 'nextDraw'
  | 'nextCategory'
  | 'fullInfo'
  | 'winnerInfo'
  | 'defaultPage'
  | 'none';
const eventTypes: EventType[] = [
  'lastResults',
  'lastWinner',
  'nextDraw',
  'nextCategory',
  'fullInfo',
  'winnerInfo',
  'defaultPage',
  'none',
];

interface Content {
  type: EventType;
  data: Result[] | Lot | string | null | any;
}

export const useSocketContent = (
  screenType: 'mainScreen' | 'prompter' | 'broadcast',
) => {
  const [content, setContent] = useState<Content>({ type: 'none', data: null });

  useEffect(() => {
    initiateSocketConnection();
    emitEvent('joinRoom', screenType);

    const handleContent = (type: EventType) => (data: any) => {
      console.log(`${screenType} content received for ${type}:`, data);
      setContent({ type, data });
    };

    // Suscribe a todos los eventos definidos para este tipo de pantalla
    eventTypes.forEach((type) => {
      console.log('subscribeEvent to:', type);
      subscribeToEvent(type as any, handleContent(type));
    });

    return () => {
      eventTypes.forEach((type) => {
        unsubscribeFromEvent(type as any);
      });
      disconnectSocket();
    };
  }, [screenType]);

  return content;
};
