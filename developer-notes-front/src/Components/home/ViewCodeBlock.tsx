'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import {
  Text,
  Box,
  Flex,
  Input,
  Button,
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
import JSEditor from '@/Components/editors/JSEditor';
import HtmlEditor from '@/Components/editors/HtmlEditor';
import CssEditor from '@/Components/editors/CssEditor';
const ViewCodeBlock = () => {
  const router = useRouter();
  const {
    codeBlockData,

    deleteCodeBlock,
  } = useCodeBlockStore((state: any) => state);
  const { data } = useUserStore((state: any) => state);
  const [jsValue, setJsValue] = useState();
  const [htmlValue, setHtmlValue] = useState();
  const [cssValue, setCssValue] = useState();
  const pathname = usePathname();

  useEffect(() => {
    if (codeBlockData) {
      setJsValue(codeBlockData?.codeBlock?.javascript);
      setHtmlValue(codeBlockData?.codeBlock?.html);
      setCssValue(codeBlockData?.codeBlock?.css);
    }
  }, [codeBlockData]);

  const editCode = () => {
    localStorage.setItem(
      'DevErNote-current-notetitle',
      JSON.stringify(codeBlockData?.codeBlock?.title || '')
    );
    localStorage.setItem(
      'DevErNote-current-note',
      JSON.stringify(codeBlockData?.codeBlock?.note || '')
    );
    localStorage.setItem(
      'DevErNote-current-notejavascript',
      JSON.stringify(codeBlockData?.codeBlock?.javascript || '')
    );
    localStorage.setItem(
      'DevErNote-current-notecss',
      JSON.stringify(codeBlockData?.codeBlock?.css || '')
    );

    localStorage.setItem(
      'DevErNote-current-notehtml',
      JSON.stringify(codeBlockData?.codeBlock?.html || '')
    );
    router.push('/playground');
  };

  const editSection = () => {
    return (
      <Box>
        <Box mt={2}>
          <Button
            color="black"
            w="150px"
            mt={2}
            ml={4}
            rounded={'full'}
            size={'md'}
            fontWeight={'normal'}
            onClick={() => editCode()}
          >
            Edit
          </Button>
          <Button
            color="black"
            w="150px"
            mt={2}
            ml={4}
            rounded={'full'}
            size={'md'}
            fontWeight={'normal'}
            onClick={() => deleteCodeBlock(codeBlockData?.codeBlock?._id)}
          >
            Delete
          </Button>
        </Box>
        <Flex justifyContent={'center'} mt={4}>
          <Text w="100%" fontSize="3xl" as="u" align="center">
            Notes
          </Text>
        </Flex>
        <Box pb={2}>{codeBlockData?.codeBlock?.note}</Box>
      </Box>
    );
  };

  return (
    <Box w="100%" color={SelectedDefaultTextColor().backgroundText}>
      <Text mb={2} fontSize="4xl">
        {' '}
        Edit
      </Text>

      <Box w="100%" p={2}>
        <Flex w="100%">
          <Tabs w="100%" position="relative" variant="unstyled">
            <TabList>
              <Tab>J/S</Tab>
              <Tab>CSS</Tab>
              <Tab>HTML</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg={SelectedDefaultTextColor().foregroundText}
              borderRadius="1px"
            />

            <TabPanels boxShadow="2xl" w="100%">
              <TabPanel>
                <Box>
                  <JSEditor value={jsValue} setJsValue={setJsValue} />
                  {editSection()}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <CssEditor value={cssValue} setCssValue={setCssValue} />
                  {editSection()}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <HtmlEditor value={htmlValue} setHtmlValue={setHtmlValue} />
                  {editSection()}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Box>
  );
};

export default ViewCodeBlock;
