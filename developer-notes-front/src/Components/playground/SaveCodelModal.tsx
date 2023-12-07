'use client';
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Button,
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Image,
} from '@chakra-ui/react';
import { useCodeBlockStore } from '@/stores/useCodeBlockStore';
import { useUserStore } from '@/stores/useUserStore';
import {
  SelectedBackgroundColor,
  SelectedDefaultTextColor,
} from '@/utils/colorSelection';

const SaveCodelModal = (props: {
  title: string;
  html: string;
  css: string;
  javascript: string;
  note: string;
  setTitle: any;
}) => {
  const [folderCategory, setFolderCategory] = useState('');
  const [codeBlockStateData, setCodeBlockStateData] = useState([]);
  const [showBackButton, setShowBackButton] = useState(false);
  const { title, html, css, javascript, note, setTitle } = props;
  const {
    createCodeBlock,
    getCodeBlockByCategory,
    getCodeBlockByCreator,
    codeBlocksCreator,
    codeBlocksCategory,
  } = useCodeBlockStore((state: any) => state);
  const { data } = useUserStore((state: any) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveCodeBlock = () => {
    createCodeBlock({
      title: title,
      creator: data?.email,
      provider: data?.provider,
      category: folderCategory,
      subCategory: '',
      html: html,
      css: css,
      javascript: javascript,
      note: note,
      tags: '',
      useFullCount: '',
    });
  };

  useEffect(() => {
    setCodeBlockStateData(codeBlocksCategory?.codeBlock);
  }, [codeBlocksCategory?.codeBlock]);

  const shortString = (
    str: string | undefined | null
  ): string | undefined | null => {
    return str?.slice(0, 10);
  };
  const uniqueCategories = new Set();

  const codeBlocksAndCategory = () => {
    const allItems =
      codeBlocksCreator?.codeBlock && Array.isArray(codeBlocksCreator.codeBlock)
        ? [
            ...codeBlocksCreator.codeBlock
              ?.filter((list: any) => {
                if (!uniqueCategories.has(list.category)) {
                  uniqueCategories.add(list.category);
                  return true;
                }
                return false;
              })
              ?.filter((list, index) => index != 0)
              .map((list: any) => ({ ...list, image: './open-folder.png' })),
            ...codeBlocksCreator.codeBlock
              ?.filter((list: any) => !list.category)
              ?.map((list: any) => ({ ...list, image: './documents.png' })),
          ]
        : [];

    setCodeBlockStateData(allItems);
  };

  const openFolder = async (item: any) => {
    if (item?.category === '') {
      setTitle(item?.title);
    } else if (item?.category?.length > 1) {
      setShowBackButton(true);
      console.log('is item cat', item?.category);
      setFolderCategory(item?.category);
      await getCodeBlockByCategory(data?.email, item?.category);
    }
  };

  const backToFolders = () => {
    getCodeBlockByCreator(data.email);
    codeBlocksAndCategory();
    setShowBackButton(false);
  };

  return (
    <div>
      <Button
        w="150px"
        mt={2}
        ml={4}
        rounded={'full'}
        size={'md'}
        fontWeight={'normal'}
        px={6}
        // bg={colorMode === 'light' ? TextColor1() : TextColor2()}
        _hover={{ bg: 'blue.500' }}
        onClick={() => {
          onOpen();
          getCodeBlockByCreator(data.email);
          codeBlocksAndCategory();
          console.log('codeBlocksCreator', codeBlocksCreator?.codeBlock);
        }}
      >
        {' '}
        &#10148; Save
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={SelectedBackgroundColor()}
          bgGradient={SelectedBackgroundColor()}
          color={SelectedDefaultTextColor().backgroundText}
        >
          <ModalHeader>Save</ModalHeader>
          <Flex alignItems={'center'}>
            <ModalHeader>Title:</ModalHeader>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              variant="flushed"
            />
          </Flex>
          <ModalCloseButton />
          <ModalBody>
            <Flex mb={3} alignItems={'center'} justifyContent={'space-between'}>
              <Text>Save to: {folderCategory}</Text>
              <Flex>
                {showBackButton && (
                  <Button
                    onClick={() => backToFolders()}
                    color="black"
                    mt={2}
                    ml={4}
                    rounded={'full'}
                    size={'md'}
                    fontWeight={'normal'}
                    px={6}
                    // bg={colorMode === 'light' ? TextColor1() : TextColor2()}
                    _hover={{ bg: 'blue.500' }}
                  >
                    &#10229; Go Back
                  </Button>
                )}
                <Popover closeOnBlur={false} w="300px">
                  {({ isOpen, onClose }) => (
                    <>
                      <PopoverTrigger>
                        <Button
                          color="black"
                          mt={2}
                          ml={4}
                          rounded={'full'}
                          size={'md'}
                          fontWeight={'normal'}
                          px={6}
                          // bg={colorMode === 'light' ? TextColor1() : TextColor2()}
                          _hover={{ bg: 'blue.500' }}
                        >
                          New Folder
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent w="400px" color="black">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Folder Name</PopoverHeader>
                        <PopoverBody>
                          <Flex justifyContent="space-between">
                            <Input
                              value={folderCategory}
                              onChange={e => {
                                setFolderCategory(e.target.value);
                              }}
                              w="250px"
                              placeholder="Folder Name"
                            />

                            <Button variant="outline" onClick={onClose}>
                              Submit
                            </Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </>
                  )}
                </Popover>
              </Flex>
            </Flex>
            <Flex
              flexWrap="wrap"
              h="400px"
              maxWidth="100%"
              border="solid"
              borderColor="white"
              flexDirection="row"
              justifyContent="flex-start"
            >
              {codeBlockStateData?.map((item: any) => (
                <Flex
                  onClick={() => {
                    if (item?.image) {
                      openFolder(item);
                    } else {
                      setTitle(item.title);
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
                    src={item.image || './documents.png'}
                    alt="Image"
                    width={100}
                    height={100}
                    // className="md:h-auto md:w-full"
                  />
                  <Box>
                    {item.category && item.image
                      ? shortString(item.category)
                      : shortString(item.title)}
                  </Box>
                </Flex>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                saveCodeBlock();
                onClose();
              }}
              variant="ghost"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SaveCodelModal;
