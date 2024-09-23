'use client';

import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactElement, ReactNode } from 'react';

interface ButtonComponentProps extends ButtonProps {
  href?: string;
  onClick?: () => void;
  isLoading?: boolean;
  prefixIcon?: ReactElement;
  suffixIcon?: ReactElement;
  children: ReactNode;
}

export default function ButtonComponent({
  href,
  onClick,
  isLoading = false,
  prefixIcon,
  suffixIcon,
  children,
  ...rest
}: ButtonComponentProps) {
  return href ? (
    <NextLink href={href} passHref>
      <ChakraButton
        isLoading={isLoading}
        leftIcon={prefixIcon}
        rightIcon={suffixIcon}
        {...rest}
      >
        {children}
      </ChakraButton>
    </NextLink>
  ) : (
    <ChakraButton
      onClick={onClick}
      isLoading={isLoading}
      leftIcon={prefixIcon}
      rightIcon={suffixIcon}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
