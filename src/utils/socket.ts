import { Result } from '@/types/result';
import { io, Socket } from 'socket.io-client';

// Definimos interfaces para los eventos que recibimos y enviamos
interface ServerToClientEvents {
  lastResults: (response: any) => void;
  lastWinner: (winner: Result) => void;
  nextDraw: (result: any) => void;
  fullInfo: (response: any) => void;
  winnerInfo: (response: any) => void;
  defaultPage: () => void;
  none: () => void;
}

interface ClientToServerEvents {
  joinRoom: (room: string) => void;
  mainScreenAction: (action: string) => void;
  prompterAction: (action: string) => void;
  broadcastAction: (action: string) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const initiateSocketConnection = (): void => {
  socket = io('http://localhost:3000');
  console.log('Conectando con el servidor de Socket.IO');

  // Escuchar el evento 'connect'
  socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO con ID:', socket?.id);
  });

  // Escuchar el evento 'connect_error' para manejar errores de conexión
  socket.on('connect_error', (error) => {
    console.error('Error de conexión:', error);
  });
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    console.log('Desconectado del servidor de Socket.IO');
  }
};

export const subscribeToEvent = <K extends keyof ServerToClientEvents>(
  eventName: K,
  callback: ServerToClientEvents[K],
): void => {
  if (!socket) return;
  socket.on(eventName, callback as any);
};

export const unsubscribeFromEvent = <K extends keyof ServerToClientEvents>(
  eventName: K,
): void => {
  if (!socket) return;
  socket.off(eventName);
};

export const emitEvent = <K extends keyof ClientToServerEvents>(
  eventName: K,
  ...args: unknown[]
): void => {
  if (!socket) return;
  console.log(eventName, args);
  socket.emit(eventName, ...(args as Parameters<ClientToServerEvents[K]>));
};
