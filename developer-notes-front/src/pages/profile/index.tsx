import React, { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import {
  Text,
  Flex,
  Button,
  Container,
  Stack,
  Image,
  Box,
} from '@chakra-ui/react';

const Profile = () => {
  const { data, isLoggedIn, updateTheme } = useUserStore((state: any) => state);

  return (
    <Box>
      <Container>
        <Stack>
          <Text color="white" fontSize="4xl">
            Profile
          </Text>
          <Text color="white" fontSize="3xl">
            Themes
          </Text>
          <Button
            variant="outline"
            onClick={() => {
              updateTheme({
                email: data.email,
                provider: data.provider,

                themeName: 'code_dark',
              });
            }}
          >
            <Text color="white">code_dark</Text>
          </Button>
          {/* <Button
            variant="outline"
            onClick={() => {
              updateTheme({
                email: data.email,
                provider: data.provider,
                themeName: 'fluffy_blue_spread',
              });
            }}
          >
            <Text color="white">fluffy_blue_spread</Text>
          </Button> */}
          <Button
            variant="outline"
            onClick={() => {
              updateTheme({
                email: data.email,
                provider: data.provider,

                themeName: 'grape drink',
              });
            }}
          >
            <Text color="white">grape drink</Text>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Profile;
