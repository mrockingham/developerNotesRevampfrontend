import {
  Container,
  Stack,
  Text,
  Box,
  Image,
  useColorMode,
  Flex,
  Input,
  Button,
} from '@chakra-ui/react';
import { selectedDefaultTextColor } from '@/utils/colorSelection';

import SignInComponent from '@/Components/signIn/SignIn';

const SignIn = () => {
  return (
    <Box h="100%">
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={{ base: 10, md: 18 }}
          direction={{ base: 'column', md: 'row' }}
          justifyContent={'center'}
        >
          <Box display={{ base: 'none', md: 'block' }} w="50%">
            <Text
              fontSize="4xl"
              color={selectedDefaultTextColor().backgroundText}
            >
              DevErNote
            </Text>
            <Text color={selectedDefaultTextColor().backgroundText}>
              {' '}
              Save your Code snippets for ease of access,have one you like,
              share it!
            </Text>
            <Image alt={'dev picture'} w={'100%'} h={'100%'} src={'./22.png'} />
          </Box>
          <Flex
            direction="column"
            align={'center'}
            h="500px"
            w="50%"
            // border="1px"
            borderColor={''}
          >
            <Text
              color={selectedDefaultTextColor().backgroundText}
              fontSize="3xl"
            >
              Sign In
            </Text>
            <Flex
              direction="column"
              borderColor={''}
              h="100%"
              w="70%"
              justify="space-around"
            >
              <SignInComponent />
            </Flex>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignIn;
