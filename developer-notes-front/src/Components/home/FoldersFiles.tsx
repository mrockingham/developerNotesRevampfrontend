'use client';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Box,
  Flex,
  Input,
  Button,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';
import { useCodeBlockStore } from '@/stores/useCodeBlockStore';
import { useUserStore } from '@/stores/useUserStore';
import {
  SelectedBackgroundColor,
  SelectedDefaultTextColor,
} from '@/utils/colorSelection';

interface CodeBlock {
  _id: string;
  category: string;
  title: string;
}
interface FoldersFilesProps {}

const FoldersFiles: React.FC<FoldersFilesProps> = () => {
  const {
    createCodeBlock,
    getCodeBlockByCategory,
    getCodeBlockByCreator,
    codeBlocksCreator,
    codeBlocksCategory,
    getCodeBlockById,
    codeBlockData,
    getUserCodeBlockCategories,
    codeBlocksUserCategories,
    message,
  } = useCodeBlockStore((state: any) => state);
  const { data } = useUserStore((state: any) => state);
  const [codeBlockStateData, setCodeBlockStateData] = useState<CodeBlock[]>([]);
  const [selctedCodeBlock, setSelectedCodeBlock] = useState({});
  const [folderView, setFolderView] = useState('folder');

  const uniqueCategories = new Set();

  useEffect(() => {
    if (folderView === 'folder') {
      getCodeBlockByCategory(data.email);
    } else if (folderView === 'file') {
      getCodeBlockByCreator(data?.email);
    } else if (message?.status === 200) {
      setFolderView('folder');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderView, data.email, message]);

  useEffect(() => {
    if (folderView === 'folder' && codeBlocksCategory) {
      setCodeBlockStateData(codeBlocksCategory?.codeBlock);
    } else if (folderView === 'file' && codeBlocksCreator) {
      setCodeBlockStateData(codeBlocksCreator?.codeBlock);
    } else if (folderView === 'singleFiles' && codeBlocksUserCategories) {
      setCodeBlockStateData(codeBlocksUserCategories?.codeBlock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    codeBlocksCategory,
    codeBlocksCreator,
    codeBlockData,
    codeBlocksUserCategories,
  ]);

  const shortString = (
    str: string | undefined | null
  ): string | undefined | null => {
    return str?.slice(0, 10);
  };

  return (
    <Box w="100%" color={SelectedDefaultTextColor().backgroundText}>
      <Text mb={2} fontSize="4xl">
        {' '}
        Welcome {data.name}
      </Text>

      <Box>
        <Tabs p={2} position="relative" variant="unstyled">
          <TabList>
            <Tab
              onClick={() => {
                setFolderView('folder');
              }}
            >
              All Folders
            </Tab>
            <Tab
              onClick={() => {
                setFolderView('file');
              }}
            >
              All Files
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg={SelectedDefaultTextColor().foregroundText}
            borderRadius="1px"
          />
        </Tabs>
      </Box>
      <Box boxShadow="2xl" rounded="md" h="485px">
        <Flex
          overflowY="auto"
          flexWrap="wrap"
          h="485px"
          maxWidth="100%"
          flexDirection="row"
          justifyContent="flex-start"
        >
          {codeBlockStateData?.map((item: CodeBlock) => (
            <Flex
              onClick={() => {
                if (folderView === 'folder') {
                  setFolderView('singleFiles');
                  getUserCodeBlockCategories(data.email, item.category);
                } else {
                  getCodeBlockById(item._id, item.category, data.email);
                }
              }}
              maxWidth="100%"
              key={item?._id}
              mt={5}
              color="white"
              flexWrap="wrap"
              flexDirection="column"
              alignItems="center"
            >
              <Image
                src={
                  folderView === 'folder' ? './wfolder.png' : './documents.png'
                }
                alt="Image"
                width={100}
                height={100}
              />
              <Box>
                {folderView === 'folder'
                  ? shortString(item.category)
                  : shortString(item.title)}
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default FoldersFiles;
