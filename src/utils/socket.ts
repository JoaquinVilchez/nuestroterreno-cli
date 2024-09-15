import { Lot } from '@/types/lot';
import { Result } from '@/types/result';
import { io, Socket } from 'socket.io-client';

// Definimos interfaces para los eventos que recibimos y enviamos
interface ServerToClientEvents {
  lastResults: (results: Result[]) => void;
  nextLot: (lot: Lot) => void;
}

interface ClientToServerEvents {
  joinRoom: (room: string) => void;
  requestLastResults: (quantity: number) => void;
  requestNextLot: () => void;
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
  callback: (...args: Parameters<ServerToClientEvents[K]>) => void,
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
  ...args: Parameters<ClientToServerEvents[K]>
): void => {
  if (!socket) return;
  socket.emit(eventName, ...args);
};
