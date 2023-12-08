import React from 'react';
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
import FoldersFiles from '@/Components/home/FoldersFiles';
import ViewCodeBlock from '@/Components/home/ViewCodeBlock';

const index = () => {
  return (
    <Box h="100%">
      <Container maxW={'7x1'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          pt={{ base: 10, md: 18 }}
          direction={{ base: 'column', md: 'row' }}
          justifyContent={'center'}
        >
          <Box w="50%">
            <FoldersFiles />
          </Box>
          <Flex w="50%">
            <ViewCodeBlock />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default index;
