import { Button } from '@chakra-ui/react';
import { MouseEvent } from 'react';

interface SwitcherButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  isActive: boolean;
  // Añadir aquí cualquier otra prop específica que quieras asegurar
}

const SwitcherButton: React.FC<
  SwitcherButtonProps & React.ComponentProps<typeof Button>
> = ({
  onClick,
  children,
  isActive,
  ...props // Este recoge todas las demás props pasadas al componente
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
      {...props} // Propagar todas las props adicionales al componente Button
    >
      {children}
    </Button>
  );
};

export default SwitcherButton;
