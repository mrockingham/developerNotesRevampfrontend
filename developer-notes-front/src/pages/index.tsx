import Head from 'next/head';

import { Inter } from 'next/font/google';
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
  Icon,
  IconButton,
  createIcon,
  IconProps,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Home() {
  return (
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
                bg: 'red.400',
                zIndex: -1,
              }}
            >
              Developer,
            </Text>
            <br />
            <Text as={'span'} color={'red.400'}>
              Resource Hub!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Snippy is a rich coding snippets app that lets you create your own
            DEVerNote makes it easy to save all of your favorite code snipits
            and articlse in one place for ease of access Have a snippet or
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
              colorScheme={'red'}
              bg={'red.400'}
              _hover={{ bg: 'red.500' }}
            >
              Register
            </Button>
            <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
              Login
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
              src={
                'https://developer-notes-next-client.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fcoding.22b13ad9237c12349478c063f6918662.png&w=3840&q=75'
              }
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
