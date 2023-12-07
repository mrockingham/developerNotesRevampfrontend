import React, { ReactNode } from 'react';
import Header from './Header/Header';
import {
  Box,
  ChakraProvider,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useUserStore } from '@/stores/useUserStore';
import { SelectedBackgroundColor } from '@/utils/colorSelection';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, isUserLoading, userError, createUser } = useUserStore(
    (state: any) => state
  );

  return (
    <Box
      style={{ overflow: 'auto' }}
      h="100vh"
      bg={SelectedBackgroundColor()}
      bgGradient={SelectedBackgroundColor()}
    >
      {/* {hideHeaderIfMatchPathName() ? null : <Header />} */}
      <Header />
      <div>{children}</div>
    </Box>
  );
};

export default Layout;
