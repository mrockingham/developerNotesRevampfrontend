import React from 'react';
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
import { useUserStore } from '@/stores/useUserStore';
import { SelectedDefaultTextColor } from '@/utils/colorSelection';

const index = () => {
  return (
    <Box>
      <Container maxW={'7xl'}>
        <Stack align={'center'} py={{ base: 20, md: 28 }}>
          <Text
            fontSize={'3xl'}
            color={SelectedDefaultTextColor().backgroundText}
          >
            Coming Soon
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default index;
