'use client';
import { ReactNode, useEffect } from 'react';
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
  useColorMode,
  Stack,
  Text,
} from '@chakra-ui/react';

import Link from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { useCodeBlockStore } from '@/stores/useCodeBlockStore';
import { useUserStore } from '@/stores/useUserStore';
import NextImage from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import NavBarStyles from './navBarStyles.module.css';
import {
  selectedBackgroundColor,
  selectedDefaultTextColor,
} from '@/utils/colorSelection';
const Links = [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'PlayGround',
    path: '/playground',
  },
  {
    name: 'Social Hub',
    path: '/socialhub',
  },
  {
    name: 'Utilities',
    path: '/utilities',
  },
];

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Box
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    <Link href={path}>{children}</Link>
  </Box>
);

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session } = useSession();
  const {
    getCodeBlockByCategory,

    codeBlocksCategory,
  } = useCodeBlockStore((state: any) => state);
  const { data, checkLoggedIn, logout, isLoggedIn } = useUserStore(
    (state: any) => state
  );

  // const [session] = useSession();
  const router = useRouter();
  // const { creator, setCreator } = useCreator();

  // useEffect(() => {
  // console.log('check', session);
  //   if (session) {
  //     axios
  //       .post(`app/users/profile`, {
  //         email: session?.user?.email,
  //       })
  //       .then(response => {
  //         setCreator(response.data);
  //       });
  //   }
  // }, [creator, session, setCreator]);

  const shortString = (
    str: string | undefined | null
  ): string | undefined | null => {
    return str?.slice(0, 11);
  };

  const logOut = () => {
    if (session && session.user) {
      signOut();
    }
    logout();
  };

  useEffect(() => {
    checkLoggedIn();
    if (session?.user?.name) {
    }
  }, []);

  return (
    <Box
      bg={selectedBackgroundColor()}
      bgGradient={selectedBackgroundColor()}
      className={NavBarStyles.mobileNav}
    >
      <Box color={selectedDefaultTextColor().backgroundText} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            color="black"
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box
              color={selectedDefaultTextColor().backgroundText}
              fontSize="2rem"
              fontWeight="bold"
            >
              <Link href="/">DevErNote</Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              fontSize="1.3rem"
            >
              {Links.map(({ name, path }) => (
                <NavLink key={path} path={path}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Text color={data?.theme?.backGroundText}>
              {isLoggedIn
                ? shortString(data?.name)
                : session?.user?.name
                ? session?.user?.name
                : ''}
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                colorScheme="white"
              >
                <Flex
                  flexDirection="row"
                  alignItems="flex-end"
                  fontSize="1.3rem"
                >
                  <Text
                    fontSize={{
                      base: 'sm',
                      sm: 'sm',
                      md: 'lg',
                      lg: '1.3rem',
                    }}
                    pr={2}
                  >
                    {/* {shortString(session?.user?.name)
                      ? shortString(session?.user?.name)
                      : 'Login'} */}
                  </Text>
                  <Box color={data?.theme?.backGroundText} fontSize="4xl">
                    <AiOutlineMenuFold />
                  </Box>
                </Flex>
              </MenuButton>

              <MenuList color="black">
                {/* {session?.user ? (
                  <MenuItem
                    color="black"
                    as="button"
                    // onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Signout
                  </MenuItem>
                ) : (
                  <MenuItem
                    color="white"
                    as="button"
                    // onClick={() => router.push('/signin')}
                  >
                    Login
                  </MenuItem>
                )} */}
                <MenuItem
                  onClick={() => {
                    if (isLoggedIn || session?.user?.name) {
                      logOut();
                      router.push('/');
                    } else if (isLoggedIn === false) {
                      router.push('/signIn');
                    }
                  }}
                >
                  {isLoggedIn || session?.user?.name ? (
                    'Log Out'
                  ) : (
                    <Link href="/signin">Log In</Link>
                  )}
                </MenuItem>
                {isLoggedIn && (
                  <>
                    <MenuDivider />
                    <MenuItem>
                      <Link href="/profile">Profile</Link>
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ name, path }) => (
                <Box
                  onClick={() => {
                    console.log('what name', name);
                    name === 'Home' && getCodeBlockByCategory(data?.email);
                  }}
                >
                  <NavLink key={path} path={path}>
                    {name}
                  </NavLink>
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
