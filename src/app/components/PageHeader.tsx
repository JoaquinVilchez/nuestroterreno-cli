'use client';

import { SmallAddIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ButtonComponent from './Button';

interface HeaderProps {
  title: string;
  showButton?: boolean;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
}

export default function PageHeader({
  title,
  showButton = false,
  buttonText = 'Nuevo',
  href,
  onClick,
}: HeaderProps) {
  return (
    <Box mt={8}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="xl">
          {title}
        </Heading>
        {showButton && (
          <ButtonComponent
            href={href}
            onClick={onClick}
            rightIcon={<SmallAddIcon />}
            colorScheme="teal"
            variant="solid"
          >
            {buttonText}
          </ButtonComponent>
        )}
      </Flex>
    </Box>
  );
}
