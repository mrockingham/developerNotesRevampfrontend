import Head from 'next/head';
import Link from 'next/link';
import { useUserStore } from '@/stores/useUserStore';

import styles from '@/styles/Home.module.css';
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { SelectedDefaultTextColor } from '@/utils/colorSelection';

export default function Home(props: any) {
  const { toggleColorMode, colorMode } = useColorMode();
  const { data, isUserLoading, userError, createUser } = useUserStore(
    (state: any) => state
  );

  return (
    <Box>
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
                color={SelectedDefaultTextColor().backgroundText}
              >
                Developer,
              </Text>

              <br />
              <Text
                as={'span'}
                color={SelectedDefaultTextColor().backgroundText}
              >
                Resource Hub!
              </Text>
            </Heading>
            <Text
              fontSize="lg"
              color={SelectedDefaultTextColor().backgroundText}
            >
              <strong
                style={{
                  color: SelectedDefaultTextColor().foregroundText,
                }}
                color={SelectedDefaultTextColor().backgroundText}
              >
                DevErNote
              </strong>{' '}
              makes it easy to save all of your favorite code snipits and
              articles in one place for ease of access Have a snippet or
              articles you think others will like, share it! Connect with like
              minded people on a platform created for developers by developers
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                bg={SelectedDefaultTextColor().foregroundText}
                _hover={{ bg: 'blue.500' }}
              >
                <Text color={SelectedDefaultTextColor().backgroundText}>
                  <Link href="/register">Register</Link>
                </Text>
              </Button>
              <Button
                bg={SelectedDefaultTextColor().backgroundText}
                color={SelectedDefaultTextColor().foregroundText}
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
              >
                <Link href="/signIn">Sign In</Link>
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Box
              position={'relative'}
              // boxShadow={'2xl'}
              width={'full'}
            >
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={'./standingdev-PhotoRoom.png'}
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
