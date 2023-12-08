'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Button,
  Container,
  useColorMode,
  Textarea,
  Box,
  Input,
  TabIndicator,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

import {
  SelectedBackgroundColor,
  SelectedDefaultTextColor,
} from '@/utils/colorSelection';

import JSEditor from '@/Components/editors/JSEditor';
import HtmlEditor from '@/Components/editors/HtmlEditor';
import CssEditor from '@/Components/editors/CssEditor';
import { ConsoleFeed, Message } from './ConsoleFeed';
import { JsRunnerEnv, runJS } from './RunJs';
import { useCodeBlockStore } from '@/stores/useCodeBlockStore';
import { useUserStore } from '@/stores/useUserStore';
import SaveCodelModal from './SaveCodelModal';

interface Props {
  runner?: 'iframe' | 'webWorker';
}

const PlayGround: React.FC<Props> = props => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { getCodeBlockById, createCodeBlock } = useCodeBlockStore(
    (state: any) => state
  );
  const { data, codeBlockData } = useUserStore((state: any) => state);
  const { runner = 'webWorker' } = props;
  const [logs, setLogs] = useState([]);
  const [srcDoc, setSrcDoc] = useState('');
  const [code, setCode] = useState('');
  const [isRunConfirmed, setIsRunConfirmed] = useState(false);
  const [jsValue, setJsValue] = useState();
  const [htmlValue, setHtmlValue] = useState();
  const [cssValue, setCssValue] = useState();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const jsRunnerEnvRef = useRef<JsRunnerEnv>();

  const runCode = async () => {
    const doRun = isRunConfirmed || window.confirm('Do you want to run code?');
    if (doRun) {
      setLogs([]);
      setIsRunConfirmed(true);
      runJS(code, runner, jsRunnerEnvRef.current);
    }
  };

  const saveCodeBlock = () => {
    createCodeBlock({
      title: title,
      creator: data?.email,
      provider: data?.provider,
      category: '',
      subCategory: '',
      html: htmlValue,
      css: cssValue,
      javascript: jsValue,
      note: note,
      tags: '',
      useFullCount: '',
    });
  };

  const onLog = useCallback((log: Message) => {
    setLogs(pre => [...pre, log]);
  }, []);

  useEffect(() => {
    setCode(jsValue);

    const timeout = setTimeout(() => {
      setSrcDoc(`
            <html>
            <body>${htmlValue}</body>
            <style>${cssValue}</style>
            <script>${jsValue}</script
            </html>
            `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [htmlValue, cssValue, jsValue]);
  useEffect(() => {
    const storedTitle = localStorage.getItem('DevErNote-current-notetitle');
    const storedNote = localStorage.getItem('DevErNote-current-note');
    if (storedTitle) {
      setTitle(JSON.parse(storedTitle));
    }
    if (storedNote) {
      setNote(JSON.parse(storedNote));
    }
  }, []);

  return (
    <Container maxW="90%">
      <Flex justifyContent={'center'}>
        <Text
          my={4}
          fontWeight={400}
          fontSize="4xl"
          color={SelectedDefaultTextColor().backgroundText}
        >
          Playground
        </Text>
      </Flex>
      <Flex>
        <InputGroup>
          {/* <InputLeftAddon children="Title" /> */}
          <Input
            color={SelectedDefaultTextColor().backgroundText}
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              localStorage.setItem(
                'DevErNote-current-notetitle',
                JSON.stringify(title)
              );
            }}
            variant="flushed"
            placeholder="Title"
            _placeholder={{ fontSize: '24px' }}
            w="200px"
          />
        </InputGroup>
      </Flex>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        mx={3}
        minWidth="max-content"
        alignItems="center"
        gap="4"
      >
        <JSEditor value={jsValue} setJsValue={setJsValue} />
        <HtmlEditor value={htmlValue} setHtmlValue={setHtmlValue} />
        <CssEditor value={cssValue} setCssValue={setCssValue} />
      </Flex>
      <Flex mt={2}>
        <Button
          w="150px"
          mt={2}
          ml={4}
          rounded={'full'}
          size={'md'}
          fontWeight={'normal'}
          px={6}
          variant="outline"
          _hover={{ borderColor: SelectedDefaultTextColor().foregroundText}}
          onClick={runCode}
          boxShadow="2xl"
          color={SelectedDefaultTextColor().backgroundText}
        >
          {' '}
          &#10148; Run Code
        </Button>
        <SaveCodelModal
          title={title}
          setTitle={setTitle}
          html={htmlValue}
          css={cssValue}
          javascript={jsValue}
          note={note}
        />
      </Flex>
      <Flex justifyContent="space-between">
        <Tabs isFitted variant="unstyled" mt={4} w="45%">
          <TabList>
            <Tab>
              <Text
                p={2}
                fontSize="1.4rem"
                color={SelectedDefaultTextColor().backgroundText}
              >
                Console
              </Text>
            </Tab>
            <Tab>
              <Text
                p={2}
                fontSize="1.4rem"
                color={SelectedDefaultTextColor().backgroundText}
              >
                Browser
              </Text>
            </Tab>
          </TabList>
          <TabIndicator
          w='10%'
            mt="-1.5px"
            height="2px"
            bg={SelectedDefaultTextColor().foregroundText}
   
          />
          
          <TabPanels>
            <TabPanel w="100%">
              <Flex boxShadow="2xl">
                <ConsoleFeed logs={logs} onLog={onLog} />
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <Flex boxShadow="2xl">>
                    <iframe
                      srcDoc={srcDoc}
                      style={{ border: '0px' }}
                      title="output"
                      sandbox="allow-scripts"
                      width="100%"
                      height="200px"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box w="45%">
          <Text
            fontSize="1.4rem"
            color={SelectedDefaultTextColor().backgroundText}
            pt={8}
          >
            Notes:
          </Text>
          <Box p={2} mt={8}>
            <Textarea
              value={note}
              onChange={e => {
                setNote(e.target.value);
                localStorage.setItem(
                  'DevErNote-current-note',
                  JSON.stringify(note)
                );
              }}
              focusBorderColor={ SelectedDefaultTextColor().foregroundText }
              h="200px"
              boxShadow="2xl"
              color={SelectedDefaultTextColor().backgroundText}
            ></Textarea>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default PlayGround;
