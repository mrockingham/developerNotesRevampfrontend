import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Text,
  Box,
  Image,
  useColorMode,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import { useUserStore } from '@/stores/useUserStore';
import GoogleSignIn from '../register/GoogleSignIn';
import { useSession } from 'next-auth/react';
import { SelectedDefaultTextColor } from '@/utils/colorSelection';

const SignInComponent = () => {
  const router = useRouter();
  const { data, isUserLoading, userError, logIn, isLoggedIn } = useUserStore(
    (state: any) => state
  );
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn || session?.user?.name) {
      router.push('/home');
    }
  }, [isLoggedIn, router, session?.user?.name]);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long');
      return;
    }

    try {
      await logIn({
        email: email,
        password: password,
      });
      router.push('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const isValidEmail = (email: string) => {
    // You can use a regular expression to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <Box>
      <Box>
        <FormControl id="email" isRequired>
          <FormLabel color="white" fontSize="2rem">
            Email
          </FormLabel>

          <Input
            value={email}
            color={SelectedDefaultTextColor().backgroundText}
            onChange={e => {
              setEmail(e.target.value);
              setError('');
            }}
            borderColor={'ButtonFace'}
            variant="flushed"
            type="email"
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl color="white" id="password" isRequired mt={6}>
          <FormLabel fontSize="2rem">Password</FormLabel>
          <Input
            color={SelectedDefaultTextColor().backgroundText}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError('');
            }}
            borderColor={''}
            variant="flushed"
            type="password"
          />
        </FormControl>
      </Box>
      <Box>
        <Text>{error}</Text>
      </Box>
      <Flex mt={4} flexDirection="column" justify="space-around" align="center">
        <Button
          borderRadius="30px"
          mb={4}
          w="100%"
          color={SelectedDefaultTextColor().backgroundText}
          bg={SelectedDefaultTextColor().foregroundText}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <GoogleSignIn />
      </Flex>
    </Box>
  );
};

export default SignInComponent;
