'use client';
import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Text, Flex, Button, Box, useColorMode } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import {
  selectedBackgroundColor,
  selectedDefaultTextColor,
} from '@/utils/colorSelection';
import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import NextImage from 'next/image';
import { useCodeBlockStore } from '@/stores/useCodeBlockStore';
import { useUserStore } from '@/stores/useUserStore';

const JSEditor = (props: { setJsValue: any; value: any }) => {
  const { setJsValue, value } = props;
  const pathname = usePathname();
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    codeBlockData,

    message,
  } = useCodeBlockStore((state: any) => state);
  const [open, setOpen] = useState(true);
  const onChange = useCallback((val: any, viewUpdate: any) => {
    setJsValue(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'DevErNote-current-notejavascript',
        JSON.stringify(val)
      );
    }
  }, []);

  const jsValue = () => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem(
        'DevErNote-current-notejavascript'
      );

      return jsonValue != null ? JSON.parse(jsonValue) : '';
    } else return '';
  };
  return (
    <Flex flexDirection="column" width={open ? '100%' : '20%'}>
      <Flex pl={3} pr={10} w="100%" justifyContent="space-between">
        <Flex>
          <Text
            fontSize="1.8rem"
            color={selectedDefaultTextColor().backgroundText}
          >
            JS
          </Text>
          <Text ml={2} fontSize="md"></Text>
        </Flex>
        <Button
          display={{ base: 'block', md: 'none' }}
          variant="ghost"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <NextImage
            alt="arrow"
            src="/vdoublearrow.svg"
            width={30}
            height={30}
          />
        </Button>
        <Button
          display={{ base: 'none', md: 'block' }}
          variant="ghost"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <NextImage
            alt="arrow"
            src="/hdoublearrow.svg"
            width={30}
            height={30}
          />
        </Button>
      </Flex>
      <Box
        borderX="2px"
        borderBottom="1px"
        // borderColor={colorMode === 'light' ? TextColor1() : TextColor2()}
      >
        <CodeMirror
          value={jsValue()}
          height="300px"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          theme={aura}
        />
      </Box>
    </Flex>
  );
};

export default JSEditor;
