import { useToast, UseToastOptions } from '@chakra-ui/react';

export default function useCustomToast() {
  const toast = useToast();

  return (options: UseToastOptions) => {
    toast({
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      ...options,
    });
  };
}
