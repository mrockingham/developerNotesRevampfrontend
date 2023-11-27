import Header from './Header/Header';
import {
  Box,
  ChakraProvider,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useUserStore } from '@/stores/useUserStore';
import { selectedBackgroundColor } from '@/utils/colorSelection';

const Layout: React.FC = ({ children }) => {
  const { data, isUserLoading, userError, createUser } = useUserStore(
    (state: any) => state
  );

  return (
    <Box
      style={{ overflow: 'auto' }}
      h="100vh"
      bg={selectedBackgroundColor()}
      bgGradient={selectedBackgroundColor()}
    >
      {/* {hideHeaderIfMatchPathName() ? null : <Header />} */}
      <Header />
      <div>{children}</div>
    </Box>
  );
};

export default Layout;
