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
} from '@chakra-ui/react';
import { useCodeBlockStore } from '@/stores/useCodeBlockStore';
import { useUserStore } from '@/stores/useUserStore';
import {
  SelectedBackgroundColor,
  SelectedDefaultTextColor,
} from '@/utils/colorSelection';

const FoldersFiles = () => {
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
  const [codeBlockStateData, setCodeBlockStateData] = useState([]);
  const [selctedCodeBlock, setSelectedCodeBlock] = useState({});
  const [folderView, setFolderView] = useState('folder');

  const uniqueCategories = new Set();

  // useEffect(() => {
  //   if (folderView === 'folder') {
  //     getCodeBlockByCategory(data.email);
  //     if (codeBlocksCategory) {
  //       setCodeBlockStateData(codeBlocksCategory);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (folderView === 'folder') {
      getCodeBlockByCategory(data.email);
    } else if (folderView === 'file') {
      getCodeBlockByCreator(data?.email);
    } else if (message?.status === 200) {
      setFolderView('folder');
    }
    // else if (folderView === 'singleFiles') {
    //   getCodeBlockById(
    //     codeBlockStateData?.codeBlock[0]._id,
    //     codeBlockStateData?.codeBlock[0].category,
    //     data.email
    //   );
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderView, data.email, message]);

  useEffect(() => {
    if (folderView === 'folder' && codeBlocksCategory) {
      setCodeBlockStateData(codeBlocksCategory);
    } else if (folderView === 'file' && codeBlocksCreator) {
      setCodeBlockStateData(codeBlocksCreator);
    } else if (folderView === 'singleFiles' && codeBlocksUserCategories) {
      setCodeBlockStateData(codeBlocksUserCategories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    codeBlocksCategory,
    codeBlocksCreator,
    codeBlockData,
    codeBlocksUserCategories,
  ]);
  console.log('folder view', folderView);
  console.log('state data', codeBlockStateData);
  console.log('messages folder', message);
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
      {/* <Flex p={2} border="1px" alignItems={'flex-end'}>
        <Flex w="100%" mr={3} mb={1} alignItems={'baseline'}>
          <Text mr={4}>Folders</Text>
          <Input mr={4} w="100%" variant="flushed" placeholder="Search" />
        </Flex>
        <Flex>
          <Image
            mr={4}
            src={'./list.png'}
            alt="Image"
            width={10}
            height={8}
            // className="md:h-auto md:w-full"
          />
          <Box>
            <Image
              src={'./wfolder.png'}
              alt="Image"
              width={10}
              height={10}
              // className="md:h-auto md:w-full"
            />
          </Box>
        </Flex>
      </Flex> */}
      <Box>
        <Tabs p={2} border="1px" position="relative" variant="unstyled">
          <TabList>
            <Tab
              onClick={() => {
                setFolderView('folder');
                // getCodeBlockByCategory(data.email);
                // if (codeBlocksCategory) {
                //   setCodeBlockStateData(codeBlocksCategory);
                // }
              }}
            >
              All Folders
            </Tab>
            <Tab
              onClick={() => {
                setFolderView('file');
                // getCodeBlockByCreator(data.email);
                // if (codeBlocksCreator) {
                //   setCodeBlockStateData(codeBlocksCreator);
                // }
              }}
            >
              All Files
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      <Box border="1px" h="485px">
        <Flex
          overflowY="auto"
          flexWrap="wrap"
          h="485px"
          maxWidth="100%"
          flexDirection="row"
          justifyContent="flex-start"
        >
          {codeBlockStateData?.codeBlock?.map((item: any) => (
            <Flex
              onClick={() => {
                if (folderView === 'folder') {
                  setFolderView('singleFiles');
                  getUserCodeBlockCategories(data.email, item.category);
                  // openFolder(item);
                } else {
                  getCodeBlockById(item._id, item.category, data.email);

                  console.log('selected codeblock', selctedCodeBlock);
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
                // className="md:h-auto md:w-full"
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
