// src/components/Navbar.tsx
'use client';

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Container,
  Link,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Links = [
  {
    label: 'Sortear',
    url: 'draw',
  },
  {
    label: 'Resultados',
    url: 'results',
  },
  {
    label: 'Participantes',
    url: 'participants',
  },
  {
    label: 'Lotes',
    url: 'lots',
  },
  {
    label: 'Switcher',
    url: 'switcher',
  },
];

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Box
    as="a"
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
  >
    {children}
  </Box>
);

export default function NavbarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxW="8xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link href="/admin">
                <Image
                  src="/logo_mvt.png"
                  width={100}
                  alt="Logo Municipalidad de Venado Tuerto"
                />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <NavLink
                  key={link.label}
                  href={`/admin/${link.url.toLowerCase()}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={IconButton}
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                px={4}
                aria-label="Salidas"
              >
                Salidas
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={NextLink}
                  href="/screen/mainscreen"
                  target="_blank"
                  icon={<ExternalLinkIcon />}
                >
                  Pantalla principal
                </MenuItem>
                <MenuItem
                  as={NextLink}
                  href="/screen/prompter"
                  target="_blank"
                  icon={<ExternalLinkIcon />}
                >
                  Prompter
                </MenuItem>
                <MenuItem
                  as={NextLink}
                  href="/screen/streaming"
                  target="_blank"
                  icon={<ExternalLinkIcon />}
                >
                  Transmisión
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>{session?.user?.firstName}</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => signOut({ callbackUrl: '/auth/l`ogin' })}
                >
                  Cerrar sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.label} href={`/${link.url.toLowerCase()}`}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
