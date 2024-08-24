import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ConfirmModalProps {
  title: string;
  body: ReactNode;
  isOpen: boolean;
  backdropColor?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  body,
  isOpen,
  backdropColor = 'rgba(0, 0, 0, 0.8)', // Color de backdrop por defecto
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg={backdropColor} // Aplicar el color de fondo personalizado
        backdropFilter="blur(10px)" // Filtro de desenfoque para el fondo
      />
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Confirmar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
