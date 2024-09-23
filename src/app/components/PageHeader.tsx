'use client';

import { ChevronLeftIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonComponent from './Button';

interface HeaderProps {
  title: string;
  showButton?: boolean;
  showBackButton?: boolean;
  buttonText?: string;
  href?: string;
  onClick?: () => void;
  goBackSteps?: number;
}

export default function PageHeader({
  title,
  showButton = false,
  showBackButton = true,
  buttonText = 'Nuevo',
  href,
  onClick,
  goBackSteps = 1,
}: HeaderProps) {
  const [showArrow, setShowArrow] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleGoBack = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    let targetPath = '/';
    if (pathSegments.length > goBackSteps) {
      targetPath = `/${pathSegments.slice(0, pathSegments.length - goBackSteps).join('/')}`;
    }
    router.push(targetPath);
  };

  return (
    <Box position="relative" mt={4}>
      <Flex alignItems="center" justifyContent="space-between">
        {showBackButton && (
          <>
            <Box
              position="absolute"
              left={-5}
              top="50%"
              transform="translateY(-50%)"
              width="100px"
              onMouseEnter={() => setShowArrow(true)}
              onMouseLeave={() => setShowArrow(false)}
            >
              {showArrow && (
                <Tooltip label="Volver Atrás" fontSize="sm" placement="bottom">
                  <IconButton
                    aria-label="Volver Atrás"
                    icon={<ChevronLeftIcon boxSize={6} />}
                    variant="ghost"
                    onClick={handleGoBack}
                  />
                </Tooltip>
              )}
            </Box>
            <Heading
              as="h1"
              size="xl"
              ml={showArrow ? 8 : 0}
              transition="all 0.3s"
              onMouseEnter={() => setShowArrow(true)}
              onMouseLeave={() => setShowArrow(false)}
            >
              {title}
            </Heading>
          </>
        )}

        {!showBackButton && (
          <Heading as="h1" size="xl">
            {title}
          </Heading>
        )}

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
