'use client';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: string;
  backdropColor?: string;
  footerButtons?: ReactNode;
}

export default function ModalComponent({
  isOpen,
  onClose,
  title,
  children,
  size = 'md', // Tamaño por defecto
  backdropColor = 'rgba(0, 0, 0, 0.8)', // Color de backdrop por defecto
  footerButtons, // Botones opcionales para el footer
}: ModalComponentProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay
        bg={backdropColor} // Aplicar el color de fondo personalizado
        backdropFilter="blur(10px)" // Filtro de desenfoque para el fondo
      />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {footerButtons && <ModalFooter>{footerButtons}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}
