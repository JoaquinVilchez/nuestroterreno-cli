import { Button } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface SwitcherButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // Definiendo el tipo para el evento onClick
  children: React.ReactNode; // Esto asegura que cualquier elemento React válido pueda ser pasado como hijo
  isActive: boolean; // Tipo booleano para la prop isActive
}

const SwitcherButton: React.FC<SwitcherButtonProps> = ({
  onClick,
  children,
  isActive,
}) => {
  return (
    <Button
      onClick={onClick}
      bg={isActive ? 'green.500' : 'red.500'}
      color="white"
      boxShadow="lg"
      _hover={{
        bg: isActive ? 'green.600' : 'red.600',
      }}
      _active={{
        bg: isActive ? 'green.700' : 'red.700',
      }}
      height="50px"
      fontSize="lg"
      fontWeight="bold"
      borderRadius="md"
    >
      {children}
    </Button>
  );
};

export default SwitcherButton;
