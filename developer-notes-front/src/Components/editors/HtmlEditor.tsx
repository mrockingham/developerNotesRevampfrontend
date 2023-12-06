'use client';
import React, { useState, useCallback } from 'react';
import { Text, Flex, Button, Box, useColorMode, Image } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import NextImage from 'next/image';
import {
  selectedBackgroundColor,
  selectedDefaultTextColor,
} from '@/utils/colorSelection';
import { html } from '@codemirror/lang-html';
import { aura } from '@uiw/codemirror-theme-aura';

const HtmlEditor = (props: { setHtmlValue: any; value: string }) => {
  const { setHtmlValue, value } = props;
  const [open, setOpen] = useState(true);
  const { toggleColorMode, colorMode } = useColorMode();
  const onChange = useCallback((val: string, viewUpdate: any) => {
    setHtmlValue(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('DevErNote-current-notehtml', JSON.stringify(val));
    }
  }, []);

  const htmlValue = () => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem('DevErNote-current-notehtml');
      return jsonValue != null ? JSON.parse(jsonValue) : '';
    } else return '';
  };
  return (
    <Flex flexDirection="column" width={open ? '100%' : '20%'}>
      <Flex pl={3} pr={10} w="100%" justifyContent="space-between">
        <Text
          fontSize="1.8rem"
          color={selectedDefaultTextColor().backgroundText}
        >
          HTML
        </Text>
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
          value={htmlValue()}
          height="300px"
          extensions={[html()]}
          onChange={onChange}
          theme={aura}
        />
      </Box>
    </Flex>
  );
};

export default HtmlEditor;
