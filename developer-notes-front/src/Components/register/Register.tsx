import React, { useState, useEffect } from 'react';
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
import GoogleSignIn from './GoogleSignIn';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import { SelectedDefaultTextColor } from '@/utils/colorSelection';

const RegisterComponent = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    data,
    isUserLoading,
    userError,
    createUser,
    checkLoggedIn,
    isLoggedIn,
  } = useUserStore((state: any) => state);
  const { data: session } = useSession();
  const router = useRouter();
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
    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters long');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address');
      return;
    }

    if (password.length < 5) {
      setError('Password must be at least 5 characters long');
      return;
    }

    try {
      await createUser({
        name: name,
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  const isValidEmail = (email: string) => {
    // You can use a regular expression to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <Box>
      <Box>
        <FormControl
          color={SelectedDefaultTextColor().backgroundText}
          isRequired
        >
          <FormLabel fontSize="2rem">Name</FormLabel>
          <Input
            value={name}
            onChange={e => {
              setName(e.target.value);
              setError('');
            }}
            borderColor={SelectedDefaultTextColor().backgroundText}
            variant="outline"
            type="text"
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl
          color={SelectedDefaultTextColor().backgroundText}
          id="email"
          isRequired
        >
          <FormLabel fontSize="2rem">Email</FormLabel>

          <Input
            color={SelectedDefaultTextColor().backgroundText}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setError('');
            }}
            variant="outline"
            type="email"
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl
          color={SelectedDefaultTextColor().backgroundText}
          id="password"
          isRequired
        >
          <FormLabel fontSize="2rem">Password</FormLabel>
          <Input
            color={SelectedDefaultTextColor().backgroundText}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setError('');
            }}
            variant="outline"
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

export default RegisterComponent;
