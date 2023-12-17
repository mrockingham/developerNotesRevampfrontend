'use client';
import React, { useState, useCallback } from 'react';
import { Text, Flex, Button, Box, useColorMode, Image } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import NextImage from 'next/image';
import {
  SelectedBackgroundColor,
  SelectedDefaultTextColor,
} from '@/utils/colorSelection';
import { html } from '@codemirror/lang-html';
import { aura } from '@uiw/codemirror-theme-aura';
import { nord } from '@uiw/codemirror-theme-nord';
import { usePathname } from 'next/navigation';

const HtmlEditor = (props: { setHtmlValue: any; value: string }) => {
  const { setHtmlValue, value } = props;
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [openVerticle, setOpenVerticle] = useState(true);
  const { toggleColorMode, colorMode } = useColorMode();
  const onChange = useCallback((val: string, viewUpdate: any) => {
    setHtmlValue(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('DevErNote-current-notehtml', JSON.stringify(val));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const htmlValue = () => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem('DevErNote-current-notehtml');
      return jsonValue != null ? JSON.parse(jsonValue) : '';
    } else return '';
  };
  return (
    <Flex
      flexDirection="column"
      width={{ md: open ? '100%' : '20%', base: open ? '100%' : '100%' }}
    >
      <Flex pl={3} pr={10} w="100%" justifyContent="space-between">
        <Text
          fontSize="1.8rem"
          color={SelectedDefaultTextColor().backgroundText}
        >
          HTML
        </Text>
        {pathname !== '/home' && (
          <Button
            display={{ base: 'block', md: 'none' }}
            _hover={{ bg: SelectedDefaultTextColor().foregroundText }}
            variant={'ghost'}
            onClick={() => setOpenVerticle(prevOpen => !prevOpen)}
          >
            <NextImage
              alt="arrow"
              src="/vdoublearrow.svg"
              width={30}
              height={30}
            />
          </Button>
        )}
        {pathname !== '/home' && (
          <Button
            display={{ base: 'none', md: 'block' }}
            _hover={{ bg: SelectedDefaultTextColor().foregroundText }}
            variant={'ghost'}
            onClick={() => setOpen(prevOpen => !prevOpen)}
          >
            <NextImage
              alt="arrow"
              src="/hdoublearrow.svg"
              width={30}
              height={30}
            />
          </Button>
        )}
      </Flex>
      <Box
        boxShadow="2xl"
        rounded="md"
        display={!openVerticle ? 'none' : 'block'}
      >
        <CodeMirror
          value={pathname != '/home' ? htmlValue() : value}
          height="300px"
          extensions={[html()]}
          onChange={onChange}
          theme={nord}
        />
      </Box>
    </Flex>
  );
};

export default HtmlEditor;
