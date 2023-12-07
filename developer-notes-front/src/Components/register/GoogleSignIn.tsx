' use client';

import React, { useEffect } from 'react';

import { Image, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { signIn, signOut, useSession } from 'next-auth/react';

import { useUserStore } from '@/stores/useUserStore';

const GoogleSignIn = () => {
  const { data: session } = useSession();
  const { data, isUserLoading, userError, createProviderUser, logProviderIn } =
    useUserStore((state: any) => state);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      try {
        logProviderIn({
          email: session?.user.email,
          name: session?.user.name,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [logProviderIn, session?.user]);

  useEffect(() => {
    // if (userError?.response?.status === 409) {
    //   signOut();
    // }

    if (userError?.response?.status === 412) {
      try {
        createProviderUser({
          name: session?.user?.name,
          email: session?.user?.email,
          provider: true,
        });
        console.log('user error', userError);
      } catch (err) {
        console.log('is ther an error', err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    session?.user?.email,
    session?.user?.name,
    userError,
    userError?.response?.status,
  ]);

  return (
    <Button
      bg={'orange'}
      borderRadius="30px"
      color="white"
      w="100%"
      onClick={() => {
        signIn();
        // router.push('/home');
      }}
    >
      <Text mr={2}>Sign In With</Text>
      <Image
        src="./google.png"
        alt="Image"
        width={30}
        height={30}
        // className="md:h-auto md:w-full"
      />
    </Button>
  );
};

export default GoogleSignIn;
